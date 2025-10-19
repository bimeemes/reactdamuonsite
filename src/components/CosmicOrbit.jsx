import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const CosmicOrbit = ({ enableControls = false }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x445566, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3399ff, 1.5, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    const coreGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x88aaff,
      emissive: 0x2244ff,
      emissiveIntensity: 1.4,
      metalness: 0.6,
      roughness: 0.3,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    const orbiters = [];
    for (let i = 0; i < 4; i += 1) {
      const orbiterMaterial = new THREE.MeshStandardMaterial({
        color: 0xffcc66,
        emissive: 0xff9900,
        emissiveIntensity: 0.9,
      });
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), orbiterMaterial);
      sphere.userData = {
        radius: 4 + i * 1.5,
        speed: 0.01 + i * 0.004,
        angle: Math.random() * Math.PI * 2,
      };
      orbiters.push(sphere);
      scene.add(sphere);
    }

    const starPositions = new Float32Array(600 * 3);
    for (let i = 0; i < starPositions.length; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 200;
      starPositions[i + 1] = (Math.random() - 0.5) * 200;
      starPositions[i + 2] = (Math.random() - 0.5) * 200;
    }
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0x334466, size: 0.7 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enabled = enableControls;

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      core.rotation.y += 0.002;
      orbiters.forEach(orbiter => {
        const data = orbiter.userData;
        data.angle += data.speed;
        orbiter.position.x = Math.cos(data.angle) * data.radius;
        orbiter.position.z = Math.sin(data.angle) * data.radius;
        orbiter.position.y = Math.sin(data.angle * 0.5) * 0.5;
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const newWidth = mount.clientWidth || window.innerWidth;
      const newHeight = mount.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      orbiters.forEach(sphere => {
        sphere.geometry.dispose();
        sphere.material.dispose();
      });
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [enableControls]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: -1,
      }}
      aria-hidden='true'
    />
  );
};

export default CosmicOrbit;

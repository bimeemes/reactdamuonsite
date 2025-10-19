import React from 'react';
import Lottie from 'lottie-react';

// You can get free Lottie animations from:
// - https://lottiefiles.com/
// - https://lordicon.com/
// - https://iconscout.com/lottie

// Insurance related animations
const insuranceAnimation = {
  v: '5.9.0',
  fr: 30,
  ip: 0,
  op: 90,
  w: 500,
  h: 500,
  nm: 'Insurance Shield',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Shield',
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: {
          a: 1,
          k: [
            { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] },
            { t: 90, s: [360] },
          ],
          ix: 10,
        },
        p: { a: 0, k: [250, 250, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: {
          a: 1,
          k: [
            {
              i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
              o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
              t: 0,
              s: [0, 0, 100],
            },
            {
              i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
              o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
              t: 30,
              s: [120, 120, 100],
            },
            { t: 60, s: [100, 100, 100] },
          ],
          ix: 6,
        },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ind: 0,
              ty: 'sh',
              ix: 1,
              ks: {
                a: 0,
                k: {
                  i: [
                    [0, -20],
                    [20, 0],
                    [0, 20],
                    [-20, 0],
                  ],
                  o: [
                    [20, 0],
                    [0, 20],
                    [-20, 0],
                    [0, -20],
                  ],
                  v: [
                    [0, -60],
                    [60, 0],
                    [0, 60],
                    [-60, 0],
                  ],
                  c: true,
                },
                ix: 2,
              },
              nm: 'Shield Shape',
              mn: 'ADBE Vector Shape - Group',
              hd: false,
            },
            {
              ty: 'fl',
              c: { a: 0, k: [1, 0.6, 0, 1], ix: 4 },
              o: { a: 0, k: 100, ix: 5 },
              r: 1,
              bm: 0,
              nm: 'Fill 1',
              mn: 'ADBE Vector Graphic - Fill',
              hd: false,
            },
          ],
          nm: 'Shield',
          np: 2,
          cix: 2,
          bm: 0,
          ix: 1,
          mn: 'ADBE Vector Group',
          hd: false,
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
  ],
  markers: [],
};

// Animation components
export const InsuranceShieldAnimation = ({ style }) => {
  return (
    <Lottie
      animationData={insuranceAnimation}
      style={{ width: 200, height: 200, ...style }}
      loop={true}
    />
  );
};

// Loading animation
export const LoadingAnimation = ({ style }) => {
  const loadingData = {
    v: '5.9.0',
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    nm: 'Loading',
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Dot 1',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [100] },
              { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 20, s: [30] },
              { t: 40, s: [100] },
            ],
            ix: 11,
          },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [70, 100, 0], ix: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1 },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 0,
                s: [100, 100, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 20,
                s: [150, 150, 100],
              },
              { t: 40, s: [100, 100, 100] },
            ],
            ix: 6,
          },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                d: 1,
                ty: 'el',
                s: { a: 0, k: [20, 20], ix: 2 },
                p: { a: 0, k: [0, 0], ix: 3 },
                nm: 'Circle',
                mn: 'ADBE Vector Shape - Ellipse',
                hd: false,
              },
              {
                ty: 'fl',
                c: { a: 0, k: [1, 0.6, 0, 1], ix: 4 },
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: 'Fill 1',
                mn: 'ADBE Vector Graphic - Fill',
                hd: false,
              },
            ],
            nm: 'Dot',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: false,
          },
        ],
        ip: 0,
        op: 60,
        st: 0,
        bm: 0,
      },
    ],
    markers: [],
  };

  return (
    <Lottie animationData={loadingData} style={{ width: 50, height: 50, ...style }} loop={true} />
  );
};

// Success checkmark animation
export const SuccessAnimation = ({ style, onComplete }) => {
  const successData = {
    v: '5.9.0',
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    nm: 'Success',
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Checkmark',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [100, 100, 0], ix: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1 },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 0,
                s: [0, 0, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 30,
                s: [120, 120, 100],
              },
              { t: 45, s: [100, 100, 100] },
            ],
            ix: 6,
          },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 1,
                  k: [
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 0,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                          ],
                          v: [
                            [-30, 0],
                            [-30, 0],
                            [-30, 0],
                          ],
                          c: false,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 15,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                          ],
                          v: [
                            [-30, 0],
                            [-10, 20],
                            [-10, 20],
                          ],
                          c: false,
                        },
                      ],
                    },
                    {
                      t: 30,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                          ],
                          v: [
                            [-30, 0],
                            [-10, 20],
                            [30, -20],
                          ],
                          c: false,
                        },
                      ],
                    },
                  ],
                  ix: 2,
                },
                nm: 'Checkmark Path',
                mn: 'ADBE Vector Shape - Group',
                hd: false,
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.2, 0.8, 0.2, 1], ix: 3 },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 8, ix: 5 },
                lc: 2,
                lj: 2,
                bm: 0,
                nm: 'Stroke 1',
                mn: 'ADBE Vector Graphic - Stroke',
                hd: false,
              },
            ],
            nm: 'Checkmark',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: false,
          },
        ],
        ip: 0,
        op: 60,
        st: 0,
        bm: 0,
      },
    ],
    markers: [],
  };

  return (
    <Lottie
      animationData={successData}
      style={{ width: 100, height: 100, ...style }}
      loop={false}
      onComplete={onComplete}
    />
  );
};

// Floating icons animation for background
export const FloatingIconsAnimation = ({ style }) => {
  const floatingData = {
    v: '5.9.0',
    fr: 30,
    ip: 0,
    op: 180,
    w: 800,
    h: 600,
    nm: 'Floating Icons',
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: 'Icon 1',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] },
              { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 30, s: [60] },
              { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 150, s: [60] },
              { t: 180, s: [0] },
            ],
            ix: 11,
          },
          r: {
            a: 1,
            k: [
              { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] },
              { t: 180, s: [360] },
            ],
            ix: 10,
          },
          p: {
            a: 1,
            k: [
              { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 0, s: [100, 100, 0] },
              { i: { x: 0.667, y: 1 }, o: { x: 0.333, y: 0 }, t: 90, s: [700, 200, 0] },
              { t: 180, s: [100, 500, 0] },
            ],
            ix: 2,
          },
          a: { a: 0, k: [0, 0, 0], ix: 1 },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 0,
                s: [50, 50, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 90,
                s: [100, 100, 100],
              },
              { t: 180, s: [50, 50, 100] },
            ],
            ix: 6,
          },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                d: 1,
                ty: 'el',
                s: { a: 0, k: [40, 40], ix: 2 },
                p: { a: 0, k: [0, 0], ix: 3 },
                nm: 'Circle',
                mn: 'ADBE Vector Shape - Ellipse',
                hd: false,
              },
              {
                ty: 'fl',
                c: { a: 0, k: [1, 0.6, 0, 0.6], ix: 4 },
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: 'Fill 1',
                mn: 'ADBE Vector Graphic - Fill',
                hd: false,
              },
            ],
            nm: 'Icon',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: false,
          },
        ],
        ip: 0,
        op: 180,
        st: 0,
        bm: 0,
      },
    ],
    markers: [],
  };

  return (
    <Lottie
      animationData={floatingData}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        opacity: 0.3,
        ...style,
      }}
      loop={true}
    />
  );
};

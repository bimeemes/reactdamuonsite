import React, { useState } from 'react';
import CornerDecorations from './CornerDecorations';
import AdvancedCornerDecorations from './AdvancedCornerDecorations';
import LuxuryDecorations from './LuxuryDecorations';
import PremiumDecorations from './PremiumDecorations';
import SpectacularDecorations from './SpectacularDecorations';
import CornerImageDecorations from './CornerImageDecorations';

/**
 * DecorationController - Controls corner decorations for the website
 * 
 * Available styles:
 * - 'basic': Simple geometric shapes, arrows, and wavy lines
 * - 'advanced': Interactive particles, Persian patterns, flowing SVG lines
 * - 'luxury': Animated mandalas, particle systems, corner spirals, dynamic borders
 * - 'premium': Morphing blobs, scroll-reactive elements, network connections, energy waves
 * - 'ultimate': All previous decorations + corner images for complete visual experience
 * - 'spectacular': 3D cubes, DNA helix, lightning, aurora, quantum particles, holographic grid
 * - 'images': Only corner images with frames and effects
 * - 'godmode': All decorations including images and 3D effects
 * - 'none': No decorations
 * 
 * To change the decoration style, modify the decorationStyle value below
 */
const DecorationController = () => {
  // Set default decoration style - change this to switch styles
  const [decorationStyle] = useState('advanced'); // 👈 Change this value to switch styles

  return (
    <>
      {decorationStyle === 'basic' && <CornerDecorations />}
      {decorationStyle === 'advanced' && <AdvancedCornerDecorations />}
      {decorationStyle === 'luxury' && <LuxuryDecorations />}
      {decorationStyle === 'premium' && <PremiumDecorations />}
      {decorationStyle === 'ultimate' && (
        <>
          <CornerDecorations />
          <AdvancedCornerDecorations />
          <LuxuryDecorations />
          <PremiumDecorations />
        </>
      )}
      {decorationStyle === 'spectacular' && (
        <>
          <CornerDecorations />
          <AdvancedCornerDecorations />
          <LuxuryDecorations />
          <PremiumDecorations />
          <SpectacularDecorations />
        </>
      )}
      {decorationStyle === 'images' && <CornerImageDecorations />}
      {decorationStyle === 'godmode' && (
        <>
          <CornerDecorations />
          <AdvancedCornerDecorations />
          <LuxuryDecorations />
          <PremiumDecorations />
          <SpectacularDecorations />
          <CornerImageDecorations />
        </>
      )}
    </>
  );
};

export default DecorationController;
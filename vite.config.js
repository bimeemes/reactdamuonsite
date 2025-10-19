import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom plugin to suppress CSS warnings
const suppressCSSWarnings = () => ({
  name: 'suppress-css-warnings',
  configResolved(config) {
    const originalWarn = config.logger.warn;
    config.logger.warn = (msg, options) => {
      // Suppress specific CSS minification warnings
      if (
        msg.includes('css-syntax-error') &&
        (msg.includes('width: 40px') ||
          msg.includes('flex: 0 0') ||
          msg.includes('min-width: 320px') ||
          msg.includes('left: -22px') ||
          msg.includes('Expected identifier but found whitespace') ||
          msg.includes('Unexpected "40px"') ||
          msg.includes('Unexpected "0"') ||
          msg.includes('Unexpected "320px"') ||
          msg.includes('Unexpected "-22px"'))
      ) {
        return; // Suppress these warnings
      }
      originalWarn(msg, options);
    };
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), suppressCSSWarnings()],

  // Set base path for root domain deployment (main website)
  base: '/',

  // Fix for module resolution issues
  resolve: {
    alias: {
      'hoist-non-react-statics': 'hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js',
    },
  },

  // Dependency optimization - consolidated
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'dayjs', 'hoist-non-react-statics'],
    force: true,
  },

  // Build optimization
  build: {
    // Increase chunk size warning limit (default 500kb)
    chunkSizeWarningLimit: 1600,

    // Enable source maps for production debugging
    sourcemap: false,

    // Optimize build output
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['chart.js'],
          dates: ['moment', 'moment-jalaali', 'date-fns-jalali'],
          // Blog-related chunks
          markdown: ['marked', 'front-matter'],
        },

        // Optimize asset naming
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },

    // CSS minification options
    cssMinify: 'esbuild',

    // Minification options
    minify: 'esbuild',

    // Target modern browsers for smaller bundles
    target: 'esnext',
  },

  // CSS configuration
  css: {
    // PostCSS configuration for better CSS processing
    postcss: {},

    // CSS modules configuration
    modules: false,
  },

  // Server configuration for development
  server: {
    port: 5173,
    host: true,
    open: true,
  },

  // Preview configuration
  preview: {
    port: 4173,
    host: true,
  },
});

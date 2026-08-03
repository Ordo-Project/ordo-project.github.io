import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './', // Standard relative base for GitHub Pages compatibility
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      // Two entry pages so each language has its own indexable URL and its own
      // social card; both mount the same app.
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ru: path.resolve(__dirname, 'ru/index.html'),
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Important for Vercel
  build: {
    outDir: '.output/public', // Match vercel.json
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
  define: {
    global: 'globalThis', // Fix Node globals
  },
});
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
      proxy: {
        '/socket': {
          target: 'ws://localhost:4000/socket',
          ws: true,
          // rewriteWsOrigin: true
        }
      }
    },
    build: {
      outDir: 'build'
    },
    plugins: [react()]
  }
})
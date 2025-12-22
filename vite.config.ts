import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: [
      '851fac7b77c6.ngrok-free.app',
      '.ngrok-free.app',
      '.ngrok.io'
    ]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'framer': ['framer-motion']
        }
      }
    },
    sourcemap: false,

  },
  esbuild: {
    drop: ['console', 'debugger'],
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',  // Ensure localhost is set
    port: 5173,         // Default port for Vite
  },
  build: {
    sourcemap: true,     // Enable source maps for debugging
  },
})

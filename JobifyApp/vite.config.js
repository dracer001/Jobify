import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  //change port for production
  preview: {
    port: 80,
  },
  // for dev
  server: {
    host: '0.0.0.0',  // Bind to all IPs, so it's accessible from other devices
    port: 3000, // You can change the port if needed
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    },
    port: parseInt(process.env.FRONTEND_PORT || '5173', 10),
    strictPort: true,
  }
})
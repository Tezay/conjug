import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [
            react(),
            tailwindcss(),
        ],
        server: {
            host: "0.0.0.0",
            port: parseInt(env.FRONTEND_PORT || "5173"),
            strictPort: true,
            proxy: {
                '/api': {
                    target: env.VITE_BACKEND_URL || 'https://backend.localhost/api',
                    changeOrigin: true,
                    secure: true,
                }
            },
        },
    }
})

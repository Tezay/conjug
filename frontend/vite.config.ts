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
            port: parseInt(process.env.FRONTEND_PORT || "5173"),
            strictPort: true,
            proxy: {
                '/api': {
                    target: env.VITE_BACKEND_URL || 'http://localhost:5000/api',
                    changeOrigin: true,
                    secure: true,
                }
            },
        },
        define: {
            __APP_ENV__: env.APP_ENV
        }
    }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["@mapbox"],
    include: ['bcryptjs']  // Nếu bạn chuyển sang bcryptjs
  },
  server: {
    hmr: true, // Chạy HMR nếu cần
  },
})

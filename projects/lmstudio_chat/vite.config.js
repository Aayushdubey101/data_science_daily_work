import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api → http://localhost:1234
      // Avoids CORS when the browser calls the LM Studio native API
      '/api': {
        target: 'http://localhost:1234',
        changeOrigin: true,
      },
    },
  },
})

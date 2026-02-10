import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/5-second-rule-app/',
  server: {
    port: 3000,
    host: true
  }
})

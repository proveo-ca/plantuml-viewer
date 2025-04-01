import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    allowedHosts: [".ngrok-free.app"],
    port: Number(process.env["VITE-PORT"]) || 3000
  },
  plugins: [react()],
})

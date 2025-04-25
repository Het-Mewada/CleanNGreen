import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import localIpUrl from 'local-ip-url';

const localIp = localIpUrl('public'); // gets your current LAN IP (e.g., 192.168.1.x)
const backendPort = 5000;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tailwindcss()],
  define: {
    __API_URL__: JSON.stringify(`http://${localIp}:${backendPort}/api`)
  },
  server: {
    host: true, // Listen on all network interfaces
    allowedHosts: [
      '0297-2409-4041-6dc5-e97b-8d6f-d662-a0d7-a2ca.ngrok-free.app', // Your Localtunnel URL
      'localhost' // Keep local access
    ]  },
    css : {
      postcss:{},
    }
})

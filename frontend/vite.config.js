import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import localIpUrl from 'local-ip-url';

const localIp = localIpUrl('public'); // gets your current LAN IP (e.g., 192.168.1.x)
const backendPort = 5000;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tailwindcss()],
  define: {
    __API_URL__: JSON.stringify(`https://cleanngreen.onrender.com/api`)
    // __API_URL__: JSON.stringify(`http://localhost:5000/api`)
  },
})
  
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tailwindcss()],
  define: {
      __API_URL__: JSON.stringify(`https://cleanngreen.onrender.com/api`)
    // __API_URL__: JSON.stringify(`http://localhost:5000/api`)
  },
})
  
 
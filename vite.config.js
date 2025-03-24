import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
 theme:{
  extend: {
    fontFamily:{
      quickSand : ["Quicksand", "sans-serif"]
    }
  }
 },
  plugins: [
    tailwindcss(),
    react()
  ],
})

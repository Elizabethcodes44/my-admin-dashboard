import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');`
      },
    },
  },
  plugins: [
    tailwindcss(),
    react()
  ],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/crochetbae/', // 👈 This is the key addition
  plugins: [react()],
})

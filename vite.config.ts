import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/guess-number-game/',
  plugins: [react()],
})


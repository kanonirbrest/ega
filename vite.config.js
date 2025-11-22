import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Для GitHub Pages: если репозиторий не в корне (не username.github.io),
  // укажите base: '/название-репозитория/'
  base: '/ega/',
})

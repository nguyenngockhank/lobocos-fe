import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../lobocos-be/assets/dashboard2',
    assetsDir: 'static',
    emptyOutDir: true,
    // outDir: '../lobocos-be/assets/dashboard2', // Specify the output directory
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

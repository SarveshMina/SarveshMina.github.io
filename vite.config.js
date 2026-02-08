// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { existsSync } from 'fs'
import { resolve } from 'path'

const firebasePath = existsSync(resolve(import.meta.dirname, 'src/firebase.js'))
  ? resolve(import.meta.dirname, 'src/firebase.js')
  : resolve(import.meta.dirname, 'src/firebase.stub.js')

export default defineConfig({
    plugins: [vue()],
    base: '/',
    resolve: {
        alias: {
            '#firebase-config': firebasePath,
        },
    },
})

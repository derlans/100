import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
const outDir = '100'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: `${pathResolve('types')}/`,
      },
      {
        find: '@',
        replacement: `${pathResolve('src')}/`,
      },
    ],
    dedupe: ['vue'],
  },
  build: {
    outDir,
  },
})

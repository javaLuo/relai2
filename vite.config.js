import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';
import vue from '@vitejs/plugin-vue';
const Timestamp = new Date().getTime(); //随机时间戳

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    ElementPlus()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 开发环境的后台API配置
    proxy: {
      '/rest-api': {
        target: 'https://api.relai.social',
        changeOrigin: true,
        secure: false
        // rewrite: (path) => path.replace(/^\/rest-api/, ''),
      }
    }
  },
  build: {
    sourcemap: false, // 输出.map文件,默认是false
    rollupOptions: {
      output: {
        chunkFileNames: `static/js/[name].[hash]${Timestamp}.js`,
        entryFileNames: `static/js/[name].[hash]${Timestamp}.js`,
        assetFileNames: `static/[ext]/[name].[hash]${Timestamp}.[ext]`
      }
    }
  }
});

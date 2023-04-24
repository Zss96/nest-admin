import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 9690,
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {//modifyVars可以用来设置Less变量
          hack: `true; @import (reference) "${resolve(
            'src/assets/style/variable.less'
          )}";` //这里是定义了一个hack变量，并且通过@import 引入了less文件，使该文件中定义的变量可以在当前文件中使用
        },
        javascriptEnabled: true, //启用Less的JavaScript表达式
      }
    }
  }
})

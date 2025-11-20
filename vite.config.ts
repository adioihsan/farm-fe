import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite"
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
const componentsWithIcons=   Components({
      resolvers: [
        IconsResolver({
          prefix: 'icon',
          enabledCollections: ['mdi'],
        }),
      ],
    })

export default defineConfig({
  plugins: [vue(),tailwindcss(),componentsWithIcons,Icons()],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src'),
    }
  }
})

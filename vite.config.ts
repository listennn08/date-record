import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import WindiCSS from 'vite-plugin-windicss'
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      include: [/\.[tj]sx?$/],
      imports: [
        'react',
        'react-router-dom',
      ],
    }),
    Icons({
      compiler: 'jsx',
      jsx: 'react'
    }),
    WindiCSS(),
    Pages(),
    VitePWA({
      manifest: {
        name: '記錄日期',
        short_name: '記錄日期',
        theme_color: '#e1c8aa',
        icons: [
          {
            src: 'icon-40x40.png',
            sizes: '40x40',
            type: 'image/png',
          },
          {
            src: 'icon-60x60.png',
            sizes: '60x60',
            type: 'image/png',
          },
          {
            src: 'icon-120x120.png',
            sizes: '120x120',
            type: 'image/png',
          },
        ]
      }
    }),
  ]
})

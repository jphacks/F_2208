import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react', }),
  VitePWA({
    includeAssets: [
      'offline.html',
      'favicon.svg',
      'favicon.ico',
      'robots.txt',
      'apple-touch-icon.png',
    ],
    manifest: {
      "theme_color": "#fcbade",
      "background_color": "#FFF1F1",
      "display": "browser",
      "scope": "/",
      "start_url": "/",
      "name": "\u8cafPay\u7bb1",
      "short_name": "\u8cafPay\u7bb1",
      "icons": [
        {
          "src": "/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/icon-256x256.png",
          "sizes": "256x256",
          "type": "image/png"
        },
        {
          "src": "/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png"
        },
        {
          "src": "/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    },
  }),
  ]
});

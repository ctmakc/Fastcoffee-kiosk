import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'FastCoffee Kiosk',
        short_name: 'FastCoffee',
        description: 'Interactive tablet menu for FastCoffee locations',
        theme_color: '#8B4513',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\/api\/menu\/*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'menu-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 3600,
              },
            },
          },
        ],
      },
      registerType: 'autoUpdate',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: false,
  },
})

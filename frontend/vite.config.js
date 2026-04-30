// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Version corrigée avec fonction (pas d'objet)
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-core'
            }
            // Router
            if (id.includes('react-router')) {
              return 'router'
            }
            // Icônes
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'icons'
            }
            // Utilitaires
            if (id.includes('axios') || id.includes('react-hot-toast')) {
              return 'utils'
            }
            // Auth Google
            if (id.includes('@react-oauth')) {
              return 'auth'
            }
            // Tout le reste
            return 'vendor'
          }
        }
      }
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600,
    sourcemap: false, // Désactivé en production pour Vercel
    emptyOutDir: true
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'react-icons',
      'axios',
      'react-hot-toast',
      '@react-oauth/google'
    ]
  },
  server: {
    port: 5173,
    open: true
  }
})
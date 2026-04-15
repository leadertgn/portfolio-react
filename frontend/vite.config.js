import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Active la minification avancée
    minify: 'esbuild',
    // Split les chunks pour un meilleur caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Sépare React dans son propre chunk
          'react-vendor': ['react', 'react-dom'],
          // Sépare les icônes
          'icons-vendor': ['lucide-react', 'react-icons'],
          // Sépare le router
          'router-vendor': ['react-router-dom'],
        },
      },
    },
    // Active la compression gzip
    reportCompressedSize: true,
    // Chunk size warning augmenté
    chunkSizeWarningLimit: 500,
  },
  // Optimisation des dépendances
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
  },
})

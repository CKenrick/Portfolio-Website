import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  return {
    define: {
      'process.env': process.env
    },
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      host: true
    },
    build: {
      outDir: 'build',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          }
        }
      }
    },
    css: {
      postcss: './postcss.config.js'
    }
  }
}) 
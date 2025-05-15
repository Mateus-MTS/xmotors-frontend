import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true, // Habilita a geração de mapas de fontes no modo de desenvolvimento
    preprocessorOptions: {
      scss: {
        additionalData: '', // Adicione aqui qualquer configuração global, se necessário
      },
    },
  },
  build: {
    sourcemap: true, // Habilita a geração do sourcemap
  },
});

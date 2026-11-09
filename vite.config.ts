import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: './', // GitHub Pages 等での相対パス解決（404白画面防止）
  plugins: [react()],
});

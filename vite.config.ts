import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Google Sheets environment variables
        'import.meta.env.VITE_SHEETS_API_KEY': JSON.stringify(env.VITE_SHEETS_API_KEY),
        'import.meta.env.VITE_SHEETS_ID': JSON.stringify(env.VITE_SHEETS_ID),
        'import.meta.env.VITE_SHEETS_NAME': JSON.stringify(env.VITE_SHEETS_NAME)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
        rollupOptions: {
          output: {
            manualChunks: undefined,
          }
        }
      },
      // Ensure proper handling for Vercel deployment
      base: './'
    };
});

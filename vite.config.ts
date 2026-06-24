import os from 'os';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // Keep Vite's dep-optimizer cache outside the Dropbox-synced project tree.
      // Dropbox locks files in node_modules/.vite while syncing, which breaks the
      // optimizer on Windows ("EBUSY: rename deps_temp -> deps").
      cacheDir: path.join(os.tmpdir(), 'vite-neos-advisors'),
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

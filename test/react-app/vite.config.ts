import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { CyCSSVitePlugin } from '@cypress-design/css';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    CyCSSVitePlugin({
      scan: {
        include: [
          'src/**/*.@(tsx|ts)',
          '../../components/*/react/dist/*.@(js|css)',
        ],
      },
    }),
  ],
});

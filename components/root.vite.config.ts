import { defineConfig, type LibraryOptions } from 'vite';
import vue from '@vitejs/plugin-vue';

export default (libConfig: LibraryOptions) =>
  defineConfig({
    build: {
      lib: {
        fileName: (format) => `index.${format}.js`,
        ...libConfig,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          // Provide global variables to use in the UMD build
          // Add external deps here
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    plugins: [vue()],
  });

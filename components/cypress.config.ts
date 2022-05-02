import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '89d3nq',
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
});

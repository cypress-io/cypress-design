// const { devServer } = require('@cypress/vite-dev-server');
import { defineConfig } from 'cypress';

// export default defineConfig({
//   component: {
//     devServer,
//     indexHtmlFile: './cypress/support/component-index.html',
//   },
// });

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
});

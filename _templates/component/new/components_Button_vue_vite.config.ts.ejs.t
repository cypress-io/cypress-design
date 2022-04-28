---
to: components/<%= h.capitalize(name) %>/vue/vite.config.ts
---
import * as path from 'path';
import generateViteConfig from '../../root.vite.config';

export default generateViteConfig({
  entry: path.resolve(__dirname, './index.ts'),
  name: '<%= h.capitalize(name) %>',
});

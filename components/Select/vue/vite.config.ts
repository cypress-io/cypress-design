import * as path from 'path'
import dts from 'vite-plugin-dts'
import generateViteConfig from '../../vue.vite.config'

export default generateViteConfig(
  {
    entry: path.resolve(__dirname, './index.ts'),
    name: 'Select',
  },
  // Externalize sibling vue-* packages (separately published) so consumers
  // don't get duplicate copies of Button / Checkbox / Tabs / Tag / Textbox
  // bundled into vue-select. `constants-select` is intentionally NOT listed
  // — it's a private workspace package bundled into this dist.
  [
    '@cypress-design/vue-button',
    '@cypress-design/vue-checkbox',
    '@cypress-design/vue-tabs',
    '@cypress-design/vue-tag',
    '@cypress-design/vue-textbox',
  ],
  // Emit a single self-contained `dist/index.d.ts`. `rollupTypes` runs
  // api-extractor; `bundledPackages` inlines the private constants package's
  // public types (SelectItem, SelectProps, etc.) so consumers — who don't
  // install it — get working types. Sibling vue-* packages stay external
  // (kept as `import ... from '<pkg>'`) since consumers install them.
  [
    dts({
      tsconfigPath: path.resolve(__dirname, './tsconfig.build.json'),
      include: ['./*.vue', './index.ts'],
      rollupTypes: true,
      bundledPackages: ['@cypress-design/constants-select'],
    }),
  ],
)

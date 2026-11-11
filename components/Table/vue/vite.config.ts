import * as path from 'path'
import dts from 'vite-plugin-dts'
import generateViteConfig from '../../vue.vite.config'

export default generateViteConfig(
  {
    entry: path.resolve(__dirname, './index.ts'),
    name: 'Table',
  },
  // vue-icon is external by default; constants-table is private and bundled
  // into this dist.
  ['tailwind-merge'],
  // One self-contained `dist/index.d.ts`, with the private constants
  // package's public types inlined for consumers who don't install it.
  [
    dts({
      tsconfigPath: path.resolve(__dirname, './tsconfig.build.json'),
      include: ['./*.vue', './index.ts'],
      rollupTypes: true,
      bundledPackages: ['@cypress-design/constants-table'],
    }),
  ],
)

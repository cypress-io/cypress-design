import * as path from 'path'
import dts from 'vite-plugin-dts'
import generateViteConfig from '../../vue.vite.config'

export default generateViteConfig(
  {
    entry: path.resolve(__dirname, './index.ts'),
    name: 'Modal',
  },
  ['tailwind-merge'],
  // One self-contained `dist/index.d.ts`, with the bundled constants package's
  // public types (such as `ModalSize`) inlined for consumers who don't
  // install it.
  [
    dts({
      tsconfigPath: path.resolve(__dirname, './tsconfig.build.json'),
      include: ['./*.vue', './index.ts'],
      rollupTypes: true,
      bundledPackages: ['@cypress-design/constants-modal'],
    }),
  ],
)

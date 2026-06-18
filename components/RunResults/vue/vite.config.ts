import * as path from 'path'
import dts from 'vite-plugin-dts'
import generateViteConfig from '../../vue.vite.config'

export default generateViteConfig(
  {
    entry: path.resolve(__dirname, './index.ts'),
    name: 'RunResults',
  },
  // Externalize sibling vue-* packages (separately published) plus the npm
  // class utilities. constants-* is intentionally NOT listed — it's a private
  // package bundled into this dist.
  [
    '@cypress-design/vue-statusicon',
    '@cypress-design/vue-tooltip',
    'tailwind-merge',
  ],
  // Emit a single self-contained `dist/index.d.ts`. `rollupTypes` runs
  // api-extractor; `bundledPackages` inlines the private constants package's
  // public types (StatKey, RunResultsTheme, RunResultsProps) so consumers —
  // who don't install it — get working types. Sibling vue-* packages stay
  // external (kept as `import ... from '<pkg>'`) since consumers install them.
  [
    dts({
      tsconfigPath: path.resolve(__dirname, './tsconfig.build.json'),
      include: ['./*.vue', './index.ts'],
      rollupTypes: true,
      bundledPackages: ['@cypress-design/constants-runresults'],
    }),
  ],
)

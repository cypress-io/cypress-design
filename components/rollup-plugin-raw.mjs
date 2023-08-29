import { promises as fs } from 'fs'

/**
 * plugin to allow import of file using the `?raw`
 * suffix, for example `import svg from './my.svg?raw'`
 *
 * NOTE: this brings parity between vite used in tests and rollup used in build
 * @returns {import('rollup').Plugin}
 */
export default function () {
  return {
    name: 'raw',
    async load(id) {
      if (id.endsWith('?raw')) {
        const svgCOntent = await fs.readFile(id.slice(0, -4), 'utf-8')
        return `export default ${JSON.stringify(svgCOntent)};`
      }
    },
  }
}

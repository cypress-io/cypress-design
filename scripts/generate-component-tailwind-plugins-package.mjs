import { resolve } from 'path'
import { promises as fs } from 'fs'
import { globby } from 'globby'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

console.log(__dirname)

async function createPackages() {
  const constantsPackages = await globby(
    './components/*/constants/package.json',
    {
      cwd: resolve(__dirname, '../'),
    },
  )

  const constantsPackagesWithTailwindPlugin = []

  for (const pkgPath of constantsPackages) {
    const {
      default: { exports },
    } = await import(resolve(__dirname, '../', pkgPath), {
      assert: { type: 'json' },
    })
    if (exports?.['./tailwind']) {
      // add current package to the list of tailwind plugins
      const pathArray = pkgPath.split('/')
      constantsPackagesWithTailwindPlugin.push(
        pathArray[pathArray.indexOf('package.json') - 2],
      )
    }
  }

  console.log('found components: ', constantsPackagesWithTailwindPlugin)
  return constantsPackagesWithTailwindPlugin
}

async function generate() {
  const pkgs = await createPackages()
  await fs.writeFile(
    resolve(__dirname, '../packages/component-tailwind-plugins/index.mjs'),
    `${pkgs.map((p) => `import ${p.replace(/-/g, '_')} from '@cypress-design/constants-${p.toLowerCase()}/tailwind'`).join('\n')}

const componentPlugins = [
  ${pkgs.map((p) => p.replace(/-/g, '_')).join(',\n\t')}
]
  
export default componentPlugins`,
    { encoding: 'utf-8' },
  )

  await fs.writeFile(
    resolve(__dirname, '../packages/component-tailwind-plugins/package.json'),
    `{
  "name": "@cypress-design/component-tailwind-plugins",
  "version": "0.0.0",
  "private": "true",
  "exports": {
    "import": "./index.mjs",
    "types": "./dist/index.d.ts"
  },
  "devDependencies": {
    ${pkgs.map((p) => `"@cypress-design/constants-${p.toLowerCase()}": "*",`).join('\n\t\t')}
    "tailwindcss": "^3.4.3"
  }
}`,
    { encoding: 'utf-8' },
  )
}

generate()

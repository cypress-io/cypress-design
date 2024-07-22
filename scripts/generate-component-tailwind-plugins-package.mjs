import { resolve } from 'path'
import { promises as fs } from 'fs'
import { globby } from 'globby'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

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

    // check if the exports?.['./tailwind'] exists and if the targeted file actually exists
    if (exports?.['./tailwind']) {
      let hasTailwind = true
      const pluginPath = resolve(
        __dirname,
        '../',
        pkgPath.replace('package.json', 'dist/tailwind-plugin.es.mjs'),
      )
      try {
        await fs.access(pluginPath)
      } catch {
        hasTailwind = false
      }
      if (hasTailwind) {
        // add current package to the list of tailwind plugins
        const pathArray = pkgPath.split('/')
        constantsPackagesWithTailwindPlugin.push(
          pathArray[pathArray.indexOf('package.json') - 2],
        )
      }
    }
  }

  constantsPackagesWithTailwindPlugin.sort()
  return constantsPackagesWithTailwindPlugin
}

async function generate() {
  const pkgs = await createPackages()
  const packageFolder = resolve(
    resolve(__dirname, '../packages/component-tailwind-plugins'),
  )
  await fs.mkdir(packageFolder, { recursive: true })
  await fs.writeFile(
    resolve(packageFolder, './index.mjs'),
    `import plugin from 'tailwindcss/plugin'
${pkgs.map((p) => `import ${p.replace(/-/g, '_')} from '@cypress-design/constants-${p.toLowerCase()}/tailwind'`).join('\n')}

const componentPlugins = [
  ${pkgs.map((p) => `plugin(${p.replace(/-/g, '_')})`).join(',\n\t')}
]
  
export default componentPlugins`,
    { encoding: 'utf-8' },
  )

  await fs.writeFile(
    resolve(packageFolder, './index.d.ts'),
    `import type { Plugin } from 'tailwindcss/plugin'
    const componentPlugins: Plugin[]
    export default componentPlugins`,
    { encoding: 'utf-8' },
  )

  await fs.writeFile(
    resolve(packageFolder, './package.json'),
    `{
  "name": "@cypress-design/component-tailwind-plugins",
  "version": "0.0.0",
  "private": "true",
  "exports": {
    "import": "./index.mjs",
    "types": "./index.d.ts"
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

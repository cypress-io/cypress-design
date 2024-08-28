import chokidar from 'chokidar'
import * as rollup from 'rollup'
import { loadConfigFile } from 'rollup/loadConfigFile'
import * as url from 'url'
import { resolve, dirname } from 'path'
import { execa, execaNode } from 'execa'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const cwd = resolve(__dirname, '..')
const watcher = chokidar.watch(['./icon-registry/icons-*/*.svg'], {
  cwd,
  ignoreInitial: true,
})

const pathToRollup = resolve(__dirname, '..', 'node_modules/.bin/rollup')
const pathToVite = resolve(__dirname, '..', 'node_modules/.bin/vite')

watcher.on('change', async (file) => {
  console.log(`${file} changed`)

  await buildIcons(file)
})

watcher.on('unlink', async (file) => {
  console.log(`${file} deleted`)

  await buildIcons(file)
})

watcher.on('add', async (file) => {
  console.log(`${file} added`)

  buildIcons(file).catch((e) => {
    console.error(e)
  })
})

async function buildIcons(file) {
  if (
    !/icons-static\/[a-zA-Z0-9-]+_x\d+\.svg$/.test(file) &&
    !/icons-logo\/[a-zA-Z0-9-_]+\.svg$/.test(file) &&
    !/icons-animated\/[a-zA-Z0-9-_]+\.svg$/.test(file)
  ) {
    console.log('Not an icon file, skipping')
    return
  }
  const localCwd = resolve(dirname(file), '..')

  await execaNode('./build-icons.mjs', [], {
    stdio: 'inherit',
    cwd: localCwd,
  })

  await loadConfigFile(resolve(localCwd, 'rollup.config.mjs')).then(
    async ({ options }) => {
      for (const optionsObj of options) {
        const bundle = await rollup.rollup(optionsObj)
        await Promise.all(optionsObj.output.map(bundle.write))
      }
    },
  )

  await Promise.all([buildIconsVue(), buildIconsReact()])
}

async function buildIconsVue() {
  const cwdVue = resolve(cwd, 'components/Icon/vue')
  await execaNode('./generate-icons.js', [], {
    stdio: 'inherit',
    cwd: cwdVue,
  })

  await execa(pathToVite, ['build'], { stdio: 'inherit', cwd: cwdVue })

  console.log('Vue icons built')
}

async function buildIconsReact() {
  const cwdReact = resolve(cwd, 'components/Icon/react')
  await execaNode('./generate-icons.js', [], {
    stdio: 'inherit',
    cwd: cwdReact,
  })

  await execa(pathToRollup, ['-c', './rollup.config.mjs'], {
    stdio: 'inherit',
    cwd: cwdReact,
  })

  console.log('React icons built')
}

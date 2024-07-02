import chokidar from 'chokidar'
import * as url from 'url'
import { resolve, dirname } from 'path'
import { execa } from 'execa'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const cwd = resolve(__dirname, '..')
const watcher = chokidar.watch(['./components/*/constants/src/**/*.ts'], {
  cwd,
})

const pathToRollup = resolve(__dirname, '..', 'node_modules/.bin/rollup')

watcher.on('change', async (file) => {
  console.log(`${file} changed`)

  const cwd = resolve(dirname(file), '..')

  await execa(pathToRollup, ['-c', './rollup.config.mjs'], {
    stdio: 'inherit',
    cwd,
  })

  await execa(pathToRollup, ['-c', './rollup.config.mjs'], {
    stdio: 'inherit',
    cwd: resolve(__dirname, '../css'),
  })
})

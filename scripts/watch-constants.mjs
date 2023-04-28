import chokidar from 'chokidar'
import * as url from 'url'
import { resolve, dirname } from 'path'
import { execa } from 'execa'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const cwd = resolve(__dirname, '..')
const watcher = chokidar.watch(['./components/*/constants/src/**/*.ts'], {
  cwd,
})

const pathToTsc = resolve(__dirname, '..', 'node_modules/.bin/esbuild')

watcher.on('change', async (file) => {
  console.log(`${file} changed`)

  execa(
    pathToTsc,
    [
      'src/index.ts',
      '--allow-overwrite',
      '--outdir=dist',
      '--tsconfig=tsconfig.json',
    ],
    {
      stdio: 'inherit',
      cwd: resolve(dirname(file), '..'),
    }
  )
})

import chokidar from 'chokidar'
import * as url from 'url'
import { resolve, dirname } from 'path'
import { execa } from 'execa'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const cwd = resolve(__dirname, '..')
const watcher = chokidar.watch(['./components/*/constants/src/**/*.ts'], {
  cwd,
})

const pathToESBuild = resolve(__dirname, '..', 'node_modules/.bin/esbuild')
const pathToTsc = resolve(__dirname, '..', 'node_modules/.bin/tsc')

watcher.on('change', async (file) => {
  console.log(`${file} changed`)

  const cwd = resolve(dirname(file), '..')

  await execa(
    pathToESBuild,
    [
      'src/index.ts',
      '--allow-overwrite',
      '--outdir=dist',
      '--tsconfig=tsconfig.json',
    ],
    {
      stdio: 'inherit',
      cwd,
    }
  )

  await execa(pathToTsc, ['--emitDeclarationOnly'], {
    stdio: 'inherit',
    cwd,
  })
})

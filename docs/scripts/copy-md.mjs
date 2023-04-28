// copies all readme files from components to docs
// to allow sharing without framework
import { resolve, dirname } from 'path'
import { promises as fs } from 'fs'
import { globby } from 'globby'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

;(async () => {
  await Promise.all(
    (
      await globby('./components/*/*.md', {
        cwd: resolve(__dirname, '../../'),
      })
    ).map(async (path) => {
      const dest = path.replace(/\/ReadMe\.md$/i, '.md')
      const fileContents = `# ${dest.split('/').pop()?.slice(0, -3)}\n`

      // create the destination directory
      const destDir = dirname(resolve(__dirname, '..', dest))
      await fs.mkdir(destDir, { recursive: true })

      // write the file to the docs folder
      return fs.writeFile(resolve(__dirname, '..', dest), fileContents, 'utf8')
    })
  )
  console.log('Copied all component readmes to docs')
})()

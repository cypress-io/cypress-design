// copies all readme files from components to docs
// to allow sharing without framework
import { resolve, join } from 'path'
import { promises as fs } from 'fs'
import { globby } from 'globby'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

;(async () => {
  console.log(resolve(__dirname, '../../'))
  const nonFwComponentReadmes = (
    await globby('./components/*/*.md', {
      cwd: resolve(__dirname, '../../'),
    })
  ).reduce((acc, path) => {
    acc[resolve(__dirname, '../../', path)] = path.replace(
      /\/ReadMe\.md$/i,
      '.md'
    )
    console.log(path)
    return acc
  }, {})
  await Promise.all(
    Object.entries(nonFwComponentReadmes).map(async ([source, dest]) => {
      console.log({ source, dest })
      // read the source file
      const fileContents = await fs.readFile(source, 'utf8')

      // write the file to the docs folder
      return fs.writeFile(resolve(__dirname, '..', dest), fileContents, 'utf8')
    })
  )
  console.log('Copied all component readmes to docs')
})()

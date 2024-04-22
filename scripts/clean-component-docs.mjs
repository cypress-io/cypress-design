/**
 * This script checks if each markdown file generated in the docs/components directory
 * has a corresponding component in the components directory.
 * If it does not have it, it will delete the markdown file.
 */
import { resolve, dirname } from 'path'
import { promises as fs } from 'fs'
import { globby } from 'globby'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

;(async () => {
  // get all markdown files in the docs/components directory
  const markdownFiles = await globby('./components/*/*.md', {
    cwd: resolve(__dirname, '../docs'),
  })

  // check if each markdown file has a corresponding component in the components directory
  await Promise.all(
    markdownFiles.map(async (path) => {
      const componentPath = path.replace(/\.md$/, '')
      const [, , fw, component] = componentPath.split('/')
      const componentExists = await fs
        .access(
          resolve(__dirname, '../components', component, fw, 'package.json'),
        )
        .then(() => true)
        .catch(() => false)

      if (!componentExists) {
        // delete the markdown file
        await fs.unlink(resolve(__dirname, '../docs', path))
        console.log(`Deleted ${path}`)
      }
    }),
  )
})()

/**
 * Object: When one shares https://design.cypress.io/components/Alert one should not get a 404
 *
 * Since we only aim to generate those pages to avoid 404 when sharing links
 * we only need to copy metadata. the rest of the readme is not as useful.
 * Since we import components in those readmes,
 * it would even be prone to error to copy their content.
 */
import { resolve, dirname } from 'path'
import { promises as fs } from 'fs'
import { globby } from 'globby'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

async function createFileAndDirectory(dest, fileContents) {
  const destFullPath = resolve(__dirname, '..', 'docs', dest)
  const destDir = dirname(destFullPath)
  await fs.mkdir(destDir, { recursive: true })
  return fs.writeFile(destFullPath, fileContents, 'utf8')
}

;(async () => {
  await Promise.all(
    (
      await globby('./components/*/*.md', {
        cwd: resolve(__dirname, '../'),
      })
    ).map(async (path) => {
      const fileContents = `---
layout: none
---

# ${path
        .replace(/\/ReadMe\.md$/i, '')
        .split('/')
        .pop()}
`

      // write the file to the docs folder
      return Promise.all([
        createFileAndDirectory(
          path.replace(/\/ReadMe\.md$/i, '.md'),
          fileContents
        ),
      ])
    })
  )
  console.log('Generated all component readmes to docs')
})()

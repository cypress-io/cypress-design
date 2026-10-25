/**
 * Fill the doc lists in `.agents/index.md` from each listed file's
 * frontmatter `description`, so the description has one owner.
 *
 * A list is a `<!-- docs: <path> <path> … -->` marker followed by the
 * generated items and a closing `<!-- /docs -->`. The marker owns which docs
 * appear and in what order; the files own what's said about them.
 *
 *   node scripts/agents-index.mjs          rewrite .agents/index.md
 *   node scripts/agents-index.mjs --check  fail if it's out of date (PR CI)
 */
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import * as url from 'url'
import { frontmatterDescription } from './frontmatter-description.mjs'

const BASE_URL = 'https://design.cypress.io/agents'
const LIST = /<!-- docs: ([^>]*?) -->[\s\S]*?<!-- \/docs -->/g

export function renderIndex(index, readDoc) {
  return index.replace(LIST, (_, list) => {
    const paths = list.trim().split(/\s+/)
    const items = paths.map((path) => {
      const description = frontmatterDescription(readDoc(path))
      if (!description) {
        throw new Error(
          `${path} is listed in index.md but has no frontmatter description`,
        )
      }
      return `- [${path}](${BASE_URL}/${path}) — ${description}`
    })
    return `<!-- docs: ${paths.join(' ')} -->\n\n${items.join('\n')}\n\n<!-- /docs -->`
  })
}

export function renderIndexFile(agentsDir) {
  const index = readFileSync(join(agentsDir, 'index.md'), 'utf8')
  return renderIndex(index, (path) =>
    readFileSync(join(agentsDir, path), 'utf8'),
  )
}

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  const agentsDir = url.fileURLToPath(new URL('../.agents', import.meta.url))
  const indexPath = join(agentsDir, 'index.md')
  const current = readFileSync(indexPath, 'utf8')
  const rendered = renderIndexFile(agentsDir)

  if (process.argv.includes('--check')) {
    if (rendered !== current) {
      console.error(
        '.agents/index.md is out of date with the frontmatter descriptions it lists. Run `node scripts/agents-index.mjs` and commit the result.',
      )
      process.exit(1)
    }
  } else if (rendered !== current) {
    writeFileSync(indexPath, rendered)
  }
}

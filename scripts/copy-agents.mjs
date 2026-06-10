import {
  cpSync,
  mkdirSync,
  rmSync,
  readdirSync,
  existsSync,
  writeFileSync,
} from 'fs'
import { join, dirname, relative, sep } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dest = join(root, 'docs', 'public', 'agents')

// Clean first so deleted/renamed files don't persist across builds
rmSync(dest, { recursive: true, force: true })
mkdirSync(dest, { recursive: true })

// Design system guidance
cpSync(join(root, '.agents'), dest, { recursive: true })

// Component docs (served at /agents/components/<Name>/...)
const componentsDir = join(root, 'components')
for (const entry of readdirSync(componentsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const componentDest = join(dest, 'components', entry.name)

  // root-level docs
  for (const file of ['instructions.md', 'ReadMe.md', 'architecture.md']) {
    const src = join(componentsDir, entry.name, file)
    if (existsSync(src)) {
      mkdirSync(componentDest, { recursive: true })
      cpSync(src, join(componentDest, file))
    }
  }

  // framework ReadMes (react/ReadMe.md, vue/ReadMe.md)
  for (const framework of ['react', 'vue']) {
    const readme = join(componentsDir, entry.name, framework, 'ReadMe.md')
    if (existsSync(readme)) {
      const frameworkDest = join(componentDest, framework)
      mkdirSync(frameworkDest, { recursive: true })
      cpSync(readme, join(frameworkDest, 'ReadMe.md'))
    }
  }
}

// llms.txt — list every served doc as an absolute URL so agents can discover
// (and fetch tools can unlock) the whole tree from the domain root
const BASE_URL = 'https://design.cypress.io/agents'
const docs = readdirSync(dest, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
  .map((entry) =>
    relative(dest, join(entry.parentPath, entry.name)).split(sep).join('/'),
  )
  .sort()
const llmsTxt = [
  '# Cypress Design System',
  '',
  '> Agent-readable guidance for the Cypress Design System: design principles, tokens, voice, accessibility, and component docs. Start with the index, fetch only what the task needs.',
  '',
  '## Docs',
  '',
  `- [index.md](${BASE_URL}/index.md): router — fetch this first, it points at the rest`,
  ...docs
    .filter((path) => path !== 'index.md')
    .map((path) => `- [${path}](${BASE_URL}/${path})`),
  '',
].join('\n')
writeFileSync(join(root, 'docs', 'public', 'llms.txt'), llmsTxt)

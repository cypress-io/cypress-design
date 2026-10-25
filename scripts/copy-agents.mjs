import {
  cpSync,
  mkdirSync,
  rmSync,
  readdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'fs'
import { join, dirname, relative, sep } from 'path'
import { fileURLToPath } from 'url'
import {
  frontmatterDescription,
  withFrontmatter,
} from './frontmatter-description.mjs'
import { renderIndexFile } from './agents-index.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dest = join(root, 'docs', 'public', 'agents')

// Clean first so deleted/renamed files don't persist across builds
rmSync(dest, { recursive: true, force: true })
mkdirSync(dest, { recursive: true })

// Design system guidance
cpSync(join(root, '.agents'), dest, { recursive: true })
writeFileSync(join(dest, 'index.md'), renderIndexFile(join(root, '.agents')))

// Component docs (served at /agents/components/<Name>/...)
const componentsDir = join(root, 'components')
for (const entry of readdirSync(componentsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const componentDest = join(dest, 'components', entry.name)

  // root-level docs. The root ReadMe.md is skipped: it's VitePress demo
  // markup that the docs site doesn't render either.
  for (const file of ['instructions.md', 'architecture.md']) {
    const src = join(componentsDir, entry.name, file)
    if (existsSync(src)) {
      mkdirSync(componentDest, { recursive: true })
      cpSync(src, join(componentDest, file))
    }
  }

  // framework ReadMes (react/ReadMe.md, vue/ReadMe.md). These double as npm
  // package READMEs, where frontmatter would render as text, so the served
  // copy gets a description generated from the package name instead.
  for (const [framework, label] of [
    ['react', 'React'],
    ['vue', 'Vue'],
  ]) {
    const frameworkDir = join(componentsDir, entry.name, framework)
    const readme = join(frameworkDir, 'ReadMe.md')
    if (existsSync(readme)) {
      const frameworkDest = join(componentDest, framework)
      mkdirSync(frameworkDest, { recursive: true })
      const pkg = JSON.parse(
        readFileSync(join(frameworkDir, 'package.json'), 'utf8'),
      ).name
      writeFileSync(
        join(frameworkDest, 'ReadMe.md'),
        withFrontmatter(readFileSync(readme, 'utf8'), {
          name: `components/${entry.name}/${framework}/ReadMe`,
          description: `${label} install command, import path, and code examples for ${entry.name} (${pkg}). Fetch only when the project uses ${label}; props and behavior are in instructions.md.`,
        }),
      )
    }
  }
}

const undescribed = readdirSync(dest, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
  .map((entry) => join(entry.parentPath, entry.name))
  .filter((path) => !frontmatterDescription(readFileSync(path, 'utf8')))
  .map((path) => relative(dest, path))
if (undescribed.length) {
  console.error(
    `Every served agent doc needs a frontmatter description (see "Writing agent guidance" in AGENTS.md). Missing:\n${undescribed.map((path) => `  ${path}`).join('\n')}`,
  )
  process.exit(1)
}

// llms.txt — list every served doc as an absolute URL so agents can discover
// (and fetch tools can unlock) the whole tree from the domain root. Each
// entry carries its frontmatter description so agents can pick a doc
// without fetching it first.
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
    .map((path) => {
      const link = `- [${path}](${BASE_URL}/${path})`
      const description = frontmatterDescription(
        readFileSync(join(dest, path), 'utf8'),
      )
      return description ? `${link}: ${description}` : link
    }),
  '',
].join('\n')
writeFileSync(join(root, 'docs', 'public', 'llms.txt'), llmsTxt)

import { cpSync, mkdirSync, rmSync, readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
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

  // instructions.md
  const instructions = join(componentsDir, entry.name, 'instructions.md')
  if (existsSync(instructions)) {
    mkdirSync(componentDest, { recursive: true })
    cpSync(instructions, join(componentDest, 'instructions.md'))
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

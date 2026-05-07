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

// Component instructions (served at /agents/components/<Name>/instructions.md)
const componentsDir = join(root, 'components')
for (const name of readdirSync(componentsDir, { withFileTypes: true })) {
  if (!name.isDirectory()) continue
  const src = join(componentsDir, name.name, 'instructions.md')
  if (!existsSync(src)) continue
  const componentDest = join(dest, 'components', name.name)
  mkdirSync(componentDest, { recursive: true })
  cpSync(src, join(componentDest, 'instructions.md'))
}

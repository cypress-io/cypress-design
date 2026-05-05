/**
 * components.ts — build-time utility for enumerating monorepo components.
 *
 * Walks components/<Name>/ at the repo root and derives:
 *   - the list of component names (sorted)
 *   - the list of frameworks each component supports (from subdirectory presence)
 *
 * Import this in Astro frontmatter (server-only). Never import in client scripts.
 */
import { readdirSync, existsSync } from 'fs'
import { resolve } from 'path'

/** Frameworks checked in preference order. */
export const FRAMEWORKS = ['vue', 'react', 'vanilla', 'astro'] as const
export type Framework = (typeof FRAMEWORKS)[number]

export interface ComponentMeta {
  name: string
  frameworks: Framework[]
  hasInstructions: boolean
}

/**
 * Locate the monorepo components/ directory by probing upward from process.cwd().
 * Works whether the build is run from the repo root or from inside docs/.
 */
function findComponentsRoot(): string {
  const candidates = [
    resolve(process.cwd(), 'components'),
    resolve(process.cwd(), '../components'),
  ]
  for (const dir of candidates) {
    if (existsSync(resolve(dir, 'Button'))) return dir
  }
  throw new Error(
    `Cannot locate monorepo components/ directory from ${process.cwd()}. ` +
      `Run the build from the repo root or from docs/.`,
  )
}

const COMPONENTS_ROOT = findComponentsRoot()

/** Returns metadata for all components in the monorepo. */
export function getAllComponents(): ComponentMeta[] {
  const root = COMPONENTS_ROOT
  return readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => {
      const dir = resolve(root, d.name)
      const frameworks = FRAMEWORKS.filter((fw) => existsSync(resolve(dir, fw)))
      const hasInstructions = existsSync(resolve(dir, 'instructions.md'))
      return { name: d.name, frameworks, hasInstructions }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Returns metadata for a single component by name.
 * Returns null if the component directory does not exist.
 */
export function getComponent(name: string): ComponentMeta | null {
  const root = COMPONENTS_ROOT
  const dir = resolve(root, name)
  if (!existsSync(dir)) return null
  const frameworks = FRAMEWORKS.filter((fw) => existsSync(resolve(dir, fw)))
  const hasInstructions = existsSync(resolve(dir, 'instructions.md'))
  return { name, frameworks, hasInstructions }
}

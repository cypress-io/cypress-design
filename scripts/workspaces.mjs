import { execFileSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'
import * as url from 'url'

export const repoRoot = join(
  url.fileURLToPath(new URL('.', import.meta.url)),
  '..',
)

/**
 * Every workspace except the repo root, with its parsed package.json.
 *
 * `yarn workspaces list --json` emits newline-delimited JSON, one workspace
 * per line as `{"location": "<rel-path>", "name": "<pkg>"}`. The root
 * (location `.`) is dropped: its dependencies aren't published.
 */
export function loadWorkspaces(root = repoRoot) {
  const stdout = execFileSync('yarn', ['workspaces', 'list', '--json'], {
    cwd: root,
    encoding: 'utf8',
  })
  return stdout
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))
    .filter((ws) => ws.location !== '.')
    .map((ws) => ({
      ...ws,
      pkg: JSON.parse(
        readFileSync(join(root, ws.location, 'package.json'), 'utf8'),
      ),
    }))
}

export const INTERNAL_SCOPE = '@cypress-design/'

export const isInternal = (name) => name.startsWith(INTERNAL_SCOPE)

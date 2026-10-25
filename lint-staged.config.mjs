import { lstatSync } from 'fs'
import { relative } from 'path'

// Filter out symlinks before passing files to a tool.
// .claude/commands/ contains symlinks into .agents/skills/ and prettier
// refuses to process them when given as explicit paths.
const realFiles = (files) =>
  files.filter((f) => {
    try {
      return !lstatSync(f).isSymbolicLink()
    } catch {
      return false
    }
  })

// lint-staged splits a command string on spaces unless they're quoted
const quote = (files) => files.map((f) => JSON.stringify(f)).join(' ')

const prettier = (files) => {
  const real = realFiles(files)
  return real.length ? `prettier --write ${quote(real)}` : []
}

// --no-globs stops markdownlint-cli2 from also linting every file matched by
// the `globs` in .markdownlint-cli2.jsonc. Paths are made relative because
// root-anchored ignores there (`.changeset/*.md`) don't match absolute paths.
const markdownlint = (files) => {
  const real = realFiles(files).map((f) => relative(process.cwd(), f))
  return real.length ? `markdownlint-cli2 --no-globs --fix ${quote(real)}` : []
}

export default {
  // ESLint runs first so Prettier has the final say on formatting.
  // --no-warn-ignored keeps files excluded by eslint.config.js from
  // producing warnings when lint-staged passes them explicitly.
  '*.{js,mjs,cjs,ts,jsx,tsx,vue}': ['eslint --fix --no-warn-ignored', prettier],
  '*.md': [markdownlint, prettier],
  '*.{css,scss,mdx}': prettier,
}

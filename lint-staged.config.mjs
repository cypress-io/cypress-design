import { lstatSync } from 'fs'

// Filter out symlinks before passing files to prettier.
// .claude/commands/ contains symlinks into .agents/skills/ and prettier
// refuses to process them when given as explicit paths.
const prettier = (files) => {
  const real = files.filter((f) => {
    try {
      return !lstatSync(f).isSymbolicLink()
    } catch {
      return false
    }
  })
  return real.length ? `prettier --write ${real.join(' ')}` : []
}

export default {
  // ESLint runs first so Prettier has the final say on formatting.
  // --no-warn-ignored keeps files excluded by eslint.config.js from
  // producing warnings when lint-staged passes them explicitly.
  '*.{js,mjs,cjs,ts,jsx,tsx,vue}': ['eslint --fix --no-warn-ignored', prettier],
  '*.{css,md}': prettier,
}

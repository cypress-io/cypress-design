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
  '*.{js,ts,jsx,tsx,vue,css,md}': prettier,
}

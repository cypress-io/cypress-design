#!/usr/bin/env node
/**
 * Copies the favicon assets into a site's statically served directory.
 *
 * A favicon has to exist at a URL before any JavaScript runs, so consuming it
 * is a file copy rather than an import. Run this from a prebuild script:
 *
 *   cypress-favicon public
 *   cypress-favicon static --quiet
 */
import { copyFile, mkdir, readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ASSETS_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../assets')

const args = process.argv.slice(2)
const quiet = args.includes('--quiet')
const target = args.find((arg) => !arg.startsWith('--'))

if (!target) {
  console.error('Usage: cypress-favicon <target-dir> [--quiet]')
  process.exit(1)
}

const targetDir = resolve(process.cwd(), target)
await mkdir(targetDir, { recursive: true })

const files = await readdir(ASSETS_DIR)
await Promise.all(
  files.map((file) => copyFile(join(ASSETS_DIR, file), join(targetDir, file))),
)

if (!quiet) {
  console.log(
    `@cypress-design/favicon: copied ${files.length} assets to ${target}/`,
  )
}

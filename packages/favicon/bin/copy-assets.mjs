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
import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FAVICON_ASSETS } from '../dist/index.es.mjs'

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

// Copy the declared list rather than whatever happens to sit in assets/, so a
// stray file can never reach a consumer's static directory.
await Promise.all(
  FAVICON_ASSETS.map((file) =>
    copyFile(join(ASSETS_DIR, file), join(targetDir, file)),
  ),
)

if (!quiet) {
  console.log(
    `@cypress-design/favicon: copied ${FAVICON_ASSETS.length} assets to ${target}/`,
  )
}

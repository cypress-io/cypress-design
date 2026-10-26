/**
 * Render a UI illustration's HTML file to a PNG at @2x with headless Chrome,
 * so the render works the same on macOS, Linux, and cloud sessions.
 *
 *   node scripts/render-illustration.mjs <html> <out.png> <width> <height>
 *
 * Width and height are the illustration's logical size; the PNG is twice
 * that. Set CHROME_PATH to use a specific Chrome or Chromium binary.
 */
import { spawnSync } from 'child_process'
import { existsSync, readdirSync, rmSync } from 'fs'
import { join, resolve } from 'path'
import { pathToFileURL } from 'url'

const PLAYWRIGHT_BROWSERS =
  process.env.PLAYWRIGHT_BROWSERS_PATH ?? '/opt/pw-browsers'

function playwrightChromium() {
  if (!existsSync(PLAYWRIGHT_BROWSERS)) return []
  return readdirSync(PLAYWRIGHT_BROWSERS)
    .filter((dir) => /^chromium-\d+$/.test(dir))
    .flatMap((dir) =>
      ['chrome-linux64', 'chrome-linux'].map((sub) =>
        join(PLAYWRIGHT_BROWSERS, dir, sub, 'chrome'),
      ),
    )
}

function onPath(name) {
  return spawnSync('which', [name], { encoding: 'utf8' }).stdout.trim()
}

function findChrome() {
  if (process.env.CHROME_PATH) {
    return existsSync(process.env.CHROME_PATH) && process.env.CHROME_PATH
  }
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    ...[
      'google-chrome',
      'google-chrome-stable',
      'chromium',
      'chromium-browser',
    ].map(onPath),
    ...playwrightChromium(),
  ]
  return candidates.find((path) => path && existsSync(path))
}

const [html, out, width, height] = process.argv.slice(2)
if (!html || !out || !Number(width) || !Number(height)) {
  console.error(
    'Usage: node scripts/render-illustration.mjs <html> <out.png> <width> <height>',
  )
  process.exit(1)
}

// Chrome screenshots its own error page for a missing file and exits 0.
if (!existsSync(html)) {
  console.error(`No such file: ${html}`)
  process.exit(1)
}

const chrome = findChrome()
if (!chrome) {
  console.error(
    process.env.CHROME_PATH
      ? `CHROME_PATH doesn't exist: ${process.env.CHROME_PATH}`
      : 'No Chrome or Chromium found. Set CHROME_PATH to its binary.',
  )
  process.exit(1)
}
// A PNG left from an earlier run would make a failed render look successful.
rmSync(resolve(out), { force: true })

const args = [
  '--headless',
  '--disable-gpu',
  '--hide-scrollbars',
  '--disable-background-networking',
  '--force-device-scale-factor=2',
  `--window-size=${width},${height}`,
  `--screenshot=${resolve(out)}`,
  pathToFileURL(resolve(html)).href,
]
// Chrome refuses to start its sandbox as root, which is how containers and
// cloud sessions run.
if (process.getuid?.() === 0) args.unshift('--no-sandbox')

const result = spawnSync(chrome, args, { encoding: 'utf8' })
if (result.status !== 0 || !existsSync(resolve(out))) {
  console.error(result.error?.message ?? result.stderr)
  process.exit(result.status || 1)
}
console.log(`Rendered ${out} at ${width * 2}×${height * 2}`)

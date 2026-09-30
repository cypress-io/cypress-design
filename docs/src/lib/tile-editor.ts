/**
 * tile-editor — live editing for demo tiles. Every tile's code block is a
 * transparent <textarea> laid over Shiki's highlighted <pre> (see
 * DemoTile.astro), so it's editable with no extra click. This module loads
 * on the first keystroke and, from then on, keeps the highlighting and the
 * preview in sync with what's typed. `reset` puts the tile back.
 *
 * Pipeline, all in the browser:
 *   Highlight — Shiki with the same theme as the static block.
 *   Vue       — vue/compiler-sfc turns the SFC into a TS module (template
 *               inlined), then sucrase strips types and rewrites imports.
 *   React     — sucrase strips types, compiles JSX, and rewrites imports.
 * The result is CommonJS; `require` resolves against tile-modules.ts, so
 * edited tiles run against the same component builds as the page.
 */
import { transform } from 'sucrase'
import { tileModules } from './tile-modules'

type Framework = 'vue' | 'react'

interface Mounted {
  update(component: unknown): void
  unmount(): void
}

// ---------------------------------------------------------------------------
// Highlighting
// ---------------------------------------------------------------------------

let highlighter: Promise<import('shiki/core').HighlighterCore> | undefined

function getHighlighter() {
  highlighter ??= (async () => {
    const [
      { createHighlighterCore },
      { createJavaScriptRegexEngine },
      vue,
      tsx,
      theme,
    ] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
      import('shiki/langs/vue.mjs'),
      import('shiki/langs/tsx.mjs'),
      import('shiki/themes/github-dark.mjs'),
    ])
    return createHighlighterCore({
      themes: [theme.default],
      langs: [vue.default, tsx.default],
      engine: createJavaScriptRegexEngine(),
    })
  })()
  return highlighter
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Uncolored lines in Shiki's markup, so the layout tracks the textarea instantly. */
function plainLines(code: string): string {
  return code
    .split('\n')
    .map((line) => `<span class="line">${escapeHtml(line)}</span>`)
    .join('\n')
}

async function highlightedLines(
  code: string,
  framework: Framework,
): Promise<string> {
  const html = (await getHighlighter()).codeToHtml(code, {
    lang: framework === 'vue' ? 'vue' : 'tsx',
    theme: 'github-dark',
  })
  return (
    new DOMParser().parseFromString(html, 'text/html').querySelector('code')
      ?.innerHTML ?? plainLines(code)
  )
}

// ---------------------------------------------------------------------------
// Compile + evaluate
// ---------------------------------------------------------------------------

async function toModuleCode(
  source: string,
  framework: Framework,
): Promise<string> {
  if (framework === 'react') {
    return transform(source, {
      transforms: ['typescript', 'jsx', 'imports'],
      jsxRuntime: 'automatic',
      production: true,
    }).code
  }
  const { parse, compileScript } = await import('vue/compiler-sfc')
  const { descriptor, errors } = parse(source, { filename: 'Tile.vue' })
  if (errors.length) throw errors[0]
  if (!descriptor.script && !descriptor.scriptSetup) {
    throw new Error(
      'Add a <script setup> block — the editor needs one to run the tile.',
    )
  }
  const script = compileScript(descriptor, {
    id: 'tile-editor',
    inlineTemplate: true,
  })
  return transform(script.content, { transforms: ['typescript', 'imports'] })
    .code
}

async function evaluate(code: string): Promise<unknown> {
  const specifiers = [...code.matchAll(/require\(['"]([^'"]+)['"]\)/g)].map(
    (m) => m[1],
  )
  const loaded: Record<string, unknown> = {}
  for (const specifier of new Set(specifiers)) {
    const load = tileModules[specifier]
    if (!load) {
      throw new Error(
        `The editor can't import "${specifier}". Use a @cypress-design package, vue, or react.`,
      )
    }
    // Mark ES module namespaces so sucrase's interop reads `.default` from
    // them instead of wrapping the whole namespace as the default export.
    loaded[specifier] = { __esModule: true, ...((await load()) as object) }
  }
  const exports: Record<string, unknown> = {}
  new Function('require', 'exports', code)((s: string) => loaded[s], exports)
  if (!exports.default) throw new Error('The tile needs a default export.')
  return exports.default
}

// ---------------------------------------------------------------------------
// Mounting — one app/root per tile, re-used across edits
// ---------------------------------------------------------------------------

async function mountVue(
  el: HTMLElement,
  onError: (e: unknown) => void,
): Promise<Mounted> {
  const { createApp } = await import('vue')
  let app: ReturnType<typeof createApp> | null = null
  return {
    update(component) {
      app?.unmount()
      app = createApp(component as Parameters<typeof createApp>[0])
      app.config.errorHandler = (err) => onError(err)
      app.mount(el)
    },
    unmount() {
      app?.unmount()
      app = null
    },
  }
}

async function mountReact(
  el: HTMLElement,
  onError: (e: unknown) => void,
): Promise<Mounted> {
  const React = await import('react')
  const { createRoot } = await import('react-dom/client')
  class Boundary extends React.Component<
    { children: React.ReactNode },
    { failed: boolean }
  > {
    state = { failed: false }
    static getDerivedStateFromError() {
      return { failed: true }
    }
    componentDidCatch(err: unknown) {
      onError(err)
    }
    render() {
      return this.state.failed ? null : this.props.children
    }
  }
  const root = createRoot(el)
  let version = 0
  return {
    update(component) {
      // A new key per edit resets the boundary after a fixed error.
      version += 1
      root.render(
        React.createElement(Boundary, {
          key: version,
          children: React.createElement(component as React.ComponentType),
        }),
      )
    },
    unmount() {
      root.unmount()
    },
  }
}

// ---------------------------------------------------------------------------
// Editing session — created on the first edit, torn down by reset
// ---------------------------------------------------------------------------

interface Session {
  schedule(): void
  teardown(): void
}

// Promises, so keystrokes that land while a session is starting share it.
const sessions = new WeakMap<HTMLElement, Promise<Session>>()

function message(err: unknown): string {
  if (err instanceof Error) return err.message
  if (err && typeof err === 'object' && 'message' in err)
    return String((err as { message: unknown }).message)
  return String(err)
}

async function createSession(tile: HTMLElement): Promise<Session> {
  const framework = tile.dataset.framework as Framework
  const preview = tile.querySelector<HTMLElement>('[data-tile-preview]')!
  const input = tile.querySelector<HTMLTextAreaElement>('[data-tile-code]')!
  const code = tile.querySelector<HTMLElement>('pre code')!
  const originalLines = code.innerHTML

  // Live output replaces the static island once an edit first renders; until
  // then (e.g. the first keystroke breaks the code) the original stays up.
  const island = preview.firstElementChild as HTMLElement | null
  const output = document.createElement('div')
  const error = document.createElement('p')
  error.className =
    '!my-0 !mt-4 text-sm text-red-500 font-brand-mono whitespace-pre-wrap'
  error.setAttribute('role', 'status')
  preview.append(output, error)

  const showError = (err: unknown) => {
    error.textContent = message(err)
  }
  const mounted =
    framework === 'vue'
      ? await mountVue(output, showError)
      : await mountReact(output, showError)

  let run = 0
  const render = async () => {
    const current = ++run
    const value = input.value
    const [lines] = await Promise.all([
      highlightedLines(value, framework).catch(() => plainLines(value)),
      (async () => {
        try {
          const component = await evaluate(await toModuleCode(value, framework))
          if (current !== run) return
          error.textContent = ''
          mounted.update(component)
          if (island) island.hidden = true
        } catch (err) {
          if (current === run) showError(err) // keep the last good render
        }
      })(),
    ])
    if (current === run) code.innerHTML = lines
  }

  let timer: ReturnType<typeof setTimeout> | undefined
  return {
    schedule() {
      // Keep the <pre> the same shape as the textarea right away; colors and
      // the preview catch up once typing pauses.
      code.innerHTML = plainLines(input.value)
      clearTimeout(timer)
      timer = setTimeout(render, 250)
    },
    teardown() {
      clearTimeout(timer)
      run += 1
      mounted.unmount()
      output.remove()
      error.remove()
      if (island) island.hidden = false
      input.value = input.defaultValue
      code.innerHTML = originalLines
    },
  }
}

/** Called on every edit to a tile's code. */
export async function update(tile: HTMLElement): Promise<void> {
  let session = sessions.get(tile)
  if (!session) {
    session = createSession(tile)
    sessions.set(tile, session)
  }
  ;(await session).schedule()
}

/** Put the tile back to its original code and preview. */
export async function reset(tile: HTMLElement): Promise<void> {
  const session = sessions.get(tile)
  sessions.delete(tile)
  ;(await session)?.teardown()
}

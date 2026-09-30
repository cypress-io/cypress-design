/**
 * tile-editor — edit a demo tile's code on the page and re-render its
 * preview as you type. Loaded on demand the first time someone clicks a
 * tile's Edit button (see DemoTile.astro), so pages pay nothing until then.
 *
 * Pipeline, all in the browser:
 *   Vue   — vue/compiler-sfc turns the SFC into a TS module (template
 *           inlined), then sucrase strips types and rewrites imports.
 *   React — sucrase strips types, compiles JSX, and rewrites imports.
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
    if (!load)
      throw new Error(
        `The editor can't import "${specifier}". Use a @cypress-design package, vue, or react.`,
      )
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
// Editing session
// ---------------------------------------------------------------------------

const sessions = new WeakMap<HTMLElement, () => void>()

function message(err: unknown): string {
  if (err instanceof Error) return err.message
  if (err && typeof err === 'object' && 'message' in err)
    return String((err as { message: unknown }).message)
  return String(err)
}

/** Turn a tile's code block into an editor. Returns false if already editing. */
export async function startEditing(tile: HTMLElement): Promise<boolean> {
  if (sessions.has(tile)) return false
  const framework = tile.dataset.framework as Framework
  const preview = tile.querySelector<HTMLElement>('[data-tile-preview]')!
  const pre = tile.querySelector<HTMLPreElement>('pre')!
  const original = pre.textContent ?? ''

  // Editor: a textarea styled like the Shiki block it replaces.
  const editor = document.createElement('textarea')
  editor.value = original
  editor.spellcheck = false
  editor.setAttribute('aria-label', 'Tile code')
  editor.className =
    'block w-full resize-y rounded-b px-6 py-4 font-brand-mono text-sm leading-[1.5] outline-none focus-visible:ring-2 focus-visible:ring-indigo-400'
  const preStyle = getComputedStyle(pre)
  editor.style.backgroundColor = preStyle.backgroundColor
  editor.style.color = preStyle.color
  editor.style.tabSize = '2'
  const fit = () => {
    editor.style.height = 'auto'
    editor.style.height = `${editor.scrollHeight + 2}px`
  }
  pre.hidden = true
  pre.after(editor)
  fit()

  // Live output replaces the static island while editing.
  const island = preview.firstElementChild as HTMLElement | null
  const output = document.createElement('div')
  const error = document.createElement('p')
  error.className =
    '!my-0 !mt-4 text-sm text-red-500 font-brand-mono whitespace-pre-wrap'
  error.setAttribute('role', 'status')
  if (island) island.hidden = true
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
    try {
      const component = await evaluate(
        await toModuleCode(editor.value, framework),
      )
      if (current !== run) return
      error.textContent = ''
      mounted.update(component)
    } catch (err) {
      if (current === run) showError(err) // keep the last good render
    }
  }

  let timer: ReturnType<typeof setTimeout> | undefined
  editor.addEventListener('input', () => {
    fit()
    clearTimeout(timer)
    timer = setTimeout(render, 300)
  })
  editor.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || event.shiftKey) return
    event.preventDefault()
    editor.setRangeText('  ', editor.selectionStart, editor.selectionEnd, 'end')
    editor.dispatchEvent(new Event('input'))
  })

  sessions.set(tile, () => {
    clearTimeout(timer)
    mounted.unmount()
    output.remove()
    error.remove()
    editor.remove()
    pre.hidden = false
    if (island) island.hidden = false
  })

  await render()
  editor.focus()
  return true
}

/** Put the tile back to its original code and preview. */
export function stopEditing(tile: HTMLElement): void {
  sessions.get(tile)?.()
  sessions.delete(tile)
}

import { test, expect } from 'vitest'
import postcss from 'postcss'
import tailwindcss, { Config } from 'tailwindcss'
import { Processor } from 'windicss/lib'
// @ts-expect-error don't install types just for a test
import PluginInteractionVariants from '@windicss/plugin-interaction-variants'
import { tailwindPlugin, shortcuts } from './shortcuts'

function run(input: string, config: Config) {
  return postcss(tailwindcss(config)).process(input, {
    from: undefined,
  })
}

test('windi should generate correct css', () => {
  const processor = new Processor({
    plugins: [PluginInteractionVariants],
    shortcuts,
  })
  const result = processor.interpret('card')
  expect(result.styleSheet.build()).toMatchInlineSnapshot(`
    ".card {
      --tw-bg-opacity: 1;
      background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
      --tw-border-opacity: 1;
      border-color: rgba(243, 244, 246, var(--tw-border-opacity));
      border-radius: 0.25rem;
      border-width: 1px;
      cursor: pointer;
      display: block;
      width: 100%;
      -webkit-transition-duration: 0ms;
      -o-transition-duration: 0ms;
      transition-duration: 0ms;
    }
    .card:hover, .card:focus {
      --tw-border-opacity: 1;
      border-color: rgba(165, 180, 252, var(--tw-border-opacity));
      --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
      --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
      -webkit-box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
      box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
      --tw-ring-opacity: 1;
      --tw-ring-color: rgba(224, 231, 255, var(--tw-ring-opacity));
    }
    .card:disabled:hover {
      border-color: transparent;
    }"
  `)
})

test('tw generates shortcut classes', async () => {
  const config = {
    content: [
      {
        raw: `<div class="card"/>`,
      },
    ],
    corePlugins: {
      preflight: false,
    },
    plugins: [tailwindPlugin],
  }
  const output = await run('@tailwind components', config)
  expect(output.css).toMatchInlineSnapshot(`
    ".card {
        background: white;
        border-width: 1px;
        border-style: solid;
        border-color: #f3f4f6;
        border-radius: 0.25rem;
        cursor: pointer;
        display: block;
        width: 100%;
        outline: none;
        transition: all 150ms ease-in-out;
    }
    .card:hover,.card:focus {
        border-width: 1px;
        border-color: #a5b4fc;
        box-shadow: 0 0 0 2px #e0e7ff;
        transition: all 150ms ease-in-out;
        outline: 2px solid transparent;
    }
    .card:hover:disabled, .card:focus:disabled {
        box-shadow: none;
        border-color: transparent;
    }"
  `)
})

import { test, expect } from 'vitest'
import postcss from 'postcss'
import tailwindcss, { Config } from 'tailwindcss'
import { tailwindPlugin } from './shortcuts'

function run(input: string, config: Config) {
  return postcss(tailwindcss(config)).process(input, {
    from: undefined,
  })
}

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

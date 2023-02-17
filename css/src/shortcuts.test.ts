import { it, expect } from 'vitest'
import postcss from 'postcss'
import tailwindcss, { Config } from 'tailwindcss'
import { tailwindPlugin } from './shortcuts'

function run(input: string, config: Config) {
  return postcss(tailwindcss(config)).process(input, {
    from: undefined,
  })
}

it('generates icon classes', async () => {
  let config = {
    content: [
      {
        raw: `<div class="hocus-within-default"></div>`,
      },
    ],
    corePlugins: {
      preflight: false,
    },
    plugins: [tailwindPlugin],
  }
  const output = await run('@tailwind components', config)
  expect(output.css).toMatchInlineSnapshot(`
    ".hocus-within-default {
        outline: none;
        transition: all 150ms ease-in-out;
    }
    .hocus-within-default:hover {
        outline: transparent;
        border-width: 1px;
        border-color: #a5b4fc;
        box-shadow: 0 0 0 2px undefined;
    }
    .hocus-within-default:hover:disabled {
        box-shadow: none;
        border-color: transparent;
    }
    .hocus-within-default:focus-within {
        outline: transparent;
        border-width: 1px;
        border-color: #a5b4fc;
        box-shadow: 0 0 0 2px undefined;
    }
    .hocus-within-default:focus-within:disabled {
        box-shadow: none;
        border-color: transparent;
    }"
  `)
})

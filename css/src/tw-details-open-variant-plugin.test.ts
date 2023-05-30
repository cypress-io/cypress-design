import { it, expect } from 'vitest'
import { runTailwind } from './testUtils'
import openPlugin from './tw-details-open-variant-plugin'

it('generates icon classes', async () => {
  const config = {
    content: [
      {
        raw: `
				<details class="open:bg-teal-300 details-none">
					<summary class="open:bg-indigo-300">THIS IS A SUMMARY</summary>
					<div class="p-4">content</div>
				</details>`,
      },
    ],
    corePlugins: {
      preflight: false,
    },
    plugins: [openPlugin],
  }
  const output = await runTailwind('@tailwind utilities', config)

  expect(output.css).toMatchInlineSnapshot(`
    ".p-4 {
        padding: 1rem
    }
    .details-none::-webkit-details-marker {
        display: none
    }
    .open\\\\:bg-indigo-300[open] {
        --tw-bg-opacity: 1;
        background-color: rgb(165 180 252 / var(--tw-bg-opacity))
    }
    .open\\\\:bg-teal-300[open] {
        --tw-bg-opacity: 1;
        background-color: rgb(94 234 212 / var(--tw-bg-opacity))
    }
    details[open] .open\\\\:bg-indigo-300 {
        --tw-bg-opacity: 1;
        background-color: rgb(165 180 252 / var(--tw-bg-opacity))
    }
    details[open] .open\\\\:bg-teal-300 {
        --tw-bg-opacity: 1;
        background-color: rgb(94 234 212 / var(--tw-bg-opacity))
    }"
  `)
})

import { it, expect } from 'vitest'
import postcss from 'postcss'
import tailwindcss, { Config } from 'tailwindcss'
import iconPlugin from './tw-icon-plugin'

function run(input: string, config: Config) {
  return postcss(tailwindcss(config)).process(input, {
    from: undefined,
  })
}

it('generates icon classes', async () => {
  let config = {
    content: [
      {
        raw: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" class="m-2 icon-dark-teal-400 icon-light-teal-50 icon-dark-secondary-indigo-400 icon-light-secondary-indigo-50 icon-hover:icon-dark-teal-900 group-hover:icon-light-red-400">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M32 5.18V13h7.82a2 2 0 0 0-.406-.586l-6.828-6.828A1.999 1.999 0 0 0 32 5.18Z" fill="#D0D2E0" class="icon-light"></path><path d="m20 21-3 3 3 3m8-6 3 3-3 3m-5.5 2.5 3-11M32 5.18a2 2 0 0 0-.828-.18H9a1 1 0 0 0-1 1v36a1 1 0 0 0 1 1h30a1 1 0 0 0 1-1V13.828a2 2 0 0 0-.18-.828M32 5.18c.216.098.415.235.586.406l6.828 6.828a2 2 0 0 1 .406.586M32 5.18V13h7.82" stroke="currentColor" class="icon-dark" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
					<path d="M43 40a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" class="icon-light-secondary" fill="#A3E7CB"></path><path d="M37 38v2m0 2v-2m0 0h2-4m8 0a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" stroke="#00814D" class="icon-dark-secondary" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>`,
      },
    ],
    corePlugins: {
      preflight: false,
    },
    plugins: [iconPlugin],
  }
  const output = await run('@tailwind components', config)

  expect(output.css).toMatchInlineSnapshot(`
    ".icon-light-teal-50 > *[fill].icon-light {
        fill: #f0fdfa
    }
    .icon-light-teal-50 > *[stroke].icon-light {
        stroke: #f0fdfa
    }
    .icon-light-teal-50 > *[stroke][fill].icon-light-fill {
        fill: #f0fdfa
    }
    .icon-light-teal-50 > *[stroke][fill].icon-light-stroke {
        stroke: #f0fdfa
    }
    .icon-dark-teal-400 > *[fill].icon-dark {
        fill: #2dd4bf
    }
    .icon-dark-teal-400 > *[stroke].icon-dark {
        stroke: #2dd4bf
    }
    .icon-dark-teal-400 > *[stroke][fill].icon-dark-fill {
        fill: #2dd4bf
    }
    .icon-dark-teal-400 > *[stroke][fill].icon-dark-stroke {
        stroke: #2dd4bf
    }
    .icon-light-secondary-indigo-50 > *[fill].icon-light-secondary {
        fill: #eef2ff
    }
    .icon-light-secondary-indigo-50 > *[stroke].icon-light-secondary {
        stroke: #eef2ff
    }
    .icon-light-secondary-indigo-50 > *[stroke][fill].icon-light-secondary-fill {
        fill: #eef2ff
    }
    .icon-light-secondary-indigo-50 > *[stroke][fill].icon-light-secondary-stroke {
        stroke: #eef2ff
    }
    .icon-dark-secondary-indigo-400 > *[fill].icon-dark-secondary {
        fill: #818cf8
    }
    .icon-dark-secondary-indigo-400 > *[stroke].icon-dark-secondary {
        stroke: #818cf8
    }
    .icon-dark-secondary-indigo-400 > *[stroke][fill].icon-dark-secondary-fill {
        fill: #818cf8
    }
    .icon-dark-secondary-indigo-400 > *[stroke][fill].icon-dark-secondary-stroke {
        stroke: #818cf8
    }
    .group:hover .group-hover\\\\:icon-light-red-400 > *[fill].icon-light {
        fill: #f87171
    }
    .group:hover .group-hover\\\\:icon-light-red-400 > *[stroke].icon-light {
        stroke: #f87171
    }
    .group:hover .group-hover\\\\:icon-light-red-400 > *[stroke][fill].icon-light-fill {
        fill: #f87171
    }
    .group:hover .group-hover\\\\:icon-light-red-400 > *[stroke][fill].icon-light-stroke {
        stroke: #f87171
    }
    .icon-hover\\\\:icon-dark-teal-900:hover > *[fill].icon-dark {
        fill: #134e4a
    }
    .icon-hover\\\\:icon-dark-teal-900:hover > *[stroke].icon-dark {
        stroke: #134e4a
    }
    .icon-hover\\\\:icon-dark-teal-900:hover > *[stroke][fill].icon-dark-fill {
        fill: #134e4a
    }
    .icon-hover\\\\:icon-dark-teal-900:hover > *[stroke][fill].icon-dark-stroke {
        stroke: #134e4a
    }"
  `)
})

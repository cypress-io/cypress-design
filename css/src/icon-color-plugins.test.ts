import { Processor } from 'windicss/lib'
import { test, expect } from 'vitest'
import { IconDuotoneColorsPlugin } from './icon-color-plugins'

test('should generate correct css', () => {
  const processor = new Processor({
    plugins: [IconDuotoneColorsPlugin],
  })
  const result = processor.interpret(
    'icon-light-blue-500 icon-hover:icon-light-blue-700 icon-focus:icon-light-blue-700 icon-dark-blue-200 icon-hocus:icon-dark-blue-700'
  )
  expect(result.ignored.length).toEqual(0)
  expect(result.styleSheet.build()).toMatchInlineSnapshot(`
    ".icon-dark-blue-200 > *[fill].icon-dark {
      fill: #bfdbfe;
    }
    .icon-dark-blue-200 > *[stroke].icon-dark {
      stroke: #bfdbfe;
    }
    .icon-dark-blue-200 > *[fill][stroke].icon-dark-fill {
      fill: #bfdbfe;
    }
    .icon-dark-blue-200 > *[fill][stroke].icon-dark-stroke {
      stroke: #bfdbfe;
    }
    .icon-light-blue-500 > *[fill].icon-light {
      fill: #3b82f6;
    }
    .icon-light-blue-500 > *[stroke].icon-light {
      stroke: #3b82f6;
    }
    .icon-light-blue-500 > *[fill][stroke].icon-light-fill {
      fill: #3b82f6;
    }
    .icon-light-blue-500 > *[fill][stroke].icon-light-stroke {
      stroke: #3b82f6;
    }
    .icon-hover\\\\:icon-light-blue-700:hover > *[fill].icon-light {
      fill: #1d4ed8;
    }
    .icon-focus\\\\:icon-light-blue-700:focus > *[fill].icon-light {
      fill: #1d4ed8;
    }
    .icon-hover\\\\:icon-light-blue-700:hover > *[stroke].icon-light {
      stroke: #1d4ed8;
    }
    .icon-focus\\\\:icon-light-blue-700:focus > *[stroke].icon-light {
      stroke: #1d4ed8;
    }
    .icon-hover\\\\:icon-light-blue-700:hover > *[fill][stroke].icon-light-fill {
      fill: #1d4ed8;
    }
    .icon-focus\\\\:icon-light-blue-700:focus > *[fill][stroke].icon-light-fill {
      fill: #1d4ed8;
    }
    .icon-hover\\\\:icon-light-blue-700:hover > *[fill][stroke].icon-light-stroke {
      stroke: #1d4ed8;
    }
    .icon-focus\\\\:icon-light-blue-700:focus > *[fill][stroke].icon-light-stroke {
      stroke: #1d4ed8;
    }
    .icon-hocus\\\\:icon-dark-blue-700:hover > *[fill].icon-dark, .icon-hocus\\\\:icon-dark-blue-700:focus > *[fill].icon-dark {
      fill: #1d4ed8;
    }
    .icon-hocus\\\\:icon-dark-blue-700:hover > *[stroke].icon-dark, .icon-hocus\\\\:icon-dark-blue-700:focus > *[stroke].icon-dark {
      stroke: #1d4ed8;
    }
    .icon-hocus\\\\:icon-dark-blue-700:hover > *[fill][stroke].icon-dark-fill, .icon-hocus\\\\:icon-dark-blue-700:focus > *[fill][stroke].icon-dark-fill {
      fill: #1d4ed8;
    }
    .icon-hocus\\\\:icon-dark-blue-700:hover > *[fill][stroke].icon-dark-stroke, .icon-hocus\\\\:icon-dark-blue-700:focus > *[fill][stroke].icon-dark-stroke {
      stroke: #1d4ed8;
    }"
  `)
})

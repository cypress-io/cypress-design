import { Processor } from 'windicss/lib'
import { test, expect } from 'vitest'
import DetailsOpenVariantPlugin from './details-open-variant-plugin'

test('should generate correct css', () => {
  const processor = new Processor({
    plugins: [DetailsOpenVariantPlugin],
  })
  const result = processor.interpret('pb-10px open:pb-20px')
  expect(result.styleSheet.build()).toMatchInlineSnapshot(`
    ".pb-10px {
      padding-bottom: 10px;
    }
    .open\\\\:pb-20px[open], details[open] .open\\\\:pb-20px {
      padding-bottom: 20px;
    }"
  `)
})

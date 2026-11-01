import { describe, expect, it } from 'vitest'
import { humanUrlFor, remarkAgentLinks } from './remark-agent-links.mjs'

const A = 'https://design.cypress.io/agents/'

describe('humanUrlFor', () => {
  it('sends component docs to the component page, keeping the anchor', () => {
    expect(humanUrlFor(`${A}components/Button/instructions.md`)).toBe(
      '/components/Button',
    )
    expect(humanUrlFor(`${A}components/Select/instructions.md#items`)).toBe(
      '/components/Select#items',
    )
  })

  it('sends framework ReadMes to the matching framework tab', () => {
    expect(humanUrlFor(`${A}components/Tabs/react/ReadMe.md`)).toBe(
      '/components/Tabs?fw=react',
    )
    expect(humanUrlFor(`${A}components/Tabs/vue/ReadMe.md`)).toBe(
      '/components/Tabs?fw=vue',
    )
  })

  it('drops contributor notes', () => {
    expect(humanUrlFor(`${A}components/Textbox/architecture.md`)).toBeNull()
  })

  it('sends the colors pillar to the colors page', () => {
    expect(humanUrlFor(`${A}colors.md`)).toBe('/colors')
  })

  it('leaves other URLs alone', () => {
    for (const url of [
      `${A}voice.md`,
      'https://design.cypress.io/icons',
      'https://www.figma.com/design/x',
      '#custom-trigger-accessibility',
    ]) {
      expect(humanUrlFor(url)).toBe(url)
    }
  })
})

describe('remarkAgentLinks', () => {
  it('rewrites nested link and definition nodes', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'link', url: `${A}components/Tag/instructions.md` },
          ],
        },
        { type: 'definition', url: `${A}colors.md` },
      ],
    }
    remarkAgentLinks()(tree)
    expect(tree.children[0].children[0].url).toBe('/components/Tag')
    expect(tree.children[1].url).toBe('/colors')
  })

  const arch = (label) => ({
    type: 'link',
    url: `${A}components/Select/architecture.md`,
    children: [{ type: 'text', value: label }],
  })
  const text = (value) => ({ type: 'text', value })

  it('removes a list item that only held an architecture link', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'list',
          children: [
            {
              type: 'listItem',
              children: [{ type: 'paragraph', children: [text('Figma: x')] }],
            },
            {
              type: 'listItem',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    text('Implementation details: '),
                    arch('architecture.md'),
                  ],
                },
              ],
            },
          ],
        },
      ],
    }
    remarkAgentLinks()(tree)
    expect(tree.children[0].children).toHaveLength(1)
  })

  it('removes the whole list when that was its only item', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'list',
          children: [
            {
              type: 'listItem',
              children: [
                {
                  type: 'paragraph',
                  children: [text('Notes: '), arch('architecture.md')],
                },
              ],
            },
          ],
        },
      ],
    }
    remarkAgentLinks()(tree)
    expect(tree.children).toHaveLength(0)
  })

  it('keeps the rest of a sentence when the link sits inside real text', () => {
    const paragraph = {
      type: 'paragraph',
      children: [
        text('Sizes are px-based; see '),
        arch('the notes'),
        text('.'),
      ],
    }
    const tree = { type: 'root', children: [paragraph] }
    remarkAgentLinks()(tree)
    expect(tree.children).toHaveLength(1)
    expect(paragraph.children.map((c) => c.value).join('')).toBe(
      'Sizes are px-based; see .',
    )
  })
})

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

  it('sends contributor notes to the source on GitHub', () => {
    expect(humanUrlFor(`${A}components/Textbox/architecture.md`)).toBe(
      'https://github.com/cypress-io/cypress-design/blob/main/components/Textbox/architecture.md',
    )
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
})

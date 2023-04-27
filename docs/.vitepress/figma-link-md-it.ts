function addFigmaLink(md: any) {
  // Remember old renderer, if overridden, or proxy to default renderer
  var defaultRender = md.renderer.rules.link_open

  md.renderer.rules.link_open = function (...args: any[]) {
    const [tokens, idx] = args
    const openLinkTagToken = tokens[idx]
    const textToken = tokens[idx + 1]
    if (textToken?.type === 'text' && textToken.content.startsWith('figma::')) {
      textToken.content = textToken.content.replace(/^figma::/, '')
      openLinkTagToken.attrPush(['class', 'figma-link'])
      openLinkTagToken.attrPush(['title', `View ${textToken.content} in Figma`])
    }

    // pass token to default renderer.
    return defaultRender(...args)
  }
}

// Dirty hack to make `import X from 'markdown-it-X'` work with
// TypeScript which doesn't support the `module` field of `package.json` and
// will always get the CommonJS version which otherwise wouldn't have a
// `default` key, resulting in markdown-it-X being undefined when being
// imported that way.
addFigmaLink.default = addFigmaLink

export default addFigmaLink

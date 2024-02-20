/**
 * SVGO plugin that will transform `<svg><defs/><path/></svg>` into just `<svg><path/><defs/></svg>`
 * This way we can extract it more easily.
 */
module.exports = {
  name: 'move-defs-to-end-plugin',
  type: 'visitor',
  fn: () => {
    return {
      element: {
        exit: (node) => {
          if (node.name !== 'svg') return
          node.children = [].concat(
            node.children.filter(
              (child) => child.type !== 'element' || child.name !== 'defs',
            ),
            node.children.filter(
              (child) => child.type === 'element' && child.name === 'defs',
            ),
          )
        },
      },
    }
  },
}

/**
 * SVGO plugin that will transform `<svg><path/></svg>` into just `<path/>`
 * It will be used to build svg components from svg files
 */

module.exports = {
  name: 'extract-body-plugin',
  description:
    'Since we want to use the body of the SVGs inside the icons, we only need their body',
  type: 'visitor',
  fn: () => {
    return {
      root: {
        exit: (ast) => {
          ast.children = ast.children.find(
            (node) => node.name === 'svg' && node.type === 'element'
          ).children;
        },
      },
    };
  },
};

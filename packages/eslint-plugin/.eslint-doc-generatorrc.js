const prettier = require('prettier')

/** @type {import('eslint-doc-generator').GenerateOptions} */
module.exports = {
  // Format like the pre-commit hook does, so `--check` and Prettier agree.
  postprocess: async (content, path) =>
    prettier.format(content, {
      ...(await prettier.resolveConfig(path)),
      parser: 'markdown',
    }),
}

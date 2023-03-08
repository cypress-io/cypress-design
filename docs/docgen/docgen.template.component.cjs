// @ts-check
const { defaultTemplates } = require('vue-docgen-cli')

/** @type typeof import('vue-docgen-cli').defaultTemplates.component */
module.exports = function (...args) {
  const [, doc, , fileName] = args
  return `
<script lang="ts" setup>
import { ${doc.exportName} as ${
    doc.displayName
  } } from '../../../components/${fileName}'
const components$ = { ${doc.displayName} }
</script>
${defaultTemplates.component(...args)}`
}

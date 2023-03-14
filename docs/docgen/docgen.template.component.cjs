// @ts-check
const { defaultTemplates } = require('vue-docgen-cli')

/** @type typeof import('vue-docgen-cli').defaultTemplates.component */
module.exports = function (...args) {
  const [, doc, , fileName] = args
  const tempName = `__${doc.displayName}__`
  return `
<script lang="ts" setup>
import { ${
    doc.exportName
  } as ${tempName} } from '../../../components/${fileName}'
const components$ = { ${doc.displayName}: ${tempName} }
</script>
${defaultTemplates.component(...args)}`
}

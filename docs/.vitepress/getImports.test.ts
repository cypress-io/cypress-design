import { describe, it, expect } from 'vitest'
import { getImports } from './getImports'

describe('getImports', () => {
  it('should return an array of imports', () => {
    const code = `
		<script lang="ts" setup>
		import { IconActionQuestionMarkCircle as LocalIcon, IconActionOther as LocalIconOther } from "@cypress-design/vue-icon";
		</script>
			`
    const imports = getImports(code)
    expect(imports).toMatchInlineSnapshot(`
			{
			  "LocalIcon": {
			    "imported": "IconActionQuestionMarkCircle",
			    "isFromSetup": true,
			    "isType": false,
			    "isUsedInTemplate": true,
			    "local": "LocalIcon",
			    "source": "@cypress-design/vue-icon",
			  },
			  "LocalIconOther": {
			    "imported": "IconActionOther",
			    "isFromSetup": true,
			    "isType": false,
			    "isUsedInTemplate": true,
			    "local": "LocalIconOther",
			    "source": "@cypress-design/vue-icon",
			  },
			}
		`)
  })
})

import { describe, it, expect } from 'vitest'
import { getImports } from './getImports'

describe('getImports', () => {
  it('should return an array of imports', async () => {
    const code = `
		<script lang="ts" setup>
		import { IconActionQuestionMarkCircle as LocalIcon, IconActionOther as LocalIconOther } from "@cypress-design/vue-icon";
		</script>
			`
    const imports = await getImports(code)
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

  it('should return an array of imports', async () => {
    const code = `
		import { 
			IconActionQuestionMarkCircle as LocalIcon, 
			IconActionOther as LocalIconOther,
			IconSolo,
			type IconSoloType,
		} from "@cypress-design/vue-icon";
		import { Babar } from "./babar"
		const type = 'hello' as IconSoloType
		return () => (<>
			<LocalIcon>Hello</LocalIcon>
			<LocalIconOther/>
			<IconSolo/>
			<Babar/>
		</>)
		`
    const imports = await getImports(code)
    expect(imports).toMatchInlineSnapshot(`
      {
        "": {
          "imported": "",
          "source": "@cypress-design/vue-icon",
        },
        "Babar": {
          "imported": "Babar",
          "source": "./babar",
        },
        "IconSolo": {
          "imported": "IconSolo",
          "source": "@cypress-design/vue-icon",
        },
        "LocalIcon": {
          "imported": "IconActionQuestionMarkCircle",
          "source": "@cypress-design/vue-icon",
        },
        "LocalIconOther": {
          "imported": "IconActionOther",
          "source": "@cypress-design/vue-icon",
        },
      }
    `)
  })
})

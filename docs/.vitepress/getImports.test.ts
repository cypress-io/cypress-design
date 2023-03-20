import { describe, it, expect } from 'vitest'
import { getImports, parseImports } from './getImports'

describe('parseImports', () => {
  it('should return an array of imports', async () => {
    const code = `
		import Icon, { IconActionQuestionMarkCircle as LocalIcon, IconActionOther as LocalIconOther } from "@cypress-design/vue-icon";
		`
    const imports = parseImports(code)
    expect(imports).toMatchInlineSnapshot(`
      {
        "Icon": {
          "imported": "default",
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
        "_": {
          "source": "@cypress-design/vue-icon",
        },
      }
    `)
  })

  it('should return independent imports', async () => {
    const code = `
		import "@cypress-design/vue-icon/style.css";
		`
    const imps = parseImports(code)
    expect(imps).toMatchInlineSnapshot(`
      {
        "_": {
          "source": "@cypress-design/vue-icon/style.css",
        },
      }
    `)
  })
})

describe('getImports', () => {
  it('should return an array of imports', async () => {
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
          "source": "@cypress-design/vue-icon",
        },
        "LocalIconOther": {
          "imported": "IconActionOther",
          "source": "@cypress-design/vue-icon",
        },
        "_": {
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
        "_": {
          "source": "./babar",
        },
      }
    `)
  })
})

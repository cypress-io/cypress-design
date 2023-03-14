import { getImports } from './getImports'

let importMarker = 0

function addVueLive(md: any) {
  const fence = md.renderer.rules.fence

  md.renderer.rules.fence = (...args: any[]) => {
    const [tokens, idx, _, env] = args

    const token: { info: string; content: string } = tokens[idx]
    const lang = token.info.trim()

    // if it does not ends with live just use default fence
    if (!/ live$/.test(lang) && !/ live /.test(lang)) {
      return fence(...args)
    }

    const code = token.content

    // analyze code to find requires
    // put all requires into a "requires" object
    // add this as a prop
    const imports = getImports(code)
    const requires = `${Object.entries(imports).map(([key, oneImport]) => {
      return `import { ${oneImport.imported} as ${key} } from '${oneImport.source}';
			`
    })}
		const imports$${importMarker} = {}
		${Object.entries(imports).map(([key, oneImport]) => {
      return `imports$${importMarker}['${oneImport.source}'] = { ${oneImport.imported}: ${key} };
		`
    })}`

    const scriptBlock = env.sfcBlocks.scripts.find(
      (s: any) => s.type === 'script' && s.tagOpen.includes('setup')
    )
    if (!scriptBlock) {
      env.sfcBlocks.scripts.push({
        type: 'script',
        tagOpen: '<script lang="ts" setup>',
        contentStripped: requires,
        tagClose: '</script>',
        content: `<script setup>${requires}</script>`,
      })
    } else {
      scriptBlock.contentStripped += requires
      scriptBlock.content =
        scriptBlock.tagOpen + scriptBlock.contentStripped + scriptBlock.tagClose
    }

    const langArray = lang.split(' ')
    const framework = env.relativePath.split('/')[1] // components/vue/xxx.md -> vue
    const codeClean = md.utils
      .escapeHtml(code)
      .replace(/\`/g, '\\`')
      .replace(/\$/g, '\\$')
    const jsx = langArray.length > 2 && langArray[1] === 'jsx' ? 'jsx ' : '' // to enable jsx, we want ```vue jsx live or ```jsx jsx live
    const markdownGenerated = `<vue-live ${jsx}
      framework="${framework}" 
      :code="\`${codeClean}\`" 
      :requires="imports$${importMarker}"
			:components="components$"
       />`

    importMarker++
    return markdownGenerated
  }
}

// Dirty hack to make `import anchor from 'markdown-it-anchor'` work with
// TypeScript which doesn't support the `module` field of `package.json` and
// will always get the CommonJS version which otherwise wouldn't have a
// `default` key, resulting in markdown-it-anchor being undefined when being
// imported that way.
addVueLive.default = addVueLive

export default addVueLive

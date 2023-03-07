const { defaultTemplates } = require('vue-docgen-cli')

const { renderTags, mdclean } = defaultTemplates

function lineTemplate(props) {
  let ret = ''

  props.forEach((pr) => {
    const p = pr.name
    let t = pr.description ?? ''
    t += renderTags(pr.tags)
    const n = pr.type?.name ?? ''
    const d = pr.defaultValue?.value ?? ''

    ret += `| ${mdclean(p)} | ${mdclean(t)} | ${mdclean(n)} | ${mdclean(d)} |\n`
  })
  return ret
}

module.exports = function (props, opt) {
  return `
${opt?.isSubComponent || opt?.hasSubComponents ? '#' : ''}## Props

| Prop name     | Description | Type      | Default     |
| ------------- | ----------- | --------- | ----------- |
${lineTemplate(props)}
`
}

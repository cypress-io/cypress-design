import React, { createElement } from 'react'
import { transform as sucrase } from 'sucrase'
export { createRoot } from 'react-dom/client'
export { createElement }

export const ReactPreview = ({ code, requires, components }) => {
  const require = (name) => {
    if (requires[name]) {
      return requires[name]
    }
    if (name.startsWith('$')) {
      const componentQuery = name.slice(1)
      if (components[componentQuery]) {
        return components[componentQuery]
      }
    }
    throw new Error(`[react-preview] Cannot find module '${name}'`)
  }

  const isPureJSX = code.trim().startsWith('<')
  if (isPureJSX) {
    code = `
		${Object.keys(components)
      .map((comp) => `import ${comp} from '$${comp}'`)
      .join('\n')}
		return () => (${code})`
    const { code: compiledCode } = sucrase(code, {
      transforms: ['jsx', 'typescript', 'imports'],
      production: true,
    })
    const LivePreview = new Function('require', 'React', compiledCode)

    return createElement(LivePreview(require, React))
  } else {
    const { code: compiledCode } = sucrase(
      `${Object.keys(components)
        .map((comp) => `import ${comp} from '$${comp}'`)
        .join('\n')};${code}`,
      {
        transforms: ['jsx', 'typescript', 'imports'],
        production: true,
      }
    )
    const LivePreview = new Function(
      'require',
      'React',
      `const exports = {};${compiledCode};return exports.default ?? exports`
    )
    return createElement(LivePreview(require, React))
  }
}

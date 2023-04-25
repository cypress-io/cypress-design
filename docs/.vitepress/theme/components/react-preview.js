import React, { createElement } from 'react'
import { transform as sucrase } from 'sucrase'
export { createRoot } from 'react-dom/client'
export { createElement }

function getComponentCode(code, components) {
  const isPureJSX = code.trim().startsWith('<')
  if (isPureJSX) {
    const compCode = `
  ${Object.keys(components)
    .map((comp) => `import ${comp} from '$${comp}'`)
    .join('\n')}
  return () => (${code})`

    return sucrase(compCode, {
      transforms: ['jsx', 'typescript', 'imports'],
      production: true,
    }).code
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
    const funCode = `"use strict";const exports = {};${compiledCode.replace(
      /^"use strict";/g,
      ''
    )}
  const keys = Object.keys(exports);
  return exports.default ?? exports[keys[0]]`
    return funCode
  }
}

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

  const LivePreview = new Function(
    'require',
    'React',
    getComponentCode(code, components)
  )

  return createElement(LivePreview(require, React))
}

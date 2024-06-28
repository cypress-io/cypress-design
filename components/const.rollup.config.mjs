// @ts-check
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { parse } from '@babel/parser'
import { visit, print } from 'recast'

function parseCode(code) {
  return parse(code, {
    sourceType: 'module',
    strictMode: false,
    tokens: true,
    plugins: [
      'decorators-legacy',
      'doExpressions',
      'objectRestSpread',
      'classProperties',
      'classPrivateProperties',
      'classPrivateMethods',
      'exportDefaultFrom',
      'exportNamespaceFrom',
      'asyncGenerators',
      'functionBind',
      'functionSent',
      'dynamicImport',
      'numericSeparator',
      'optionalChaining',
      'importMeta',
      'bigInt',
      'optionalCatchBinding',
      'throwExpressions',
      'nullishCoalescingOperator',
      'importAssertions',
      'typescript',
    ],
  })
}

function visitConstantClassProperty(path, componentClassPrefix, onClass) {
  for (const property of path.properties) {
    if (property.type === 'ObjectProperty') {
      const { value, key } = property
      if (value.type === 'StringLiteral' && key.type === 'Identifier') {
        onClass(`${componentClassPrefix}-${key.name}`, value.value, value)
      } else if (value.type === 'ObjectExpression') {
        const keyName =
          key.type === 'Identifier'
            ? key.name
            : key.type === 'StringLiteral'
              ? key.value
              : null

        if (!keyName) {
          throw Error(`wrong key type ${key.type}`)
        }
        visitConstantClassProperty(
          value,
          `${componentClassPrefix}-${keyName.toLowerCase()}`,
          onClass,
        )
      }
    }
  }
}

function visitConstantClass(path, componentClassPrefix, onClass) {
  // if the export is a constant declaration and the name of the constant starts with css
  // then replace the values with some component classes
  const {
    node: { declaration },
  } = path
  if (declaration && declaration.type === 'VariableDeclaration') {
    declaration.declarations.forEach((declaration) => {
      if (declaration.type !== 'VariableDeclarator') return false
      const { id, init } = declaration
      if (id?.type === 'Identifier' && id.name.startsWith('Css')) {
        const varName = id.name.slice(3).toLowerCase()
        if (init?.type === 'StringLiteral') {
          onClass(`${componentClassPrefix}-${varName}`, init.value, init)
        }
        if (init?.type === 'ObjectExpression') {
          visitConstantClassProperty(
            init,
            `${componentClassPrefix}-${varName}`,
            onClass,
          )
        }
      }
    })
  }
}

/**
 * @type {() => import('rollup').Plugin}
 */
function MakeTailwindComponentPluginRollupPlugin() {
  return {
    name: 'cypress-design:make-tailwind-component',
    transform(code, id) {
      const pathArray = id.split('/')

      const componentClassPrefix = `cyds-${pathArray[pathArray.indexOf('constants') - 1].toLowerCase()}`
      const ast = parseCode(code)

      const componentClassesDefinitions = {}

      visit(ast, {
        visitExportNamedDeclaration(path) {
          visitConstantClass(path, componentClassPrefix, (key, value) => {
            if (value.length) {
              componentClassesDefinitions[key] = { '@apply': value }
            }
          })
          return false
        },
      })

      return {
        code: `export default function plugin({ addComponents }) {
  ${
    Object.keys(componentClassesDefinitions).length
      ? `addComponents(${JSON.stringify(componentClassesDefinitions, null, 2)})`
      : ''
  }
}`,
      }
    },
  }
}

/**
 * @type {() => import('rollup').Plugin}
 */
function ComponentClassesRollupPlugin() {
  return {
    name: 'cypress-design:component-classes',
    transform(code, id) {
      const pathArray = id.split('/')

      const componentName = pathArray[pathArray.indexOf('constants') - 1]

      if (!componentName) {
        return { code }
      }

      const componentClassPrefix = `cyds-${componentName.toLowerCase()}`
      const ast = parseCode(code)

      visit(ast, {
        visitExportNamedDeclaration(path) {
          visitConstantClass(path, componentClassPrefix, (key, value, init) => {
            if (value.length) {
              init.value = key
            }
          })
          return false
        },
      })

      return {
        code: print(ast).code,
      }
    },
  }
}

export default ({ input = './src/index.ts', plugins = [], external = [] }) => [
  {
    input,
    output: [
      {
        file: './dist/index.umd.js',
        format: 'cjs',
        exports: 'auto',
        sourcemap: true,
      },
      {
        file: './dist/index.es.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      ComponentClassesRollupPlugin(),
      typescript({
        tsconfig: './tsconfig.json',
        declarationMap: true,
      }),
      ...plugins,
    ],
    external,
  },
  {
    input,
    output: [
      {
        file: './dist/tailwind-plugin.es.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [resolve(), commonjs(), MakeTailwindComponentPluginRollupPlugin()],
  },
]

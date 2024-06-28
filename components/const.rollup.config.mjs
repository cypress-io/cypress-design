// @ts-check
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { parse } from '@babel/parser'
import t from '@babel/types'
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
      const keyName =
        key.type === 'Identifier'
          ? key.name
          : key.type === 'StringLiteral'
            ? key.value
            : null

      if (!keyName) {
        throw Error(`wrong key type ${key.type}`)
      }

      if (value.type === 'StringLiteral') {
        onClass(
          makeClassName(`${componentClassPrefix}-${keyName}`),
          value.value,
          value,
        )
      } else if (value.type === 'ObjectExpression') {
        visitConstantClassProperty(
          value,
          `${componentClassPrefix}-${keyName}`,
          onClass,
        )
      }
    }
  }
}

function consolidateBinaryExpression(path) {
  const { left, right, operator } = path
  if (operator !== '+') {
    throw Error(`unsupported operator ${operator}`)
  }

  if (left.type === 'BinaryExpression') {
    return `${consolidateBinaryExpression(left)} ${operator} ${right.value}`
  }
  return `${left.value} ${operator} ${right.value}`
}

function visitConstantClass(path, componentClassPrefix, onClass) {
  // if the export is a constant declaration and the name of the constant starts with css
  // then replace the values with some component classes
  const {
    node: { declaration: topDeclaration },
  } = path
  if (topDeclaration && topDeclaration.type === 'VariableDeclaration') {
    for (const declaration of topDeclaration.declarations) {
      if (declaration.type !== 'VariableDeclarator') return false
      const { id, init } = declaration
      if (id?.type === 'Identifier') {
        const varName = id.name.startsWith('Css')
          ? id.name.slice(3).toLowerCase()
          : id.name.startsWith('Class')
            ? id.name.slice(5).toLowerCase()
            : null
        if (!varName) return false

        const pathToVisit =
          init?.type === 'TSAsExpression' ? init.expression : init

        if (pathToVisit.type === 'StringLiteral') {
          onClass(
            makeClassName(`${componentClassPrefix}-${varName}`),
            pathToVisit.value,
            pathToVisit,
          )
        }

        if (pathToVisit.type === 'BinaryExpression') {
          const binaryExpressionString =
            consolidateBinaryExpression(pathToVisit)

          declaration.init = t.stringLiteral(binaryExpressionString)

          onClass(
            makeClassName(`${componentClassPrefix}-${varName}`),
            binaryExpressionString,
            declaration.init,
          )
        }

        if (pathToVisit.type === 'ObjectExpression') {
          visitConstantClassProperty(
            pathToVisit,
            `${componentClassPrefix}-${varName}`,
            onClass,
          )
        }
      }
    }
  }
}

function makeClassName(className) {
  return className.toLowerCase().replace(/-classes-/g, '-')
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
            if (value.length && !key.includes('icon')) {
              componentClassesDefinitions[`.${key}`] = {
                [`@apply ${value}`]: {},
              }
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
            if (value.length && !key.includes('icon')) {
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

export default ({
  input = './src/index.ts',
  plugins = [],
  external = [],
  enableTailwind = true,
}) => [
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
      ...(enableTailwind ? [ComponentClassesRollupPlugin()] : []),
      typescript({
        tsconfig: './tsconfig.json',
        declarationMap: true,
      }),
      ...plugins,
    ],
    external,
  },
  ...(enableTailwind
    ? [
        {
          input,
          output: [
            {
              file: './dist/tailwind-plugin.es.mjs',
              format: 'esm',
              sourcemap: true,
            },
          ],
          plugins: [
            resolve(),
            commonjs(),
            MakeTailwindComponentPluginRollupPlugin(),
          ],
        },
      ]
    : []),
]

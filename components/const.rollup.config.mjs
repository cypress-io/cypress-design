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

/**
 * @type {() => import('rollup').Plugin}
 */
function MakeTailwindComponentPluginRollupPlugin() {
  return {
    name: 'cypress-design:make-tailwind-component',
    transform(code, id) {
      const pathArray = id.split('/')

      const componentClassPrefix = `cyds-${pathArray[pathArray.indexOf('constants') - 1]}`
      const ast = parseCode(code)

      const componentClassesDefinitions = {}

      visit(ast, {
        visitExportNamedDeclaration(path) {
          // if the export is a constant declaration and the name of the constant starts with css
          // then replace the values with some component classes
          const { node } = path
          const { declaration } = node
          if (declaration && declaration.type === 'VariableDeclaration') {
            declaration.declarations.forEach((declaration) => {
              if (declaration.type !== 'VariableDeclarator') return false
              const { id, init } = declaration
              if (id?.type === 'Identifier' && id.name.startsWith('Css')) {
                const varName = id.name.slice(3)
                if (init?.type === 'StringLiteral') {
                  componentClassesDefinitions[
                    `${componentClassPrefix}-${varName}`
                  ] = { '@apply': init.value }
                }
                if (init?.type === 'ObjectExpression') {
                  for (const property of init.properties) {
                    if (property.type === 'ObjectProperty') {
                      const { value, key } = property
                      if (
                        value.type === 'StringLiteral' &&
                        key.type === 'Identifier'
                      ) {
                        componentClassesDefinitions[
                          `${componentClassPrefix}-${varName}-${key.name}`
                        ] = { '@apply': value.value }
                      }
                    }
                  }
                }
              }
            })
          }
          return false
        },
      })

      return {
        code: `export default function plugin({ addComponents }) {
  addComponents(${JSON.stringify(componentClassesDefinitions, null, 2)})
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

      const componentClassPrefix = `cyds-${pathArray[pathArray.indexOf('constants') - 1]}`
      const ast = parseCode(code)

      visit(ast, {
        visitExportNamedDeclaration(path) {
          // if the export is a constant declaration and the name of the constant starts with css
          // then replace the values with some component classes
          const { node } = path
          const { declaration } = node
          if (declaration && declaration.type === 'VariableDeclaration') {
            declaration.declarations.forEach((declaration) => {
              if (declaration.type !== 'VariableDeclarator') return false
              const { id, init } = declaration
              if (id?.type === 'Identifier' && id.name.startsWith('Css')) {
                const varName = id.name.slice(3)
                if (init?.type === 'StringLiteral') {
                  init.value = `${componentClassPrefix}-${varName}`
                }
                if (init?.type === 'ObjectExpression') {
                  for (const property of init.properties) {
                    if (property.type === 'ObjectProperty') {
                      const { value, key } = property
                      if (
                        value.type === 'StringLiteral' &&
                        key.type === 'Identifier'
                      ) {
                        value.value = `${componentClassPrefix}-${varName}-${key.name}`
                      }
                    }
                  }
                }
              }
            })
          }
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

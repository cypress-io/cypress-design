/**
 * Generate icons.js and icons.d.ts
 * Also creates barrel files index.js and index.d.ts
 * Needs to be run last since it will override the dummy `icons` files generated by tsc
 */

import { fileURLToPath } from 'url'
import { COLOR_PREFIXES } from '@cypress-design/css'
import * as path from 'path'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import { globby } from 'globby'
import { promises as fs } from 'fs'
import camelCase from 'camelcase'
import _ from 'lodash'
import dedent from 'dedent'
import {
  cyColors,
  ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR,
} from '@cypress-design/css'

const propDescriptions = {
  StrokeColor: 'Color of the stroke',
  FillColor: 'Color of the fill',
  SecondaryStrokeColor: 'Color of the secondary stroke',
  SecondaryFillColor: 'Color of the secondary fill',
}

const ColorRoots = Object.keys(propDescriptions)

const propsRE = {
  hasStrokeColor: /icon-dark/,
  hasFillColor: /icon-light/,
  hasSecondaryStrokeColor: /icon-dark-secondary/,
  hasSecondaryFillColor: /icon-light-secondary/,
}

const prefixDescriptions = {
  hover: (root) => `${root} when hovered`,
  focus: (root) => `${root} when focused`,
  'focus-within': (root) => `${root} when focus is set within`,
  hocus: (root) => `${root} when both focused and hovered`,
}

const props = Object.keys(propsRE)

async function getIcons() {
  const icons = await globby('*.svg', {
    cwd: path.join(__dirname, './icons'),
  })
  const iconsObject = await Promise.all(
    icons.map(async (icon) => {
      const iconName = icon.replace(/.svg$/, '')
      const [kebabCaseName, size] = iconName.split('_x')
      const svgContent = await fs.readFile(
        path.join(__dirname, './icons', icon),
        'utf8'
      )
      const iconMeta = {
        interfaceName: `Icon${camelCase(kebabCaseName, {
          pascalCase: true,
        })}Props`,
        kebabCaseName,
        size,
        ...props.reduce((acc, prop) => {
          acc[prop] = propsRE[prop].test(svgContent)
          return acc
        }, {}),
      }
      return iconMeta
    })
  )
  const iconsObjectSet = new Set()
  const iconsObjectUnique = iconsObject.reduce((acc, curr) => {
    if (!iconsObjectSet.has(curr.interfaceName)) {
      iconsObjectSet.add(curr.interfaceName)
      const iconMeta = {
        ...curr,
        availableSizes: [curr.size],
      }
      props.forEach((property) => {
        if (curr[property]) {
          iconMeta[property] = [curr.size]
        }
      })
      acc.push(iconMeta)
    } else {
      const index = acc.findIndex(
        (item) => item.interfaceName === curr.interfaceName
      )
      acc[index].availableSizes.push(curr.size)
      props.forEach((property) => {
        if (curr[property]) {
          if (acc[index][property]) {
            acc[index][property].push(curr.size)
          } else {
            acc[index][property] = [curr.size]
          }
        }
      })
    }
    return acc
  }, [])

  iconsObjectUnique.forEach((icon) => {
    icon.availableSizes = icon.availableSizes.sort((a, b) =>
      parseInt(a) > parseInt(b) ? 1 : -1
    )
  })

  await ensureDistExist()
  await generateIndex(iconsObjectUnique, iconsObject)
}

async function ensureDistExist() {
  try {
    await fs.mkdir('./dist/')
  } catch (err) {
    if (err && err.code != 'EEXIST') {
      throw err
    }
  }
}

async function generateIndex(iconsObjectUnique) {
  const indexFileContent = iconsObjectUnique
    .map((icon) => {
      // prettier-ignore
      return dedent`
      '${icon.kebabCaseName}': {
          availableSizes: ['${icon.availableSizes.join('\',\'')}'], ${ColorRoots.map((colorRoot) => `
          has${colorRoot}: ${JSON.stringify(icon[`has${colorRoot}`])}`).join(',')}
      }`;
    })
    .join(',\n')

  const typesFileContent = iconsObjectUnique
    .map((icon) => {
      // check if the current icon has the same color for each size
      // compare the stringified version of sizes per property
      const isUnique =
        icon.availableSizes.length === 1 ||
        props.reduce(
          ({ prevValue, isUnique }, prop) => {
            if (!icon[prop]) {
              return { prevValue, isUnique }
            }
            const curValue = JSON.stringify(icon[prop])
            if (isUnique && prevValue && curValue && prevValue !== curValue) {
              isUnique = false
            }
            return { prevValue: curValue, isUnique }
          },
          { prevValue: undefined, isUnique: true }
        ).isUnique
      // if yes it is very easy to generate the type definition
      if (isUnique) {
        // prettier-ignore
        return dedent`
        export interface ${icon.interfaceName} 
            extends ${['RootIconProps', ...ColorRoots.map(root => 
              icon[`has${root}`] 
                ? `Has${camelCase(`${root}`, { pascalCase: true })}` 
                : false
            ).filter(Boolean)].join(', ')} {
            name: '${icon.kebabCaseName}';
            size?: '${icon.availableSizes.join('\' | \'')}';
        }`;
      } else {
        // if not, we need to generate the type definition for each size

        const sizeInterfaces = icon.availableSizes.map((size) => {
          // prettier-ignore
          return `
          export interface ${icon.interfaceName}X${size} 
              extends ${['RootIconProps', ...ColorRoots.map(root => 
                icon[`has${root}`] && (icon[`has${root}`].indexOf(size) > -1) 
                  ? `Has${camelCase(`${root}`, { pascalCase: true })}` 
                  : false
              ).filter(Boolean)].join(', ')} {
              name: '${icon.kebabCaseName}';
              size?: '${size}';
          }`
        })

        // prettier-ignore
        return dedent`
          ${sizeInterfaces.join('\n\n')}

          export type ${icon.interfaceName} = ${icon.availableSizes.map(size => `${icon.interfaceName}X${size}`).join(' | ')};
        `
      }
    })
    .join('\n\n')

  await fs.writeFile(
    './src/icons.ts',
    dedent`
  // THIS FILE IS AUTO GENERATED BY build-icons.mjs

  /**
   * All possible prop names for icon colors
   */
  export const ICON_COLOR_PROP_NAMES = ${JSON.stringify(
    Object.keys(ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR)
  )} as const

  /**
   * All possible values for icon colors
   */
  export type WindiColor = 'current' | 'transparent' | 'white' | 'black' | '${Object.entries(
    cyColors
  )
    .reduce((acc, [color, colorObject]) => {
      if (typeof colorObject !== 'object') {
        return acc
      }
      const completeColors = Object.keys(colorObject).map((key) => {
        return `${color}${key !== 'DEFAULT' ? `-${key}` : ''}`
      })
      return [].concat(acc, completeColors)
    }, [])
    .join(`' | '`)}';
  
  export interface OpenIconProps extends RootIconProps, ColorIconProps {}

  export interface ColorIconProps
    extends ${ColorRoots.map(
      (root) => `Has${camelCase(`${root}`, { pascalCase: true })}`
    ).join(', ')} {}

  interface RootIconProps {
    /**
     * Identifier for the icon
     */
    name: string;
    /**
     * Size of the icons canvas (in px)
     */
    size?: string;
    /**
     * Should the interactive variants \`hover\` and \`focus\` 
     * be applied on the icon itself or on the parent 
     * group defined in windiCSS
     */
    interactiveColorsOnGroup?: boolean;
    
    ['interactive-colors-on-group']?: boolean
  }
  
  ${ColorRoots.map(
    (root) =>
      dedent`
        interface Has${camelCase(`${root}`, {
          pascalCase: true,
        })} {${COLOR_PREFIXES.map(
        (prefix) => `  
            /**
             * ${
               prefix
                 ? prefixDescriptions[prefix]?.(propDescriptions[root])
                 : propDescriptions[root]
             }
             */
            ${camelCase(`${prefix}${root}`)}?: WindiColor;`
      )
        .filter(Boolean)
        .join('')}
        }`
  ).join('\n\n')}
    
  export type IconProps = ${iconsObjectUnique
    .map((icon) => icon.interfaceName)
    .join(' | ')}

  ${typesFileContent}

  export var iconsMetadata = {
    ${indexFileContent}
  } as const;

    `
  )
}

getIcons().then(() => {
  // eslint-disable-next-line no-console
  console.log('Icons generated')
  process.exit(0)
})

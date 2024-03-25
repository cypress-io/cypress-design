// @ts-check

/**
 * Generate icons.js and icons.d.ts
 * Also creates barrel files index.js and index.d.ts
 * Needs to be run last since it will override the dummy `icons` files generated by tsc
 */

import { fileURLToPath } from 'url'
import * as path from 'path'
import { optimize, loadConfig } from 'svgo'
import {
  cyColors,
  COLOR_PREFIXES,
  ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR_ROOT,
} from '@cypress-design/css/dist/color-constants'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import { globby } from 'globby'
import { promises as fs } from 'fs'
import { camelCase, kebabCase, upperFirst } from 'lodash-es'
import dedent from 'dedent'

function pascalCase(str) {
  return upperFirst(camelCase(str))
}

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

export default async function getIcons() {
  const config = await loadConfig()

  const cwd = path.join(__dirname, 'icons-static')

  const icons = await globby('*.svg', {
    cwd,
  })
  const iconsObject = await Promise.all(
    icons.map(async (icon) => {
      const iconName = icon.replace(/.svg$/, '')
      const [kebabCaseName, size] = iconName.split('_x')
      const svgContent = optimize(
        await fs.readFile(path.join(cwd, icon), 'utf8'),
        config ?? undefined,
      ).data

      const iconMetaWithSize = {
        interfaceName: `Icon${pascalCase(kebabCaseName)}Props`,
        kebabCaseName,
        size,
        defsIndex: svgContent.indexOf('<defs>'),
        ...props.reduce((acc, prop) => {
          acc[prop] = propsRE[prop].test(svgContent)
          return acc
        }, {}),
        body: svgContent,
      }
      return iconMetaWithSize
    }),
  )
  const iconsObjectSet = new Set()
  const iconsObjectUnique = iconsObject.reduce(
    /**
     * @param {{
     *  availableSizes: string[],
     *  defs: Record<string, number>
     *  interfaceName: string,
     *  kebabCaseName: string,
     * }[]} acc
     */
    (acc, curr) => {
      let iconMeta
      if (!iconsObjectSet.has(curr.interfaceName)) {
        iconsObjectSet.add(curr.interfaceName)
        iconMeta = {
          ...curr,
          availableSizes: [curr.size],
          defs: {},
        }
        props.forEach((property) => {
          if (curr[property]) {
            iconMeta[property] = [curr.size]
          }
        })
        acc.push(iconMeta)
      } else {
        const index = acc.findIndex(
          (item) => item.interfaceName === curr.interfaceName,
        )
        iconMeta = acc[index]
        iconMeta.availableSizes.push(curr.size)
        props.forEach((property) => {
          if (curr[property]) {
            if (iconMeta[property]) {
              iconMeta[property].push(curr.size)
            } else {
              iconMeta[property] = [curr.size]
            }
          }
        })
      }

      if (curr.defsIndex !== -1) {
        iconMeta.defs[curr.size] = curr.defsIndex
      }
      return acc
    },
    [],
  )

  iconsObjectUnique.forEach((icon) => {
    icon.availableSizes = icon.availableSizes.sort((a, b) =>
      parseInt(a) > parseInt(b) ? 1 : -1,
    )
  })

  return await generateIndex(iconsObjectUnique, iconsObject)
}

/**
 * generate the actual file
 * @param { {
 *  availableSizes: string[];
 *  defs: Record<string, number>;
 *  interfaceName: string;
 *  kebabCaseName: string;
 * }[]} iconsObjectUnique
 * @param {{
 *  kebabCaseName: string,
 *  body: string
 *  size: string
 * }[]} iconsObject
 */
async function generateIndex(iconsObjectUnique, iconsObject) {
  const indexBodyExport = iconsObject.map((icon) => {
    return `export const cy${pascalCase(icon.kebabCaseName)}X${icon.size} = {
      name: '${camelCase(icon.kebabCaseName)}X${icon.size}',
      data: \`${icon.body}\`,
    } as const`
  })

  const indexBodyArray = iconsObject.map((icon) => {
    return `cy${pascalCase(icon.kebabCaseName)}X${icon.size},`
  })

  const indexFileContent = iconsObjectUnique
    .map((icon) => {
      // prettier-ignore
      return dedent`
     '${icon.kebabCaseName}': {
         availableSizes: ['${icon.availableSizes.join("','")}'], ${ColorRoots.map((colorRoot) => `
         has${colorRoot}: ${JSON.stringify(icon[`has${colorRoot}`])}`).join(',')}${icon.defs ? `,
         defs: ${JSON.stringify(icon.defs)}`: ''}
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
          /**
           *
           * @param {{
           *  prevValue:string | undefined,
           *  isUnique:boolean
           * }} acc
           * @param {string} prop
           * @returns
           */

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
          { prevValue: undefined, isUnique: true },
        ).isUnique
      // if yes it is very easy to generate the type definition
      if (isUnique) {
        // prettier-ignore
        return dedent`
       export interface ${icon.interfaceName}
           extends ${['RootIconProps', ...ColorRoots.map(root =>
             icon[`has${root}`]
               ? `Has${pascalCase(`${root}`)}`
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
                 ? `Has${pascalCase(`${root}`)}`
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

  const ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR = COLOR_PREFIXES.reduce(
    /**
     * @param {string[]} acc
     * @param {string} prefix
     * @returns
     */
    (acc, prefix) => {
      acc.push(
        ...Object.keys(ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR_ROOT).reduce(
          /**
           * @param {string[]} acc2
           * @param {string} root
           * @returns
           */
          (acc2, root) => {
            return [
              ...acc2,
              camelCase(`${prefix}${root}`),
              kebabCase(`${prefix}${root}`),
            ]
          },
          [],
        ),
      )
      return acc
    },
    [],
  )

  return dedent`
 // THIS FILE IS AUTO GENERATED BY build-icons.mjs

 /**
  * All possible prop names for icon colors
  */
 export const ICON_COLOR_PROP_NAMES = ${JSON.stringify(
   ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR,
 )} as const

 /**
  * All possible values for icon colors
  */
 export type WindiColor = 'current' | 'transparent' | 'white' | 'black' | '${Object.entries(
   cyColors,
 )
   .reduce(
     /**
      * @param {string[]} acc
      */
     (acc, [color, colorObject]) => {
       if (typeof colorObject !== 'object') {
         return acc
       }
       const completeColors = Object.keys(colorObject).map((key) => {
         return `${color}${key !== 'DEFAULT' ? `-${key}` : ''}`
       })
       return acc.concat(completeColors)
     },
     [],
   )
   .join(`' | '`)}';

 export interface OpenIconProps extends RootIconProps, ColorIconProps {}

 export interface ColorIconProps
   extends ${ColorRoots.map((root) => `Has${pascalCase(`${root}`)}`).join(
     ', ',
   )} {}

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
    * alt text for the icon
    */
   alt?: string;
   /**
    * Should the interactive variants \`hover\` and \`focus\` be applied on the icon itself or on the parent group
    */
   interactiveColorsOnGroup?: boolean;
   ['interactive-colors-on-group']?: boolean
 }

 ${ColorRoots.map(
   (root) =>
     dedent`
       export interface Has${pascalCase(`${root}`)} {${COLOR_PREFIXES.map(
         (prefix) => `
           /**
            * ${
              prefix
                ? prefixDescriptions[prefix]?.(propDescriptions[root])
                : propDescriptions[root]
            }
            */
           ${camelCase(`${prefix}${root}`)}?: WindiColor;`,
       )
         .filter(Boolean)
         .join('')}
       }`,
 ).join('\n\n')}

 export type IconProps = ${iconsObjectUnique
   .map((icon) => icon.interfaceName)
   .join(' | ')}

 ${typesFileContent}

 export const iconsMetadata = {
   ${indexFileContent}
 } as const;

 ${indexBodyExport.join('\n')}

 export const iconSet = [${indexBodyArray.join('\n')}]
`
}

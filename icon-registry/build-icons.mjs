/**
 * Generate icons.js and icons.d.ts
 * Also creates barrel files index.js and index.d.ts
 * Needs to be run last since it will override the dummy `icons` files generated by tsc
 */

import { fileURLToPath } from 'url';
import * as path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { globby } from 'globby';
import { promises as fs } from 'fs';
import camelCase from 'camelcase';
import dedent from 'dedent';
import { cyColors } from '@cypress-design/css';

const propsRE = {
  hasStrokeColor: /icon-dark/,
  hasFillColor: /icon-light/,
  hasSecondaryStrokeColor: /icon-dark-secondary/,
  hasSecondaryFillColor: /icon-light-secondary/,
};

const props = Object.keys(propsRE);

async function getIcons() {
  const icons = await globby('*.svg', {
    cwd: path.join(__dirname, './icons'),
  });
  const iconsObject = await Promise.all(
    icons.map(async (icon) => {
      const iconName = icon.replace(/.svg$/, '');
      const [snakeCaseName, size] = iconName.split('_x');
      const svgContent = await fs.readFile(
        path.join(__dirname, './icons', icon),
        'utf8'
      );
      const iconMeta = {
        interfaceName: `Icon${camelCase(snakeCaseName, {
          pascalCase: true,
        })}Props`,
        snakeCaseName,
        size,
        ...props.reduce((acc, prop) => {
          acc[prop] = propsRE[prop].test(svgContent);
          return acc;
        }, {}),
      };
      return iconMeta;
    })
  );
  const iconsObjectSet = new Set();
  const iconsObjectUnique = iconsObject.reduce((acc, curr) => {
    if (!iconsObjectSet.has(curr.interfaceName)) {
      iconsObjectSet.add(curr.interfaceName);
      const iconMeta = {
        ...curr,
        availableSizes: [curr.size],
      };
      props.forEach((property) => {
        if (curr[property]) {
          iconMeta[property] = [curr.size];
        }
      });
      acc.push(iconMeta);
    } else {
      const index = acc.findIndex(
        (item) => item.interfaceName === curr.interfaceName
      );
      acc[index].availableSizes.push(curr.size);
      props.forEach((property) => {
        if (curr[property]) {
          if (acc[index][property]) {
            acc[index][property].push(curr.size);
          } else {
            acc[index][property] = [curr.size];
          }
        }
      });
    }
    return acc;
  }, []);

  iconsObjectUnique.forEach((icon) => {
    icon.availableSizes = icon.availableSizes.sort((a, b) =>
      parseInt(a) > parseInt(b) ? 1 : -1
    );
  });

  await ensureDistExist();
  await generateIndex(iconsObjectUnique, iconsObject);
}

async function ensureDistExist() {
  try {
    await fs.mkdir('./dist/');
  } catch (err) {
    if (err && err.code != 'EEXIST') {
      throw err;
    }
  }
}

async function generateIndex(iconsObjectUnique) {
  const indexFileContent = iconsObjectUnique
    .map((icon) => {
      // prettier-ignore
      return dedent`
      '${icon.snakeCaseName}': {
          availableSizes: ['${icon.availableSizes.join('\', \'')}'],
          hasFillColor: ${JSON.stringify(icon.hasFillColor)},
          hasStrokeColor: ${JSON.stringify(icon.hasStrokeColor)},
          hasSecondaryFillColor: ${JSON.stringify(icon.hasSecondaryFillColor)},
          hasSecondaryStrokeColor: ${JSON.stringify(icon.hasSecondaryStrokeColor)},
      }`;
    })
    .join(',\n');

  const typesFileContent = iconsObjectUnique
    .map((icon) => {
      // check if the current icon has the same color for each size
      // compare the stringified version of sizes per property
      const isUnique =
        icon.availableSizes.length === 1 ||
        props.reduce(
          ({ prevValue, isUnique }, prop) => {
            if (!icon[prop]) {
              return { prevValue, isUnique };
            }
            const curValue = JSON.stringify(icon[prop]);
            if (isUnique && prevValue && curValue && prevValue !== curValue) {
              isUnique = false;
            }
            return { prevValue: curValue, isUnique };
          },
          { prevValue: undefined, isUnique: true }
        ).isUnique;
      // if yes it is very easy to generate the type definition
      if (isUnique) {
        // prettier-ignore
        return dedent`
        export interface ${icon.interfaceName} {
            name: '${icon.snakeCaseName}';
            size?: '${icon.availableSizes.join('\' | \'')}';${icon.hasStrokeColor ? `
            strokeColor?: WindiColor;`: ''}${icon.hasFillColor ? `
            fillColor?: WindiColor;` : ''}${icon.hasSecondaryStrokeColor ? `
            secondaryStrokeColor?: WindiColor;` : ''}${icon.hasSecondaryFillColor ? `
            secondaryFillColor?: WindiColor;` : ''}
        }`;
      } else {
        // if not, we need to generate the type definition for each size

        const sizeInterfaces = icon.availableSizes.map((size) => {
          // prettier-ignore
          return `
          export interface ${icon.interfaceName}X${size} {
              name: '${icon.snakeCaseName}';
              size?: '${size}';${(icon.hasStrokeColor && icon.hasStrokeColor?.indexOf(size) > -1) ? `
              strokeColor?: WindiColor;`: ''}${(icon.hasFillColor && icon.hasFillColor?.indexOf(size) > -1) ? `
              fillColor?: WindiColor;` : ''}${(icon.hasSecondaryStrokeColor && icon.hasSecondaryStrokeColor?.indexOf(size) > -1) ? `
              secondaryStrokeColor?: WindiColor;` : ''}${(icon.hasSecondaryFillColor && icon.hasSecondaryFillColor?.indexOf(size) > -1) ? `
              secondaryFillColor?: WindiColor;` : ''}
          }`
        });

        // prettier-ignore
        return dedent`
          ${sizeInterfaces.join('\n\n')}

          export type ${icon.interfaceName} = ${icon.availableSizes.map(size => `${icon.interfaceName}X${size}`).join(' | ')};
        `
      }
    })
    .join('\n\n');

  await fs.writeFile(
    './src/icons.ts',
    dedent`
  // THIS FILE IS AUTO GENERATED BY build-icons.mjs

  export var iconsMetadata = {
    ${indexFileContent}
  } as const;
  type WindiColor = '${Object.entries(cyColors)
    .reduce((acc, [color, colorObject]) => {
      if (typeof colorObject !== 'object') {
        return acc;
      }
      const completeColors = Object.keys(colorObject).map((key) => {
        return `${color}${key !== 'DEFAULT' ? `-${key}` : ''}`;
      });
      return [].concat(acc, completeColors);
    }, [])
    .join(`' | '`)}';
    
  export type IconProps = ${iconsObjectUnique
    .map((icon) => icon.interfaceName)
    .join(' | ')}

  ${typesFileContent}
    `
  );
}

getIcons();

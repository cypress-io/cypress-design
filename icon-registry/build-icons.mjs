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
import { colors } from '@cypress-design/css';

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
      svgContent;
      return {
        interfaceName: `I${camelCase(snakeCaseName, { pascalCase: true })}`,
        snakeCaseName,
        size,
        hasDarkColor: /icon-dark/.test(svgContent),
        hasLightColor: /icon-light/.test(svgContent),
        hasSecondaryLightColor: /icon-light-secondary/.test(svgContent),
        hasSecondaryDarkColor: /icon-dark-secondary/.test(svgContent),
      };
    })
  );
  const iconsObjectSet = new Set();
  const iconsObjectUnique = iconsObject.reduce((acc, curr) => {
    if (!iconsObjectSet.has(curr.interfaceName)) {
      iconsObjectSet.add(curr.interfaceName);
      acc.push({ ...curr, availableSizes: [curr.size] });
    } else {
      const index = acc.findIndex(
        (item) => item.interfaceName === curr.interfaceName
      );
      acc[index].availableSizes.push(curr.size);
      acc[index].hasDarkColor |= curr.hasDarkColor;
      acc[index].hasLightColor |= curr.hasLightColor;
    }
    return acc;
  }, []);
  await ensureDistExist();
  await generateType(iconsObjectUnique);
  await generateIndex(iconsObjectUnique);
  await fs.writeFile(
    './dist/index.d.ts',
    dedent`
    export * from './icons';
    export * from './compileIcon';
    export * from './iconsList';
  `
  );
  await fs.writeFile(
    './dist/index.js',
    dedent`
    export * from './icons';
    export * from './compileIcon';
    export * from './iconsList';
  `
  );
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
      const {
        snakeCaseName,
        availableSizes,
        hasLightColor,
        hasDarkColor,
        hasSecondaryLightColor,
        hasSecondaryDarkColor,
      } = icon;
      // prettier-ignore
      return dedent`'${snakeCaseName}': {
          availableSizes: ['${availableSizes.join('\', \'')}'],
          hasLightColor: ${Boolean(hasLightColor)},
          hasDarkColor: ${Boolean(hasDarkColor)},
          hasSecondaryLightColor: ${Boolean(hasSecondaryLightColor)},
          hasSecondaryDarkColor: ${Boolean(hasSecondaryDarkColor)},
      }`;
    })
    .join(',\n');

  await fs.writeFile(
    './dist/icons.js',
    dedent`
  // THIS FILE IS AUTO GENERATED BY build.mjs
  // it will be used to determine size if no size is provided

  export const icons = {${indexFileContent}};
    `
  );
}

async function generateType(iconsObjectUnique) {
  const typesFileContent = iconsObjectUnique
    .map((icon) => {
      // prettier-ignore
      return dedent`export interface ${icon.interfaceName} {
          iconId: '${icon.snakeCaseName}';
          size?: '${icon.availableSizes.join('\' | \'')}';${icon.hasDarkColor ? `
          darkColor?: WindiColor;`: ''}${icon.hasLightColor ? `
          lightColor?: WindiColor;` : ''}${icon.hasSecondaryDarkColor ? `
          secondaryDarkColor?: WindiColor;` : ''}${icon.hasSecondaryLightColor ? `
          secondaryLightColor?: WindiColor;` : ''}
      }`;
    })
    .join('\n\n');

  await fs.writeFile(
    './dist/icons.d.ts',
    dedent`
  // THIS FILE IS AUTO GENERATED BY build.mjs

  export declare const icons: Record<string, {
    pascalCaseName: string;
    iconId: Icon['iconId'];
    size: string[];
    darkColor: boolean;
    lightColor: boolean;
  }>;

  type WindiColor = '${Object.keys(colors)
    .reduce((acc, color) => {
      if (typeof colors[color] !== 'object') {
        return acc;
      }
      const completeColors = Object.keys(colors[color]).map((key) => {
        return `${color}${key !== 'DEFAULT' ? `-${key}` : ''}`;
      });
      return [].concat(acc, completeColors);
    }, [])
    .join(`' | '`)}';
    
  export type Icon = ${iconsObjectUnique
    .map((icon) => icon.interfaceName)
    .join(' | ')}

  ${typesFileContent}
    `
  );
}

getIcons();

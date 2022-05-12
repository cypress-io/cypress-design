/**
 * WindiCSS will strip out any styles that aren't used.
 * We do a lot of dynamic stuff, and we're not too concerned
 * with bundle size, so this is a pretty greedy list
 */
import { colors } from './colors';
import { map, reduce, kebabCase } from 'lodash';

const textSafelist = ['xs', 'sm', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl']
  .map((v) => `text-${v}`)
  .join(' ');
const colorSafelist = reduce(
  { ...colors, transparent: { ONLY: true }, current: { ONLY: true } },
  (acc, variants, colorName) => {
    const name = kebabCase(colorName);

    return `${acc}
    ${map(variants, (_: string, k: string) => {
      if (k === 'DEFAULT') return ``;
      const variantName = k === 'ONLY' ? name : `${name}-${k}`;
      return `
    icon-light-${variantName}
    icon-dark-${variantName}
    icon-light-secondary-${variantName}
    icon-dark-secondary-${variantName}
    bg-${variantName}
    text-${variantName}
    before:bg-${variantName}
    before:text-${variantName}`;
    }).join(' ')}`;
  },
  ' bg-white bg-black text-white text-black'
);

export const safelist = `${textSafelist} ${colorSafelist}`;

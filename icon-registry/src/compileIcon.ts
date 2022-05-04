import { type Icon, icons } from './icons';
import { iconSet } from './iconsList';
import camelCase from 'camelcase';

export const compileIcon = ({
  iconId,
  size,
  darkColor,
  lightColor,
  secondaryDarkColor,
  secondaryLightColor,
}: Icon) => {
  const { availableSizes } = icons[iconId];
  const sizeWithDefault =
    size ?? (availableSizes.length >= 1 ? availableSizes[0] : '');
  const iconIdWithSize = camelCase(`${iconId}_x${sizeWithDefault}`);
  const compiledClasses = [
    darkColor && `icon-dark-${darkColor}`,
    lightColor && `icon-light-${lightColor}`,
    secondaryDarkColor && `icon-dark-secondary-${secondaryDarkColor}`,
    secondaryLightColor && `icon-light-secondary-${secondaryLightColor}`,
  ].filter((a) => a);
  const iconData = iconSet.find((i) => i.name === iconIdWithSize);
  if (!iconData) {
    throw new Error(`icon '${iconId}' at size ${sizeWithDefault} not found`);
  }
  return {
    size: sizeWithDefault,
    compiledClasses,
    iconData,
  };
};

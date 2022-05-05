import { type Icon, icons } from './icons';
import { iconSet } from './iconsList';
import camelCase from 'camelcase';

export const compileIcon = (props: Icon) => {
  const { iconId } = props;
  const { availableSizes } = icons[iconId];

  const { sizeWithDefault, compiledClasses } = getComponentAttributes({
    ...(props as any),
    availableSizes,
  });

  const iconIdWithSize = camelCase(`${iconId}_x${sizeWithDefault}`);
  const iconData = iconSet.find((i) => i.name === iconIdWithSize);
  if (!iconData) {
    throw new Error(`icon '${iconId}' at size ${sizeWithDefault} not found`);
  }
  return {
    size: sizeWithDefault,
    compiledClasses,
    body: iconData.data,
  };
};

export const getComponentAttributes = ({
  size,
  availableSizes,
  darkColor,
  lightColor,
  secondaryDarkColor,
  secondaryLightColor,
}: {
  size: string;
  availableSizes: readonly string[];
  darkColor?: string;
  lightColor?: string;
  secondaryDarkColor?: string;
  secondaryLightColor?: string;
}) => {
  const sizeWithDefault =
    size ?? (availableSizes.length >= 1 ? availableSizes[0] : '');

  const compiledClasses = [
    darkColor && `icon-dark-${darkColor}`,
    lightColor && `icon-light-${lightColor}`,
    secondaryDarkColor && `icon-dark-secondary-${secondaryDarkColor}`,
    secondaryLightColor && `icon-light-secondary-${secondaryLightColor}`,
  ].filter((a) => a);

  return { compiledClasses, sizeWithDefault };
};

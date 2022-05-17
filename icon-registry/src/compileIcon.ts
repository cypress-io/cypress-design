import { type IconProps, iconsMetadata } from './icons';
import { iconSet } from './iconsList';
import camelCase from 'camelcase';

export const compileIcon = (props: IconProps) => {
  const { name } = props;
  const { availableSizes } = iconsMetadata[name];

  const { sizeWithDefault, compiledClasses } = getComponentAttributes({
    ...(props as any),
    availableSizes,
  });

  const nameWithSize = camelCase(`${name}_x${sizeWithDefault}`);
  const iconData = iconSet.find((i) => i.name === nameWithSize);
  if (!iconData) {
    throw new Error(`icon '${name}' at size ${sizeWithDefault} not found`);
  }
  return {
    ...(props as any),
    size: sizeWithDefault,
    compiledClasses,
    body: iconData.data,
  };
};

export const getComponentAttributes = ({
  size,
  availableSizes,
  strokeColor,
  fillColor,
  secondaryStrokeColor,
  secondaryFillColor,
}: {
  size: string;
  availableSizes: readonly string[];
  strokeColor?: string;
  fillColor?: string;
  secondaryStrokeColor?: string;
  secondaryFillColor?: string;
}) => {
  const sizeWithDefault =
    size ??
    (availableSizes.length >= 1
      ? availableSizes.indexOf('16') > -1
        ? '16'
        : availableSizes[0]
      : '');

  // TODO: when all icons are converted to using the design system,
  // replace dark by stroke and light by fill,
  // both here and in the windi plugins configs.
  const compiledClasses = [
    strokeColor && `icon-dark-${strokeColor}`,
    fillColor && `icon-light-${fillColor}`,
    secondaryStrokeColor && `icon-dark-secondary-${secondaryStrokeColor}`,
    secondaryFillColor && `icon-light-secondary-${secondaryFillColor}`,
  ].filter(Boolean);

  return { compiledClasses, sizeWithDefault };
};

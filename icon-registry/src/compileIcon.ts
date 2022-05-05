import { type IconProps, icons } from './icons';
import { iconSet } from './iconsList';
import camelCase from 'camelcase';

export const compileIcon = (props: IconProps) => {
  const { name } = props;
  const { availableSizes } = icons[name];

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

  const compiledClasses = [
    strokeColor && `icon-stroke-${strokeColor}`,
    fillColor && `icon-fill-${fillColor}`,
    secondaryStrokeColor && `icon-stroke-secondary-${secondaryStrokeColor}`,
    secondaryFillColor && `icon-fill-secondary-${secondaryFillColor}`,
  ].filter((a) => a);

  return { compiledClasses, sizeWithDefault };
};

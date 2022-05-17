import { colors as designColors } from '@cypress-design/css/dist/colors';
import React, { FunctionComponent } from 'react';
import { contrastingTextColor } from './contrast';
import {
  filter,
  flatten,
  includes,
  pick,
  startCase,
  startsWith,
  values,
} from 'lodash';
import flat from 'flat';

const brandPalettes = {
  primary: ['teal', 'jade', 'gray'],
  secondary: ['purple', 'orange', 'red', 'indigo'],
  tertiary: ['fuchsia', 'green', 'magenta'],
  neutral: ['black', 'white'],
};

export const brandColorways = flatten(values(brandPalettes));

const namedColors = pick(designColors, brandColorways);

const colorsObject = flat(namedColors, {
  delimiter: '-',
});

type Color = {
  hex: string;
  name: string;
};

export const colors: Color[] = Object.keys(colorsObject).map((name) => {
  return {
    name,
    hex: colorsObject[name],
  };
});

const colorsForColorway = (colorway) => {
  return filter(colors, (color) => {
    return startsWith(color.name, colorway);
  });
};

interface ColorTileProps {
  color: Color;
}

export const ColorTile: FunctionComponent<ColorTileProps> = ({ color }) => {
  const textColor = contrastingTextColor(color.hex);
  return (
    <>
      <div className={`inline-block relative h-24 bg-${color.name}`}>
        <div className={`absolute top-0 inset-x-1 text-md text-${textColor}`}>
          {color.name.split('-')[0]}
          {includes(color.name, '-') ? '-' : ''}
          <br />
          {color.name.split('-')[1]}
        </div>
        <div
          className={`absolute bottom-0 inset-x-1 text-sm text-${textColor}`}
        >
          {color.hex}
        </div>
      </div>
    </>
  );
};

export const BrandColors: FunctionComponent = () => {
  return (
    <div className="w-full">
      {Object.keys(brandPalettes).map((paletteName) => (
        <div key={paletteName} className="mb-8">
          <h3 className="text-2xl flex items-end gap-2">
            {startCase(paletteName)}
            {paletteName === 'tertiary' && <p className="text-sm text-gray-500">(Use only for generated content)</p>}
          </h3>
          {brandPalettes[paletteName].map((colorway) => {
            return (
              <div className="grid grid-cols-11" key={colorway}>
                {colorsForColorway(colorway).map((color, i) => (
                  <ColorTile key={i} color={color} />
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

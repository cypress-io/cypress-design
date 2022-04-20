import { colors } from '@cypress-design/css/dist/colors';
import chroma from 'chroma-js';
import React, { FunctionComponent } from 'react';
import { find } from 'lodash';

// import "./contrast.scss"

const values = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '1000',
  'A1',
  'A2',
];

const colorways = [
  'gray',
  'red',
  'orange',
  'jade',
  'indigo',
  'purple',
  'teal',
  'fuchsia',
  'yellow',
  'green',
  'magenta',
];

const headerTextColor = (color: string) => {
  return chroma(color).luminance() > 0.5 ? 'black' : 'white';
};

type ColorsItem = {
  name: string;
  hex: string;
  ratio: number;
  largeContrast: 'AAA' | 'AA' | 'Not legible';
  normalContrast: 'AAA' | 'AA' | 'Not legible';
  value: string;
  label: string;
};

type ColorwayProps = {
  colorway: string;
  /** background is the name of a color, e.g. $gray-1000 */
  background: string;
  colors: ColorsItem[];
  standard: 'AAA' | 'AA';
};

const SmallTextColorway: FunctionComponent<ColorwayProps> = ({
  colorway,
  background,
  colors,
  standard,
}) => {
  return (
    <>
      <div style={{ color: headerTextColor(background) }}>{colorway}:</div>

      {values.map((value) => {
        const colorName = `$${colorway}-${value}`;
        const color = find(colors, ['name', colorName]);

        if (!color || color.normalContrast !== standard) {
          return <div />;
        }

        return (
          <div style={{ color: color.hex }} key={value}>
            {color.name}
          </div>
        );
      })}
    </>
  );
};

const LargeTextColorway: FunctionComponent<ColorwayProps> = ({
  colorway,
  background,
  colors,
  standard,
}) => {
  return (
    <>
      <div className="large" style={{ color: headerTextColor(background) }}>
        {colorway}:
      </div>
      <div />

      {values.map((value) => {
        const colorName = `$${colorway}-${value}`;
        const color = find(colors, ['name', colorName]);

        if (!color || color.largeContrast !== standard) {
          return (
            <>
              <div />
              <div />
            </>
          );
        }

        return (
          <>
            <div className="large" style={{ color: color.hex }}>
              {color.name}
            </div>
            <div className="bold" style={{ color: color.hex }}>
              {color.name}
            </div>
          </>
        );
      })}
    </>
  );
};

type TextTableProps = {
  size: 'large' | 'small';
  /** background is the name of a color, e.g. $gray-1000 */
  background: string;
  colors: ColorsItem[];
  standard: 'AAA' | 'AA';
};

const TextTable: FunctionComponent<TextTableProps> = ({
  size = 'small',
  background,
  colors,
  standard = 'AAA',
}) => {
  return (
    <div
      className={`text-table ${size}-text-table`}
      style={{ backgroundColor: background }}
    >
      {colorways.map((colorway) => {
        return (
          <div
            className="color"
            style={{ borderColor: headerTextColor(background) }}
            key={size + standard + colorway}
          >
            {size === 'small' ? (
              <SmallTextColorway
                colorway={colorway}
                background={background}
                colors={colors}
                standard={standard}
              />
            ) : (
              <LargeTextColorway
                colorway={colorway}
                background={background}
                colors={colors}
                standard={standard}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

type ContrastProps = {
  /** background is the name of a color, e.g. $gray-1000 */
  background: string;
};

export const Contrast: FunctionComponent<ContrastProps> = ({ background }) => {
  const backgroundHex = colors[background];

  const keys = Object.keys(colors);
  const colorsList: ColorsItem[] = keys.map((k) => {
    const hex = colors[k];
    const ratio = chroma.contrast(hex, backgroundHex);
    const largeContrast =
      ratio >= 4.5 ? 'AAA' : ratio >= 3 ? 'AA' : 'Not legible';
    const normalContrast =
      ratio >= 7.1 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Not legible';

    return {
      name: k,
      hex,
      ratio,
      largeContrast,
      normalContrast,
      value: k,
      label: k,
    };
  });

  return (
    <>
      <h2>AAA-compliant colors against {background}: Small text</h2>
      <TextTable
        standard="AAA"
        colors={colorsList}
        background={backgroundHex}
        size="small"
      />
      <h2>AA-compliant colors against {background}: Small text</h2>
      Note: all AAA colors above are also AA compliant.
      <TextTable
        standard="AA"
        colors={colorsList}
        background={backgroundHex}
        size="small"
      />
      <h2>AAA-compliant colors against {background}: Large text</h2>
      <p>
        Text is considered large if it is 18px and bold or larger, or 24px or
        larger. Those sizes and weights are displayed here.
      </p>
      <TextTable
        standard="AAA"
        colors={colorsList}
        background={backgroundHex}
        size="large"
      />
      <h2>AA-compliant colors against {background}: Large text</h2>
      <p>
        Text is considered large if it is 18px and bold or larger, or 24px or
        larger. Those sizes and weights are displayed here.
      </p>
      <p>Note: all AAA colors above are also AA compliant.</p>
      <TextTable
        standard="AA"
        colors={colorsList}
        background={backgroundHex}
        size="large"
      />
    </>
  );
};

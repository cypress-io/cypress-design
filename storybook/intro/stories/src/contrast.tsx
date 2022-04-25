import chroma from 'chroma-js';
import React, { FunctionComponent } from 'react';
import { filter, find, map, startsWith } from 'lodash';

export const contrastingTextColor = (color: string) => {
  const ratioToBlack = chroma.contrast(color, 'black');
  const ratioToWhite = chroma.contrast(color, 'white');

  return ratioToBlack > ratioToWhite ? 'black' : 'white';
};

export type ColorsItem = {
  name: string;
  hex: string;
  ratio: number;
  largeContrast: 'AAA' | 'AA' | 'Not legible';
  normalContrast: 'AAA' | 'AA' | 'Not legible';
  value?: string;
  label?: string;
};

type ColorwayProps = {
  colors: ColorsItem[];
  size: 'normal' | 'large';
};

const TextColorway: FunctionComponent<ColorwayProps> = ({ colors, size }) => {
  return (
    <>
      {colors.map((color) => {
        if (size === 'large') {
          return (
            <div style={{ color: color.hex }} key={color.name}>
              <span className="text-[24px]">
                {color[`${size}Contrast`]}: text-{color.name}
              </span>
            </div>
          );
        }

        return (
          <div style={{ color: color.hex }} key={color.name}>
            {color[`${size}Contrast`]}: text-{color.name}
          </div>
        );
      })}
    </>
  );
};

type CellProps = {
  size: 'large' | 'normal';
  /** background is a hex value */
  background: { value: string; label: string };
  colors: ColorsItem[];
  colorway: string;
};

const Cell: FunctionComponent<CellProps> = ({
  size = 'normal',
  background,
  colors,
  colorway,
}) => {
  const headerTextClass = size === 'normal' ? '' : 'text-2xl';

  // make a list of the compliant colors
  // AAA first, then AA
  const compliantColors: ColorsItem[] = [
    ...filter(colors, [`${size}Contrast`, 'AAA']),
    ...filter(colors, [`${size}Contrast`, 'AA']),
  ];

  return (
    <div
      className="border text-white p-4 grid-cols-1"
      style={{ borderColor: contrastingTextColor(background.value) }}
    >
      <div
        className={headerTextClass}
        style={{ color: contrastingTextColor(background.value) }}
      >
        {colorway}:
      </div>

      {compliantColors.length === 0 && (
        <div className={`text-${contrastingTextColor(background.value)} `}>
          No compliant values
        </div>
      )}

      {/* example text for large size */}
      {compliantColors.length > 0 && size === 'large' && (
        <div className={`text-${contrastingTextColor(background.value)} py-4`}>
          <span className="text-[24px]">24px+ or</span>
          <br />
          <span className="font-bold text-[18px]">18px+ &amp; bold</span>
        </div>
      )}

      <TextColorway colors={compliantColors} size={size} />
    </div>
  );
};

type ContrastProps = {
  background: { value: string; label: string };
  colors: { hex: string; name: string }[];
  colorways: string[];
};

export const Contrast: FunctionComponent<ContrastProps> = ({
  background,
  colors,
  colorways,
}) => {
  const colorAttributes: ColorsItem[] = map(colors, (color) => {
    const ratio = chroma.contrast(color.hex, background.value);
    const largeContrast =
      ratio >= 4.5 ? 'AAA' : ratio >= 3 ? 'AA' : 'Not legible';
    const normalContrast =
      ratio >= 7.1 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Not legible';

    return {
      name: color.name,
      hex: color.hex,
      ratio,
      largeContrast,
      normalContrast,
      value: color.hex,
      label: color.hex,
    };
  });

  return (
    <>
      <h2 className="py-4 text-2xl">
        Compliant colors against {background.label}: Small text
      </h2>
      <div
        className={`grid ${background.label}`}
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        }}
      >
        {colorways.map((colorway) => {
          const colors = filter(colorAttributes, (color) =>
            startsWith(color.name, colorway)
          );

          return (
            <Cell
              key={'normal' + colorway}
              colors={colors}
              colorway={colorway}
              background={background}
              size="normal"
            />
          );
        })}
      </div>
      <h2 className="py-4 text-2xl">
        Compliant colors against {background.label}: Large text
      </h2>
      <div
        className={`grid ${background.label}`}
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}
      >
        {colorways.map((colorway) => {
          const colors =
            colorway === 'black'
              ? [find(colorAttributes, ['name', 'black'])]
              : colorway === 'white'
              ? [find(colorAttributes, ['name', 'white'])]
              : filter(colorAttributes, (color) => {
                  return startsWith(color.name, colorway);
                });

          return (
            <Cell
              key={'large' + colorway}
              colors={colors}
              colorway={colorway}
              background={background}
              size="large"
            />
          );
        })}
      </div>
    </>
  );
};

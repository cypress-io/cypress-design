import chroma from 'chroma-js';
import React, { FunctionComponent } from 'react';
import { map, round } from 'lodash';
import { ColorsItem, contrastingTextColor } from './contrast';

type ContrastFullTableProps = {
  background: { value: string; label: string };
  colors: object;
};

export const ContrastFullTable: FunctionComponent<ContrastFullTableProps> = ({
  background,
  colors,
}) => {
  const headerTextColor = contrastingTextColor(background.value);

  const colorsList: ColorsItem[] = map(colors, (color) => {
    const ratio = chroma.contrast(color.hex, background.value);
    const largeContrast =
      ratio >= 4.5 ? 'AAA' : ratio >= 3 ? 'AA' : 'Not legible';
    const normalContrast =
      ratio >= 7.1 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Not legible';

    return {
      hex: color.hex,
      name: color.name,
      ratio,
      largeContrast,
      normalContrast,
    };
  });

  return (
    <details className="border rounded p-2 mt-8">
      <summary className="cursor-pointer list-item font-bold">
        Full table
      </summary>
      <h2 className="py-4 text-2xl">Background Color: {background.label}</h2>
      <table className="contrast-full-table">
        <thead>
          <tr>
            <th
              className="border px-2 py-1"
              style={{
                backgroundColor: background.value,
                color: headerTextColor,
              }}
            >
              Color
            </th>
            <th className="border px-2 py-1">Color</th>
            <th className="border px-2 py-1">Large Text</th>
            <th className="border px-2 py-1">Normal Text</th>
            <th className="border px-2 py-1">Ratio</th>
          </tr>
        </thead>
        <tbody>
          {colorsList.map((color, i) => (
            <tr className="header" key={i}>
              <th
                className="border px-2 py-1"
                style={{
                  backgroundColor: background.value,
                  color: color.hex,
                }}
              >
                {color.name}
              </th>
              <td className="border px-2 py-1">{color.name}</td>
              <td className="border px-2 py-1">{color.largeContrast}</td>
              <td className="border px-2 py-1">{color.normalContrast}</td>
              <td className="border px-2 py-1">{round(color.ratio, 2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
};

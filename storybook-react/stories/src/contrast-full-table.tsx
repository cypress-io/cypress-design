import { colors } from '@cypress-design/css';
import chroma from 'chroma-js';
import React, { FunctionComponent } from 'react';
import { round } from 'lodash';
import { Color } from './color';

// import "./contrast.scss"

type TableRowProps = {
  color: Color;
  backgroundHex: string;
  key: number;
};

type ContrastFullTableProps = {
  /** background is the name of a color, e.g. $gray-1000 */
  background: string;
};

export const TableRow: FunctionComponent<TableRowProps> = ({
  color,
  backgroundHex,
  key,
}) => {
  const ratio = chroma.contrast(color.hex, backgroundHex);
  const largeContrast =
    ratio >= 4.5 ? 'AAA' : ratio >= 3 ? 'AA' : 'Not legible';
  const normalContrast =
    ratio >= 7.1 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Not legible';

  // if (this.props.ratioLimit && ratio < this.props.ratioLimit) {
  //   return null
  // }

  return (
    <tr className="header" key={key}>
      <th
        style={{
          backgroundColor: backgroundHex,
          color: color.hex,
        }}
      >
        {`${color.name}`}
      </th>
      <td>{`${color.name}`}</td>
      <td>{largeContrast}</td>
      <td>{normalContrast}</td>
      <td>{round(ratio, 2)}</td>
    </tr>
  );
};

export const ContrastFullTable: FunctionComponent<ContrastFullTableProps> = ({
  background,
}) => {
  const backgroundHex = colors[background];

  const headerTextColor = (backgroundColor: string) =>
    chroma.hex(backgroundColor).luminance() > 0.5 ? 'black' : 'white';

  const keys = Object.keys(colors);
  const colorsList = keys.map((k) => ({
    name: k,
    hex: colors[k],
  }));

  return (
    <details>
      <summary>Full table</summary>
      <h2>Background Color: {background}</h2>
      <table className="contrast-full-table">
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: backgroundHex,
                color: headerTextColor(backgroundHex),
              }}
            >
              Color
            </th>
            <th>Color</th>
            <th>Large Text</th>
            <th>Normal Text</th>
            <th>Ratio</th>
          </tr>
        </thead>
        <tbody>
          {colorsList.map((color, i) => (
            <TableRow key={i} color={color} backgroundHex={backgroundHex} />
          ))}
        </tbody>
      </table>
    </details>
  );
};

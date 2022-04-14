import { palette } from '@frontend/design-system'
import chroma from 'chroma-js'
import React from 'react'
import { round } from 'lodash'

import './contrast.scss'
import { props } from 'bluebird'

class TableRow extends React.Component {
  render() {
    const color = this.props.color
    const ratio = chroma.contrast(color.hex, this.props.backgroundHex)
    const largeContrast =
      ratio >= 4.5 ? 'AAA' : ratio >= 3 ? 'AA' : 'Not legible'
    const normalContrast =
      ratio >= 7.1 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Not legible'

    if (this.props.ratioLimit && ratio < this.props.ratioLimit) {
      return null
    }

    return (
      <tr className="header" key={props.key}>
        <th
          style={{
            backgroundColor: this.props.backgroundHex,
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
    )
  }
}

export class ContrastFullTable extends React.Component {
  render() {
    const backgroundHex = palette[this.props.background]

    const headerTextColor = (backgroundColor) =>
      chroma.hex(backgroundColor).luminance() > 0.5 ? 'black' : 'white'

    const keys = Object.keys(palette).filter((k) => k.endsWith(0))
    const paletteList = keys.map((k) => ({
      name: k,
      hex: palette[k],
    }))

    return (
      <details>
        <summary>Full table</summary>
        <h2>Background Color: {this.props.background}</h2>
        <table className="contrast-full-table">
          <thead>
            <tr key={props.key}>
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
            {paletteList.map((color, i) => (
              <TableRow
                key={i}
                color={color}
                backgroundHex={backgroundHex}
                ratioLimit={this.props.ratioLimit}
              />
            ))}
          </tbody>
        </table>
      </details>
    )
  }
}

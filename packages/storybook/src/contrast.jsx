import { palette } from '@frontend/design-system'
import chroma from 'chroma-js'
import React from 'react'
import { find } from 'lodash'

import './contrast.scss'

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
]

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
]

const headerTextColor = (color) =>
  chroma(color).luminance() > 0.5 ? 'black' : 'white'

class SmallTextColorway extends React.Component {
  render() {
    return (
      <>
        <div style={{ color: headerTextColor(this.props.background) }}>
          {this.props.colorway}:
        </div>

        {values.map((value) => {
          const colorName = this.props.colorway + value
          const color = find(this.props.palette, ['name', colorName])

          if (!color || color.normalContrast !== this.props.standard) {
            return <div />
          }

          return (
            <div style={{ color: color.hex }} key={value.name}>
              {color.name}
            </div>
          )
        })}
      </>
    )
  }
}

class LargeTextColorway extends React.Component {
  render() {
    return (
      <>
        <div
          className="large"
          style={{ color: headerTextColor(this.props.background) }}
        >
          {this.props.colorway}:
        </div>
        <div />

        {values.map((value) => {
          const colorName = this.props.colorway + value
          const color = find(this.props.palette, ['name', colorName])

          if (!color || color.largeContrast !== this.props.standard) {
            return (
              <>
                <div />
                <div />
              </>
            )
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
          )
        })}
      </>
    )
  }
}

class TextTable extends React.Component {
  render() {
    return (
      <div
        className={`text-table ${this.props.size}-text-table`}
        style={{ backgroundColor: this.props.background }}
      >
        {colorways.map((colorway) => {
          return (
            <div
              className="color"
              style={{ borderColor: headerTextColor(this.props.background) }}
              key={this.props.size + this.props.standard + colorway}
            >
              {this.props.size === 'small' ? (
                <SmallTextColorway
                  colorway={colorway}
                  background={this.props.background}
                  palette={this.props.palette}
                  standard={this.props.standard}
                />
              ) : (
                <LargeTextColorway
                  colorway={colorway}
                  background={this.props.background}
                  palette={this.props.palette}
                  standard={this.props.standard}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }
}

export class Contrast extends React.Component {
  render() {
    const backgroundHex = palette[this.props.background]

    const keys = Object.keys(palette).filter(
      (k) => k.endsWith('0') || k.endsWith('1')
    )
    const paletteList = keys.map((k) => {
      const hex = palette[k]
      const ratio = chroma.contrast(hex, backgroundHex)
      const largeContrast =
        ratio >= 4.5 ? 'AAA' : ratio >= 3 ? 'AA' : 'Not legible'
      const normalContrast =
        ratio >= 7.1 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Not legible'

      return {
        name: k,
        hex,
        ratio,
        largeContrast,
        normalContrast,
        value: k,
        label: k,
      }
    })

    return (
      <>
        <h2>
          AAA-compliant colors against {this.props.background}: Small text
        </h2>
        <TextTable
          standard="AAA"
          palette={paletteList}
          background={backgroundHex}
          size="small"
        />
        <h2>AA-compliant colors against {this.props.background}: Small text</h2>
        Note: all AAA colors above are also AA compliant.
        <TextTable
          standard="AA"
          palette={paletteList}
          background={backgroundHex}
          size="small"
        />
        <h2>
          AAA-compliant colors against {this.props.background}: Large text
        </h2>
        <p>
          Text is considered large if it is 18px and bold or larger, or 24px or
          larger. Those sizes and weights are displayed here.
        </p>
        <TextTable
          standard="AAA"
          palette={paletteList}
          background={backgroundHex}
          size="large"
        />
        <h2>AA-compliant colors against {this.props.background}: Large text</h2>
        <p>
          Text is considered large if it is 18px and bold or larger, or 24px or
          larger. Those sizes and weights are displayed here.
        </p>
        <p>Note: all AAA colors above are also AA compliant.</p>
        <TextTable
          standard="AA"
          palette={paletteList}
          background={backgroundHex}
          size="large"
        />
      </>
    )
  }
}

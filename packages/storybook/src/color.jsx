import { palette } from '@frontend/design-system'
import chroma from 'chroma-js'
import PropTypes from 'prop-types'
import React from 'react'

export const paletteList = (color) => {
  const keys = Object.keys(palette).filter((k) => k.startsWith(color))
  return keys.map((k) => ({
    name: k.replace(color, ''),
    hex: palette[k],
  }))
}

class ColorTile extends React.Component {
  static propTypes = {
    hero: PropTypes.bool,
    color: PropTypes.object.isRequired,
  }

  style() {
    return {
      backgroundColor: this.props.color.hex,
      height: 64,
    }
  }

  render() {
    const textColor =
      chroma.hex(this.props.color.hex).luminance() > 0.5 ? 'black' : 'white'
    return (
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <div style={this.style()}></div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 4,
            color: textColor,
            fontSize: '1.5rem',
          }}
        >
          {this.props.color.name}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 4,
            color: textColor,
            fontSize: '1rem',
          }}
        >
          {this.props.color.hex}
        </div>
      </div>
    )
  }
}

class ColorPalette extends React.Component {
  style() {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${this.props.colors.length}, 1fr)`,
    }
  }

  render() {
    const colors = this.props.colors
    return (
      <div style={{ margin: '20px 0' }}>
        <h4>{this.props.name}</h4>
        <div style={this.style()}>
          {colors.map((color, i) => (
            <ColorTile key={i} hero={i === 0} color={color} />
          ))}
        </div>
      </div>
    )
  }
}

export class BrandColors extends React.Component {
  style() {
    return {
      width: '66vw',
      margin: '10px auto',
    }
  }

  render() {
    return (
      <div style={this.style()}>
        <h1>Primary</h1>
        <ColorPalette name="Teal" colors={paletteList('teal')} />
        <ColorPalette name="Jade" colors={paletteList('jade')} />
        <ColorPalette name="Gray" colors={paletteList('gray')} />
        <h1>Secondary</h1>
        <ColorPalette name="Purple" colors={paletteList('purple')} />
        <ColorPalette name="Orange" colors={paletteList('orange')} />
        <ColorPalette name="Red" colors={paletteList('red')} />
        <ColorPalette name="Indigo" colors={paletteList('indigo')} />
        <h1>Tertiary</h1>
        <ColorPalette name="Fuchsia" colors={paletteList('fuchsia')} />
        <ColorPalette name="Yellow" colors={paletteList('yellow')} />
        <ColorPalette name="Green" colors={paletteList('green')} />
        <ColorPalette name="Magenta" colors={paletteList('magenta')} />
      </div>
    )
  }
}

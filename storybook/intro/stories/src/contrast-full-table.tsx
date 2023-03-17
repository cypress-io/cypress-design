import chroma from 'chroma-js'
import React, { FunctionComponent } from 'react'
import { map, round } from 'lodash'
import { ColorsItem, contrastingTextColor } from './contrast'

type ContrastFullTableProps = {
  background: { value: string; label: string }
  colors: object
}

export const ContrastFullTable: FunctionComponent<ContrastFullTableProps> = ({
  background,
  colors,
}) => {
  const headerTextColor = contrastingTextColor(background.value)

  const colorsList: ColorsItem[] = map(colors, (color) => {
    const ratio = chroma.contrast(color.hex, background.value)
    const largeContrast =
      ratio >= 4.5 ? 'AAA' : ratio >= 3 ? 'AA' : 'Not legible'
    const normalContrast =
      ratio >= 7.1 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Not legible'

    return {
      hex: color.hex,
      name: color.name,
      ratio,
      largeContrast,
      normalContrast,
    }
  })

  return (
    <details className="p-2 mt-8 border rounded">
      <summary className="font-bold cursor-pointer list-item">
        Full table
      </summary>
      <h2 className="py-4 text-2xl">Background Color: {background.label}</h2>
      <table className="contrast-full-table">
        <thead>
          <tr>
            <th
              className={`border px-2 py-1 ${background.label} text-${headerTextColor}`}
            >
              Color
            </th>
            <th className="px-2 py-1 border">Color</th>
            <th className="px-2 py-1 border">Large Text</th>
            <th className="px-2 py-1 border">Normal Text</th>
            <th className="px-2 py-1 border">Ratio</th>
          </tr>
        </thead>
        <tbody>
          {colorsList.map((color, i) => (
            <tr className="header" key={i}>
              <th
                className={`border px-2 py-1 ${background.label} text-${color.name}`}
              >
                {color.name}
              </th>
              <td className="px-2 py-1 border">{color.name}</td>
              <td className="px-2 py-1 border">{color.largeContrast}</td>
              <td className="px-2 py-1 border">{color.normalContrast}</td>
              <td className="px-2 py-1 border">{round(color.ratio, 2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  )
}

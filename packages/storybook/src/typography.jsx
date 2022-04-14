import { Table } from '@frontend/design-system'
import React from 'react'

const TypeComponent = (tagName) => {
  return ({ children }) => {
    return React.createElement(
      tagName,
      {
        style: { margin: 0, padding: 0 },
      },
      children
    )
  }
}
const getTypographicProperties = (tagName) => {
  const el = document.createElement(tagName)

  document.body.appendChild(el)
  const Component = TypeComponent(tagName)
  const styles = window.getComputedStyle(el)
  const typeface = styles.fontFamily.split(',')[0]
  const weight = styles.fontWeight
  const size = styles.fontSize
  const casing =
    styles.textTransform === 'none' ? 'Sentence' : styles.textTransform
  const letterSpacing = styles.letterSpacing
  document.body.removeChild(el)

  return {
    Component,
    typeface,
    weight,
    size,
    casing,
    letterSpacing,
  }
}
const TYPOGRAPHIC_STYLES = [
  {
    scale: 'Heading 1',
    ...getTypographicProperties('h1'),
  },
  {
    scale: 'Heading 2',
    ...getTypographicProperties('h2'),
  },
  {
    scale: 'Heading 3',
    ...getTypographicProperties('h3'),
  },
  {
    scale: 'Heading 4',
    ...getTypographicProperties('h4'),
  },
  {
    scale: 'Heading 5',
    ...getTypographicProperties('h5'),
  },
  {
    scale: 'Heading 6',
    ...getTypographicProperties('h6'),
  },
  {
    scale: 'Body copy',
    ...getTypographicProperties('div'),
  },
  {
    scale: 'Caption',
    ...getTypographicProperties('small'),
  },
]

export class Typography extends React.Component {
  render() {
    return (
      <div className="container">
        <Table>
          <thead>
            <tr>
              <th>Scale</th>
              <th>Typeface</th>
              <th>Weight</th>
              <th className="text-right">Size</th>
              <th className="text-right">Letter spacing</th>
              <th className="text-right">Case</th>
            </tr>
          </thead>
          <tbody>
            {TYPOGRAPHIC_STYLES.map((type) => (
              <tr key={type.scale}>
                <td>
                  <type.Component>{type.scale}</type.Component>
                </td>
                <td>{type.typeface}</td>
                <td>{type.weight}</td>
                <td className="text-right">{type.size}</td>
                <td className="text-right">{type.letterSpacing}</td>
                <td className="text-right">{type.casing}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

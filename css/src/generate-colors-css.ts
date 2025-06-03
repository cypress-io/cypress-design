import { cyColors as colors } from './color-constants'
import fs from 'fs'
import path from 'path'

function generateColorsCSS() {
  let css = ':root {\n'

  // Generate base color variables
  Object.entries(colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      css += `  --cy-${colorName}-${shade}: ${value};\n`
    })
    css += '\n'
  })

  css += '}\n'

  // Write to file
  const outputPath = path.join(__dirname, 'colors.css')
  fs.writeFileSync(outputPath, css)
}

generateColorsCSS()

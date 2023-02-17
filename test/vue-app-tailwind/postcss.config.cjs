const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const { TailwindConfig } = require('@cypress-design/css')
const path = require('path')

module.exports = {
  plugins: [
    tailwindcss(
      TailwindConfig(['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'])
    ),
    autoprefixer,
  ],
}

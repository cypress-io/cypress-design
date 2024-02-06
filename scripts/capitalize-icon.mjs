/**
 * initially the icon directory was lower case
 * but every other component is capitalized.
 * we rename this directory to Icon to make the docs more standard
 */
import * as fs from 'fs'
import * as path from 'path'

fs.readdir(
  path.resolve('./components'),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.error(err)
    } else {
      if (
        !files.some((file) => {
          if (file.isDirectory() && file.name === 'icon') {
            return true
          } else {
            return false
          }
        })
      ) {
        console.log('Directory already renamed')
        return
      }
    }

    fs.rename(
      path.resolve('./components/icon'),
      path.resolve('./components/Icon2'),
      (err) => {
        if (err) {
          console.error(err)
        } else {
          console.log('Directory renamed badly successfully')
          fs.rename(
            path.resolve('./components/Icon2'),
            path.resolve('./components/Icon'),
            (err) => {
              if (err) {
                console.error(err)
              } else {
                console.log('Directory renamed fixed successfully')
              }
            },
          )
        }
      },
    )
  },
)

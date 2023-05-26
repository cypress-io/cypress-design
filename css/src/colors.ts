// NOTE: All the colors in this file are also temporarily stored in packages/reporter/src/lib/variables.scss, for use in the reporter. If you change any here, please also change them there.

import Colors from 'tailwindcss/colors'
import { cyColors, semanticColors } from './color-constants'

// filter out this deprecated color to remove the annoying warning
const FilteredColors = Object.keys(Colors).reduce(
  (acc: Record<string, string | Record<string, string>>, key) => {
    // TODO: should we maybe not include the default colors at all? (other than white & black)
    // TODO: run `yarn windi` in frontend-shared to see if the other colors are used
    if (
      ![
        'blueGray',
        'coolGray',
        'lightBlue',
        'warmGray',
        'trueGray',
        'zink',
      ].includes(key)
    ) {
      acc[key] = Colors[key as keyof typeof Colors]
    }

    return acc
  },
  {}
)

export const colors = { ...FilteredColors, ...semanticColors, ...cyColors }

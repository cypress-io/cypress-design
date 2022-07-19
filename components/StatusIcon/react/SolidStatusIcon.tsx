import * as React from 'react'
import { SVGProps } from 'react'
import { compileReactIconProperties } from '@cypress-design/react-icon'
import { statuses } from '../outline-imports'
import { type VariantStatusIconProps } from '../constants'

export const SolidStatusIcon: React.FC<
  VariantStatusIconProps & SVGProps<SVGSVGElement>
> = ({ size = '24', status = 'placeholder', ...rest }) => {
  const statusInfo = status ? statuses[status] : statuses.placeholder

  const icon = statusInfo[`size${size}Icon`]

  const classes = `inline-block ${rest.className || ''} ${
    statusInfo.shouldSpin && size !== '4' ? 'animate-spin' : ''
  }`

  return React.createElement(
    'svg',
    compileReactIconProperties({
      body: icon.data,
      compiledClasses: [classes],
      size,
    })
  )
}

export default SolidStatusIcon

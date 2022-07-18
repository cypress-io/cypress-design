import * as React from 'react'
import { SVGProps } from 'react'
import { compileReactIconProperties } from '@cypress-design/react-icon'
import { statuses } from '../simple-imports'

export type SimpleStatusIconProps = {
  size?: '4' | '8' | '12' | '16' | '24'
  /**
    If there is no status provided, a placeholder icon will be shown
  */
  status?: keyof typeof statuses | null | undefined
}

export const SimpleStatusIcon: React.FC<
  SimpleStatusIconProps & SVGProps<SVGSVGElement>
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

export default SimpleStatusIcon

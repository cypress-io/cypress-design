import * as React from 'react'
import { SVGProps } from 'react'
import { getDisplayVariant, statuses } from '../constants'
import { compileReactIconProperties } from '@cypress-design/react-icon'

export type StatusIconProps = {
  size?: '4' | '8' | '12' | '16' | '24'
  /**
    If there is no status provided, a placeholder icon will be shown
  */
  status?: keyof typeof statuses | null | undefined
  /**
   * If a status doesn't have an icon for that variant, it will default to one it does have
   */
  variant?: 'simple' | 'solid' | 'outline'
}

export const StatusIcon: React.FC<
  StatusIconProps & SVGProps<SVGSVGElement>
> = ({ size = '24', status, variant = 'simple', ...rest }) => {
  const statusInfo = status ? statuses[status] : statuses.placeholder

  const icon = statusInfo.variants[getDisplayVariant(statusInfo, variant)][size]

  const classes = `inline-block ${rest.className || ''} ${
    statusInfo.iconSpin && size !== '4' ? 'animate-spin' : ''
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

export default StatusIcon

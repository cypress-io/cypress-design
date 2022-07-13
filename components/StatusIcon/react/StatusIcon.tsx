import * as React from 'react'
import { getDisplayVariant, statuses } from '../constants'
import type { Size, Variant } from '../constants'
import { type SVGPropsWithoutColorsOrSize } from '@cypress-design/react-icon'
import { compileReactIconProperties } from '@cypress-design/react-icon/Icon'

export interface StatusIconProps {
  size?: Size
  /**
    If there is no status provided, a placeholder icon will be shown
  */
  status?: keyof typeof statuses | null | undefined
  /**
   * If a status doesn't have an icon for that variant, it will default to one it does have
   */
  variant?: Variant
}

export const StatusIcon: React.FC<
  StatusIconProps & SVGPropsWithoutColorsOrSize
> = ({ size = '24', status, variant = 'simple', ...rest }) => {
  // TODO: how to handle `rest`? make sure SVGPropsWithoutColorsOrSize is right
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

import * as React from 'react'
import clsx from 'clsx'
import { getDisplayVariant, statuses } from '../constants'
import type { Size, Variant } from '../constants'
import Icon, { SVGPropsWithoutColorsOrSize } from '@cypress-design/react-icon'

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
  const statusInfo = status ? statuses[status] : statuses.placeholder

  return (
    <Icon
      {...rest}
      className={clsx('inline-block', rest.className, {
        'animate-spin': statusInfo.iconSpin && size !== '4',
      })}
      name={
        statusInfo.iconName + '-' + getDisplayVariant(statusInfo, size, variant)
      }
      size={size}
    />
  )
}

export default StatusIcon

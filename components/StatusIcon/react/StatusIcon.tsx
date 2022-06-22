import * as React from 'react'
import clsx from 'clsx'
import { getDisplayVariant, statuses } from '../constants'
import type { Size, Variant } from '../constants'

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
  StatusIconProps & React.HTMLProps<HTMLImageElement>
> = ({ size = '24', status, variant = 'simple', ...rest }) => {
  const statusInfo = status ? statuses[status] : statuses.placeholder

  return (
    <img
      {...rest}
      className={clsx('inline-block', rest.className, {
        'animate-spin': statusInfo.iconSpin && size !== '4',
      })}
      src={require(`../img/${statusInfo.iconName}-${getDisplayVariant(
        statusInfo,
        size,
        variant
      )}_x${size}.svg`)}
    />
  )
}

export default StatusIcon

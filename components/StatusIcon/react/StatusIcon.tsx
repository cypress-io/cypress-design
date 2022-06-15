import * as React from 'react'
import clsx from 'clsx'
import { statuses } from '../constants'
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

  // TODO: write a test for what these should default to
  // TODO: write a test that loading should spin, the others should not, and loading x4 should not spin
  const getDisplayVariant = () => {
    if (size === '4' || size === '8' || size === '12') {
      // there's only one variant of small ones: return the default
      return statusInfo.variants[0]
    }

    if (statusInfo.variants?.includes(variant)) {
      return variant
    }

    // if the requested variant isn't an option, default to the first one in the variants list
    return statusInfo.variants[0]
  }

  return (
    <img
      {...rest}
      className={clsx('inline-block', rest.className, {
        'animate-spin': statusInfo.iconSpin && size !== '4',
      })}
      src={require(`../img/${
        statusInfo.iconName
      }-${getDisplayVariant()}_x${size}.svg`)}
    />
  )
}

export default StatusIcon

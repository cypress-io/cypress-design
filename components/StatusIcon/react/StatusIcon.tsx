import * as React from 'react'
import clsx from 'clsx'
import { statuses } from '../constants'
import type { Status } from '../constants'

export interface StatusIconProps {
  size?: '4' | '8' | '12' | '16' | '24' // TODO: can we combine this with constants array?
  /**
    If there is no status provided, a placeholder icon will be shown
  */
  status?: Status
  /**
   * If a status doesn't have an icon for that variant, it will default to one it does have
   */
  variant?: 'outline' | 'simple' | 'solid'
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
  {
    /* {status} {size} provided: {variant} calculated: {iconVariant} */
  }
}

export default StatusIcon

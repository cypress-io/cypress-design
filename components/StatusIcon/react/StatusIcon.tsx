import * as React from 'react'
import { SVGProps } from 'react'
import { statuses } from '../constants'
import OutlineStatusIcon from './OutlineStatusIcon'
import SimpleStatusIcon from './SimpleStatusIcon'
import SolidStatusIcon from './SolidStatusIcon'

export type StatusIconProps = {
  size?: '4' | '8' | '12' | '16' | '24'
  /**
    If there is no status provided, a placeholder icon will be shown
  */
  status?: keyof typeof statuses | null | undefined
  /**
   * If a status doesn't have an icon for that variant, it will default to one it does have
   */
  variant?: 'outline' | 'simple' | 'solid'
}

export const StatusIcon: React.FC<
  StatusIconProps & SVGProps<SVGSVGElement>
> = ({ size = '24', status, variant = 'simple', ...rest }) => {
  if (variant === 'outline') {
    return <OutlineStatusIcon size={size} status={status} {...rest} />
  }

  if (variant === 'simple') {
    return <SimpleStatusIcon size={size} status={status} {...rest} />
  }

  return <SolidStatusIcon size={size} status={status} {...rest} />
}

export default StatusIcon

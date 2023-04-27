import * as React from 'react'
import { SVGProps } from 'react'
import type { Variant, Size } from '@cypress-design/constants-statusicon'
import { statuses } from '@cypress-design/constants-statusicon'
import OutlineStatusIcon from './_OutlineStatusIcon'
import SimpleStatusIcon from './_SimpleStatusIcon'
import SolidStatusIcon from './_SolidStatusIcon'

export type StatusIconProps = {
  /**
   * The size of the icon's canvas, in pixels.
   */
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

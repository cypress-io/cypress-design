import * as React from 'react'
import { SVGProps } from 'react'
import { statuses } from '../outline-imports'
import type { VariantStatusIconProps } from '../constants'
import { compileProps } from './compileProps'

export const OutlineStatusIcon: React.FC<
  VariantStatusIconProps & SVGProps<SVGSVGElement>
> = ({ size = '24', status = 'placeholder', ...rest }) => {
  return React.createElement(
    'svg',
    compileProps({
      status,
      statuses,
      className: rest.className,
      size,
    })
  )
}

export default OutlineStatusIcon

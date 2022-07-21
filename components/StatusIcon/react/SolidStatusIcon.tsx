import * as React from 'react'
import { SVGProps } from 'react'
import { statuses } from '../solid-imports'
import { compileReactStatusIconProperties } from '../constants'
import type { VariantStatusIconProps } from '../constants'

export const SolidStatusIcon: React.FC<
  VariantStatusIconProps & SVGProps<SVGSVGElement>
> = ({ size = '24', status = 'placeholder', ...rest }) => {
  return React.createElement(
    'svg',
    compileReactStatusIconProperties({
      status,
      statuses,
      className: rest.className,
      size,
    })
  )
}

export default SolidStatusIcon

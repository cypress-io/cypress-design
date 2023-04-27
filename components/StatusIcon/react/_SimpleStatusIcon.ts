import * as React from 'react'
import { SVGProps } from 'react'
import { simple } from '@cypress-design/constants-statusicon'
import type { VariantStatusIconProps } from '@cypress-design/constants-statusicon'
import { compileProps } from './compileProps'

export const SimpleStatusIcon: React.FC<
  VariantStatusIconProps & SVGProps<SVGSVGElement>
> = ({ size = '24', status = 'placeholder', ...rest }) => {
  return React.createElement('svg', {
    ...rest,
    ...compileProps({
      status,
      statuses: simple.statuses,
      className: rest.className,
      size,
    }),
  })
}

export default SimpleStatusIcon

import * as React from 'react'
import { SVGProps } from 'react'
import { outline } from '@cypress-design/constants-statusicon'
import type { VariantStatusIconProps } from '@cypress-design/constants-statusicon'
import { compileProps } from './compileProps'

export const OutlineStatusIcon: React.FC<
  VariantStatusIconProps & SVGProps<SVGSVGElement>
> = ({ size = '24', status = 'placeholder', ...rest }) => {
  return React.createElement('svg', {
    ...rest,
    ...compileProps({
      status,
      statuses: outline.statuses,
      className: rest.className,
      size,
    }),
  })
}

export default OutlineStatusIcon

import * as React from 'react'
import { SVGProps } from 'react'
import { solid } from '@cypress-design/constants-statusicon'
import type { VariantStatusIconProps } from '@cypress-design/constants-statusicon'
import { compileProps } from './compileProps'

export const SolidStatusIcon: React.FC<
  VariantStatusIconProps & SVGProps<SVGSVGElement>
> = ({ size = '24', status = 'placeholder', ...rest }) => {
  return React.createElement('svg', {
    ...rest,
    ...compileProps({
      status,
      statuses: solid.statuses,
      className: rest.className,
      size,
      variantName: 'solid',
    }),
  })
}

export default SolidStatusIcon

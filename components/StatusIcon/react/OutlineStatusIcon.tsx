import * as React from 'react'
import { SVGProps } from 'react'
import { statuses } from '../outline-imports'
import { compileReactStatusIconProperties } from '../constants'
import type { VariantStatusIconProps } from '../constants'
import { compileReactIconProperties } from '@cypress-design/react-icon'

export const OutlineStatusIcon: React.FC<
  VariantStatusIconProps & SVGProps<SVGSVGElement>
> = ({ size = '24', status = 'placeholder', ...rest }) => {
  return React.createElement(
    'svg',
    compileReactIconProperties(
      compileReactStatusIconProperties({
        status,
        statuses,
        className: rest.className,
        size,
      })
    )
  )
}

export default OutlineStatusIcon

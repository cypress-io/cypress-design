import * as React from 'react'
import type { FunctionComponent, SVGProps } from 'react'
import { compileIcon } from '@cypress-design/icon-registry'
import type { IconProps } from '@cypress-design/icon-registry'
import { compileReactIconProperties } from './compileProperties'

type SVGPropsWithoutColorsOrSize = Omit<
  SVGProps<SVGSVGElement>,
  'fill' | 'stroke' | 'fillColor' | 'strokeColor' | 'size'
>

export const Icon: FunctionComponent<
  IconProps & SVGPropsWithoutColorsOrSize
> = (props) => {
  return React.createElement(
    'svg',
    compileReactIconProperties(compileIcon(props))
  )
}

export default Icon

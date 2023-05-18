import * as React from 'react'
import type { FunctionComponent, SVGProps } from 'react'
import clsx from 'clsx'
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
  const { className, ...cleanProps } = props
  const properties = compileReactIconProperties(compileIcon(cleanProps))
  return React.createElement('svg', {
    ...properties,
    className: clsx(properties.className, className),
  })
}

export default Icon

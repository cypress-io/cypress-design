import cs from 'clsx'
import React, { FunctionComponent } from 'react'
import SVG, { Props as SVGProps } from 'react-inlinesvg'

import styles from './module.CustomIcons.scss'

// view docs at
// https://github.com/cypress-io/cypress-services/blob/develop/docs/custom-icons.md

interface CustomIconProps extends Partial<SVGProps> {
  name: string
  className?: string
  size?: 'x12' | 'x16' | 'x20' | 'x24' | 'x32' | 'x40' | 'x48'
  variant?: 'small'
  width?: number
  height?: number
  alt?: string
  spin?: boolean
}

export const CustomIcon: FunctionComponent<CustomIconProps> = ({
  name,
  className,
  size,
  variant,
  width,
  height,
  alt,
  spin = false,
  ...props
}) => {
  const fullName = variant
    ? `${name}-${variant}`
    : size
    ? `${name}_${size}`
    : `${name}`
  const nameClass = name ? `cy-${name}-icon` : ''
  const px: number | undefined = size && Number(size.replace('x', ''))

  const iconWidth: number = width || px || 20
  const iconHeight: number = iconWidth

  return (
    <SVG
      {...props}
      src={require(`@DS/lib/img/icons/${fullName}.svg`)}
      className={cs('cy-icon', className, nameClass, styles.customIcon, {
        [styles.spin]: spin,
      })}
      width={iconWidth}
      height={iconHeight}
      title={alt || undefined}
      onError={console.log}
    />
  )
}

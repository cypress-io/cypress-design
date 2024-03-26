import * as React from 'react'
import clsx from 'clsx'
import { logoLockUp, logoMark } from '@cypress-design/icon-registry'

function FromVariant({
  variant,
  ...rest
}: {
  variant: { viewBox: string; data: string; width: number; height: number }
} & React.SVGProps<SVGSVGElement>) {
  // This function is used to generate the `variant` prop type
  return (
    <svg
      width={variant.width}
      height={variant.height}
      {...rest}
      viewBox={variant.viewBox}
      dangerouslySetInnerHTML={{ __html: variant.data }}
    />
  )
}

export const CypressMark: React.FC<
  React.SVGProps<SVGSVGElement> & { variant?: keyof typeof logoMark }
> = ({ variant = 'default', ...rest }) => {
  return <FromVariant {...rest} variant={logoMark[variant]} />
}

export const CypressWatermark: React.FC<
  React.SVGProps<SVGSVGElement> & { dark: boolean }
> = ({ dark, className, ...rest }) => {
  return (
    <CypressMark
      {...rest}
      className={clsx(
        className,
        dark
          ? 'stroke-gray-500 text-gray-300 opacity-40'
          : 'stroke-white/10 text-white/20',
      )}
    />
  )
}

export const CypressLockUp: React.FC<
  React.SVGProps<SVGSVGElement> & { variant?: keyof typeof logoLockUp }
> = ({ variant = 'default', ...rest }) => {
  return <FromVariant {...rest} variant={logoLockUp[variant]} />
}

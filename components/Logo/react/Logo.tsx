import * as React from 'react'
import { logoLockUp, logoMark } from '@cypress-design/icon-registry'

export const CypressLockUp: React.FC<
  React.SVGProps<SVGSVGElement> & { variant?: keyof typeof logoLockUp }
> = ({ variant = 'default', ...rest }) => {
  const resolvedVariant = logoLockUp[variant]
  return (
    <svg
      {...rest}
      viewBox={resolvedVariant.viewBox}
      dangerouslySetInnerHTML={{ __html: resolvedVariant.data }}
    />
  )
}

export const CypressMark: React.FC<
  React.SVGProps<SVGSVGElement> & { variant?: keyof typeof logoMark }
> = ({ variant = 'default', ...rest }) => {
  const resolvedVariant = logoMark[variant]
  return (
    <svg
      {...rest}
      viewBox={resolvedVariant.viewBox}
      dangerouslySetInnerHTML={{ __html: resolvedVariant.data }}
    />
  )
}

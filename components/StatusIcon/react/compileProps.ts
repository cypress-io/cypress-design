import type { IconSet, VariantStatusIconProps } from '../constants'
import { compileReactIconProperties } from '@cypress-design/react-icon'

export const compileProps = ({
  status,
  statuses,
  className,
  size,
}: VariantStatusIconProps & {
  statuses: Record<string, IconSet>
  className: string | undefined
}) => {
  const statusInfo = status ? statuses[status] : statuses.placeholder

  const icon = statusInfo[`size${size}Icon`]

  const classes = `inline-block ${className || ''} ${
    statusInfo.shouldSpin && size !== '4' ? 'animate-spin' : ''
  }`

  return compileReactIconProperties({
    body: icon.data,
    compiledClasses: [classes],
    size,
  })
}

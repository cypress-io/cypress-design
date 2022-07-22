import type { IconSet, VariantStatusIconProps } from '../constants'
import { compileVueIconProperties } from '@cypress-design/vue-icon'

export const compileProps = ({
  status,
  statuses,
  size,
  ...attributes
}: VariantStatusIconProps & {
  statuses: Record<string, IconSet>
  [attributes: string]: any
}) => {
  const statusInfo = status ? statuses[status] : statuses.placeholder

  const icon = statusInfo[`size${size}Icon`]

  const compiledClasses = [
    'inline-block',
    statusInfo.shouldSpin && size !== '4' ? 'animate-spin' : '',
  ]

  return compileVueIconProperties({
    compiledClasses,
    size,
    body: icon.data,
    ...attributes,
  })
}

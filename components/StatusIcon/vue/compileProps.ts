import type { IconSet, VariantStatusIconProps } from '../constants'
import { statuses as StatusForColor } from '../constants'
import { compileVueIconProperties } from '@cypress-design/vue-icon'
import { getComponentAttributes } from '@cypress-design/icon-registry'

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

  const iconInfo = status ? StatusForColor[status] : StatusForColor.placeholder

  const { data: iconData, name } = statusInfo[`size${size}Icon`]

  const classes = [
    'inline-block',
    iconInfo.shouldSpin && size !== '4' ? 'animate-spin' : '',
  ]

  const { compiledClasses } = getComponentAttributes({
    name,
    strokeColor: iconInfo.color,
    size,
    availableSizes: [size],
    fillColor: iconInfo.secondaryColor,
  })

  return compileVueIconProperties({
    compiledClasses: [...compiledClasses, ...classes],
    size,
    body: iconData,
    ...attributes,
  })
}

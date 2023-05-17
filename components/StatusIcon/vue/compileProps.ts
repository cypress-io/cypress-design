import { SVGAttributes } from 'vue'
import type {
  IconSet,
  VariantStatusIconProps,
} from '@cypress-design/constants-statusicon'
import { statuses as StatusForColor } from '@cypress-design/constants-statusicon'
import { compileVueIconProperties } from '@cypress-design/vue-icon'
import { getComponentAttributes } from '@cypress-design/icon-registry'

export const compileProps = ({
  status,
  statuses,
  size,
  ...attributes
}: VariantStatusIconProps & {
  statuses: Record<string, IconSet>
} & Omit<SVGAttributes, 'name'>) => {
  const statusInfo = status ? statuses[status] : statuses.placeholder

  const iconInfo = status ? StatusForColor[status] : StatusForColor.placeholder

  const { data: iconData } = statusInfo[`size${size}Icon`]

  const classes = ['inline-block']

  const { compiledClasses } = getComponentAttributes({
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

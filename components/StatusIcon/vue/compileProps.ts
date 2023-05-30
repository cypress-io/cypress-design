import { SVGAttributes, computed } from 'vue'
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
  variantName,
  ...attributes
}: VariantStatusIconProps & {
  statuses: Record<string, IconSet>
  variantName: string
} & Omit<SVGAttributes, 'name'>) => {
  const props = computed(() => {
    const statusInfo = status ? statuses[status] : statuses.placeholder

    const iconInfo = status
      ? StatusForColor[status]
      : StatusForColor.placeholder

    const { data: iconData } = statusInfo[`size${size}Icon`]

    const classes = ['inline-block']

    const { compiledClasses } = getComponentAttributes({
      size,
      availableSizes: [size],
      strokeColor: iconInfo.color,
      fillColor: iconInfo.secondaryColor,
    })

    return {
      name: `status_${status}_${size}_${variantName}`,
      compiledClasses: [...compiledClasses, ...classes],
      size,
      body: iconData,
      ...attributes,
    }
  })

  return compileVueIconProperties(props)
}

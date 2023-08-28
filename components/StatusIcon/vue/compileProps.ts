import { SVGAttributes, computed } from 'vue'
import type {
  IconSet,
  VariantStatusIconProps,
} from '@cypress-design/constants-statusicon'
import { statuses as StatusForColor } from '@cypress-design/constants-statusicon'
import { compileVueIconProperties } from '@cypress-design/vue-icon'
import { getComponentAttributes } from '@cypress-design/icon-registry'

export function cloneFilter<T>(object: Record<string, T>, blacklist: string[]) {
  const newObject: Record<string, T> = {}
  for (const key in object) {
    if (!blacklist.includes(key)) {
      newObject[key] = object[key]
    }
  }
  return newObject
}

export const compileProps = (
  props: VariantStatusIconProps & Omit<SVGAttributes, 'name'>,
  injections: {
    statuses: Record<string, IconSet>
    variantName: string
  },
) => {
  const compProps = computed(() => {
    const { statuses, variantName } = injections
    const { status, size, ...attributes } = props
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

  return compileVueIconProperties(compProps)
}

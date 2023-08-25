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
    const statusInfo = props.status
      ? injections.statuses[props.status]
      : injections.statuses.placeholder

    const iconInfo = props.status
      ? StatusForColor[props.status]
      : StatusForColor.placeholder

    const { data: iconData } = statusInfo[`size${props.size}Icon`]

    const classes = ['inline-block']

    const { compiledClasses } = getComponentAttributes({
      size: props.size,
      availableSizes: [props.size],
      strokeColor: iconInfo.color,
      fillColor: iconInfo.secondaryColor,
    })

    return {
      name: `status_${props.status}_${props.size}_${injections.variantName}`,
      compiledClasses: [...compiledClasses, ...classes],
      size: props.size,
      body: iconData,
      ...cloneFilter(props, ['status', 'statuses', 'variantName', 'size']),
    }
  })

  return compileVueIconProperties(compProps)
}

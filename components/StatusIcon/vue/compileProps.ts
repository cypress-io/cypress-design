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
  // Undefined when the status/size pair has no icon asset (an unknown status
  // or size), so the component can render nothing instead of throwing.
  const iconContents = computed(() => {
    const { statuses } = injections
    const { status, size = '24' } = props
    const statusInfo = status ? statuses[status] : statuses.placeholder
    return statusInfo?.[`size${size}Icon` as keyof IconSet]
  })

  const compProps = computed(() => {
    const { variantName } = injections
    const { status, size = '24', ...attributes } = props

    const iconInfo =
      (status ? StatusForColor[status] : undefined) ??
      StatusForColor.placeholder

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
      body: iconContents.value?.data ?? '',
      ...attributes,
    }
  })

  return {
    ...compileVueIconProperties(compProps),
    hasIcon: computed(() => !!iconContents.value),
  }
}

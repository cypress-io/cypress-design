import type { OpenIconProps } from '@cypress-design/icon-registry'
import { ICON_COLOR_PROP_NAMES } from '@cypress-design/icon-registry'
import { Ref, computed } from 'vue'
import type { SVGAttributes } from 'vue'

export const compileVueIconProperties = (
  opts: Ref<
    OpenIconProps &
      SVGAttributes & {
        body: string
        defs?: string
        compiledClasses: string[]
        size: string
        interactiveColorsOnGroup?: boolean
      }
  >
) => {
  const ret = computed(() => {
    const {
      name: iconName,
      body,
      defs,
      compiledClasses,
      size,
      ...attributes
    } = opts.value
    const filteredAttributes = Object.keys(attributes).reduce(
      (newAttributes, attrName) => {
        if (
          !ICON_COLOR_PROP_NAMES.includes(
            attrName as (typeof ICON_COLOR_PROP_NAMES)[number]
          ) &&
          attrName !== 'name'
        ) {
          // @ts-expect-error - TS doesn't know that attrName is a key of SVGAttributes
          newAttributes[attrName] =
            attributes[attrName as keyof typeof attributes]
        }
        return newAttributes
      },
      {} as Omit<SVGAttributes, 'name'>
    )

    const iconFileId = `${iconName}_${size}`

    const componentProps = {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      fill: 'none',
      innerHTML: body,
      class: undefined as string | undefined,
      ...filteredAttributes, // add all standard attributes back to the svg tag
    }

    if (compiledClasses.length) {
      componentProps.class = compiledClasses.join(' ')
    }

    return {
      componentProps,
      iconFileId,
      defs,
    }
  })

  // onMounted(() => {
  //   const { iconFileId, defs } = ret.value ?? {}
  //   if (defs) {
  //     if (document.querySelector(`[data-cy-svg-defs="${iconFileId}"]`)) {
  //       return
  //     }
  //     const defsElement = document.createElementNS(
  //       'http://www.w3.org/2000/svg',
  //       'svg'
  //     )
  //     defsElement.setAttribute('data-cy-svg-defs', iconFileId)
  //     defsElement.setAttribute('width', '0')
  //     defsElement.setAttribute('height', '0')
  //     defsElement.innerHTML = defs
  //     document.body.appendChild(defsElement)
  //   }
  // })

  return {
    componentProps: computed(() => ret.value.componentProps),
    defs: computed(() => ret.value.defs),
  }
}

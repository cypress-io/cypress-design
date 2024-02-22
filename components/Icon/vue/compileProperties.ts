import type { OpenIconProps } from '@cypress-design/icon-registry'
import { ICON_COLOR_PROP_NAMES } from '@cypress-design/icon-registry'
import {
  ComputedRef,
  Ref,
  computed,
  onBeforeMount,
  onUnmounted,
  ref,
} from 'vue'
import type { SVGAttributes } from 'vue'

export type VueComponentClassObject =
  | Record<string, boolean>
  | string
  | Array<Record<string, boolean> | string>

/**
 * Icon names of the SVGs whose defs already appear in the DOM
 */
const defsAlreadyLoaded = new Set<string>()

/**
 * There is a bug in the chrome renderer
 * If an svg containing defs is twice on the page
 *  AND
 * the first instance is hidden (display:none)
 *
 * Then the defs are not rendered for the second instance
 * @param iconName
 * @param defs
 */
export const useShouldRenderDefs = (
  iconName: string,
  defs: ComputedRef<string | undefined>,
) => {
  const shouldRenderDefs = ref(false)

  onBeforeMount(() => {
    const hasDocMarker =
      // on SSR, we always want the first instance to come with the defs
      typeof document === 'undefined' ||
      // in interactive mode, the defs can be loaded, then removed, then loaded again
      // so we check that they are here before adding them again
      !document.querySelector(`[data-cy-icon-unified-defs="${iconName}"]`)
    shouldRenderDefs.value = !defsAlreadyLoaded.has(iconName) && hasDocMarker
    if (hasDocMarker) {
      defsAlreadyLoaded.add(iconName)
    }
  })

  onUnmounted(() => {
    if (shouldRenderDefs.value && defs.value) {
      // to avoid ssr mismatch errors and jank
      // add the defs inside an extra SVG and append it to the end of the body only when unmounting
      const newDefs = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg',
      )
      newDefs.setAttribute('width', '0')
      newDefs.setAttribute('height', '0')
      newDefs.setAttribute('data-cy-icon-unified-defs', iconName)
      newDefs.style.position = 'absolute'
      newDefs.innerHTML = defs.value
      document.body.appendChild(newDefs)
    }
  })
  return { shouldRenderDefs }
}

export const compileVueIconProperties = (
  opts: Ref<
    OpenIconProps &
      SVGAttributes & {
        body: string
        defs?: string
        compiledClasses: string[]
        size: string
        alt?: string
        interactiveColorsOnGroup?: boolean
      }
  >,
) => {
  const ret = computed(() => {
    const {
      name: iconName,
      body,
      defs,
      compiledClasses,
      size,
      alt,
      ...attributes
    } = opts.value
    const filteredAttributes = Object.keys(attributes).reduce(
      (newAttributes, attrName) => {
        if (
          !ICON_COLOR_PROP_NAMES.includes(
            attrName as (typeof ICON_COLOR_PROP_NAMES)[number],
          ) &&
          attrName !== 'name'
        ) {
          // @ts-expect-error - TS doesn't know that attrName is a key of SVGAttributes
          newAttributes[attrName] = attributes[attrName]
        }
        return newAttributes
      },
      {} as Omit<SVGAttributes, 'name'>,
    )

    const iconFileId = `${iconName}_${size}`

    const componentProps = {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      fill: 'none',
      innerHTML: alt
        ? `<title>${alt.replace(/[><]/g, (s) => {
            return s === '>' ? '&gt;' : '&lt;'
          })}</title>${body}`
        : body,
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

  return {
    componentProps: computed(() => ret.value.componentProps),
    defs: computed(() => ret.value.defs),
  }
}

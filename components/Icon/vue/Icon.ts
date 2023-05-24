import {
  ICON_COLOR_PROP_NAMES,
  compileIcon,
} from '@cypress-design/icon-registry'
import type { OpenIconProps, IconProps } from '@cypress-design/icon-registry'
import {
  h,
  computed,
  defineComponent,
  onBeforeMount,
  ref,
  onUnmounted,
} from 'vue'
import type { SVGAttributes } from 'vue'
import { compileVueIconProperties } from './compileProperties'

const defsAlreadyLoaded = new Set<string>()

export default defineComponent(
  (
    // the OpenIconProps helps volar extract the documentation from the props
    // since the IconProps are more restrictive, it will not change the use behavior
    props: OpenIconProps & Pick<IconProps, 'name'> & { class?: string },
    { attrs }: { attrs: Omit<SVGAttributes, 'name' | 'class'> }
  ) => {
    const ret = computed(() => {
      const { class: className, ...otherProps } = props
      const iconProps = compileIcon(otherProps)
      return { className, iconProps }
    })

    const { componentProps, defs } = compileVueIconProperties(
      computed(() => ret.value.iconProps)
    )

    const shouldRenderDefs = ref(false)
    onBeforeMount(() => {
      const hasDocMarker =
        // on SSR, we always want the first instance to come with the defs
        typeof document === 'undefined' ||
        // in interactive mode, the defs can be loaded, then removed, then loaded again
        !document.querySelector(`[data-cy-icon-unified-defs="${props.name}"]`)
      shouldRenderDefs.value =
        !defsAlreadyLoaded.has(props.name) && hasDocMarker
      if (hasDocMarker) {
        defsAlreadyLoaded.add(props.name)
      }
    })

    onUnmounted(() => {
      if (shouldRenderDefs.value) {
        defsAlreadyLoaded.delete(props.name)
      }
    })

    return () => {
      return shouldRenderDefs.value
        ? [
            h('svg', {
              innerHTML: defs.value,
              'data-cy-icon-unified-defs': props.name,
              class: [
                'w-0',
                'h-0',
                'absolute',
                'pointer-events-none',
                'opacity-0',
              ],
            }),
            h('svg', {
              ...attrs,
              ...componentProps.value,
              class: [ret.value.className, componentProps.value.class],
            }),
          ]
        : h('svg', {
            ...attrs,
            ...componentProps.value,
            class: [ret.value.className, componentProps.value.class],
          })
    }
  },
  {
    // @ts-expect-error - vue types need an update
    props: [
      ...ICON_COLOR_PROP_NAMES,
      'interactiveColorsOnGroup',
      'size',
      'name',
      'class',
    ],
  }
)

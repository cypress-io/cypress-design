<script lang="ts">
import { ref, watch } from 'vue'

function useAnimatedEffect(animated: () => boolean, dur: number) {
  const prevAnimated = ref(animated())
  const animateRef = ref<SVGAnimateElement | null>(null)

  watch(animated, (newVal) => {
    if (prevAnimated.value === newVal) {
      animateRef.value?.endElement()
    } else {
      animateRef.value?.beginElement()
      setTimeout(() => {
        prevAnimated.value = newVal
      }, dur - 30)
    }
  })

  return { prevAnimated, animateRef }
}
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    d: string
    dAnimated: string
    animated?: boolean
    dur?: number
  }>(),
  {
    animated: false,
    dur: 150,
  },
)

const { prevAnimated, animateRef } = useAnimatedEffect(
  () => props.animated,
  props.dur,
)
</script>

<template>
  <path :d="prevAnimated ? props.dAnimated : props.d">
    <animate
      :ref="
        (r) => {
          animateRef = r as any
        }
      "
      attributeName="d"
      :dur="`${props.dur}ms`"
      repeatCount="1"
      :values="
        prevAnimated === props.animated
          ? undefined
          : prevAnimated
            ? [props.dAnimated, props.d].join(';')
            : [props.d, props.dAnimated].join(';')
      "
      restart="always"
    />
  </path>
</template>

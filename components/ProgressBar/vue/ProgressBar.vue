<script lang="ts">
import { computed, defineComponent, watchEffect, type PropType } from 'vue'
import { twMerge } from 'tailwind-merge'
import {
  buildProgressBarView,
  ensureActiveStyle,
  DefaultColor,
  DefaultMax,
  DefaultSize,
  DefaultTheme,
  type ProgressBarColor,
  type ProgressBarSegment,
  type ProgressBarSize,
  type ProgressBarTheme,
} from '@cypress-design/constants-progressbar'

export default defineComponent({
  name: 'ProgressBar',
  // `class` is merged with twMerge below so a `bg-*` class can recolor the
  // track; Vue's own fallthrough would only append it.
  inheritAttrs: false,
  props: {
    value: { type: Number, default: 0 },
    max: { type: Number, default: DefaultMax },
    segments: {
      type: Array as PropType<ProgressBarSegment[]>,
      default: undefined,
    },
    size: {
      type: String as PropType<ProgressBarSize>,
      default: DefaultSize,
    },
    color: {
      type: String as PropType<ProgressBarColor>,
      default: DefaultColor,
    },
    theme: {
      type: String as PropType<ProgressBarTheme>,
      default: DefaultTheme,
    },
    active: { type: Boolean, default: false },
    fillClassName: { type: String, default: undefined },
    valueText: { type: String, default: undefined },
  },
  setup(props) {
    const view = computed(() => buildProgressBarView(props))
    const fills = computed(() =>
      view.value.fills.map((fill) => ({
        key: fill.key,
        class: twMerge(...fill.classes),
        style: { width: `${fill.width}%` },
      })),
    )

    watchEffect(() => {
      if (view.value.hasActiveFill) ensureActiveStyle()
    })

    return { view, fills }
  },
  computed: {
    rootAttrs() {
      const attrs = { ...this.$attrs }
      delete attrs.class
      return attrs
    },
    rootClass(): string {
      return twMerge(this.view.trackClasses, this.$attrs.class as string)
    },
  },
})
</script>

<template>
  <div
    data-cy="progress-bar"
    v-bind="rootAttrs"
    role="progressbar"
    aria-valuemin="0"
    :aria-valuemax="view.max"
    :aria-valuenow="view.now"
    :aria-valuetext="view.valueText"
    :class="rootClass"
  >
    <div
      v-for="fill in fills"
      :key="fill.key"
      data-cy="progress-bar-fill"
      :class="fill.class"
      :style="fill.style"
    />
  </div>
</template>

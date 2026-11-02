<script lang="ts">
import {
  computed,
  defineComponent,
  normalizeClass,
  watchEffect,
  type PropType,
} from 'vue'
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
  // Setup's `attrs` is read rather than `this.$attrs`: only the former is
  // tracked by computed() in production builds.
  setup(props, { attrs }) {
    const view = computed(() =>
      buildProgressBarView({
        ...props,
        valueText:
          props.valueText ?? (attrs['aria-valuetext'] as string | undefined),
      }),
    )
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

    const rootAttrs = computed(() => {
      const rest = { ...attrs }
      delete rest.class
      return rest
    })
    // normalizeClass flattens Vue's object and array class syntax, which
    // twMerge would otherwise drop.
    const rootClass = computed(() =>
      twMerge(view.value.trackClasses, normalizeClass(attrs.class)),
    )

    return { view, fills, rootAttrs, rootClass }
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

<script lang="ts">
import {
  computed,
  defineComponent,
  normalizeClass,
  onMounted,
  watchEffect,
  type PropType,
} from 'vue'
import { twMerge } from 'tailwind-merge'
import {
  buildProgressBarView,
  ensureActiveStyle,
  warnIfUnnamed,
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
  // `$attrs` is read in the template, not in a computed: attrs aren't
  // reactive, but the template re-renders whenever they change.
  setup(props, { attrs }) {
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

    // A one-off check at mount, so it can read setup's non-reactive attrs.
    onMounted(() => {
      warnIfUnnamed(attrs['aria-label'], attrs['aria-labelledby'])
    })

    // normalizeClass flattens Vue's object and array class syntax, which
    // twMerge would otherwise drop.
    const trackClass = (attrClass: unknown) =>
      twMerge(view.value.trackClasses, normalizeClass(attrClass))
    // `valueText` wins over an `aria-valuetext` attribute, which wins over
    // the labelled-segment default.
    const valueTextFor = (attrValueText: unknown) =>
      props.valueText ??
      (attrValueText as string | undefined) ??
      view.value.valueText

    return { view, fills, trackClass, valueTextFor }
  },
})
</script>

<template>
  <div
    data-cy="progress-bar"
    v-bind="{ ...$attrs, class: undefined }"
    role="progressbar"
    aria-valuemin="0"
    :aria-valuemax="view.max"
    :aria-valuenow="view.now"
    :aria-valuetext="valueTextFor($attrs['aria-valuetext'])"
    :class="trackClass($attrs.class)"
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

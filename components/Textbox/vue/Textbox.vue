<script lang="ts">
import { PropType, computed, defineComponent } from 'vue'
import {
  DefaultTheme,
  DefaultVariant,
  DefaultSize,
  CssStaticClasses,
  CssInputSizeClassesTable,
  CssVariantClassesTable,
  CssRoundedClasses,
  CssInputClassesTable,
  CssLabelSizeClassesTable,
  CssLabelThemeClassesTable,
  CssLabelBorderClassesTable,
  CssLabelRoundedClassesTable,
  CssLabelBaseClasses,
  CssIconColorClassesTable,
  DividerClasses,
  CssWrapperHeightClassesTable,
  CssInputContainerPaddingClassesTable,
  CssInputContainerBaseClasses,
  CssShrinkZeroClass,
  type TextboxTheme,
  type TextboxVariant,
  type TextboxSize,
} from '@cypress-design/constants-textbox'

export default defineComponent({
  name: 'Textbox',
  props: {
    theme: {
      type: String as PropType<TextboxTheme>,
      default: DefaultTheme,
    },
    variant: {
      type: String as PropType<TextboxVariant>,
      default: DefaultVariant,
    },
    size: {
      type: String as PropType<TextboxSize>,
      default: DefaultSize,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    labelLeft: {
      type: [String, Object] as PropType<string | unknown>,
    },
    iconLeft: {
      type: [Object, Function] as PropType<unknown>,
    },
    divider: {
      type: Boolean,
      default: false,
    },
    iconRight: {
      type: [Object, Function] as PropType<unknown>,
    },
    labelRight: {
      type: [String, Object] as PropType<string | unknown>,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
    modelValue: {
      type: String,
      default: '',
    },
    value: {
      type: String,
    },
    type: {
      type: String as PropType<
        'text' | 'password' | 'email' | 'search' | 'tel' | 'url'
      >,
      default: 'text',
    },
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    'aria-label': {
      type: String,
    },
    'aria-invalid': {
      type: [Boolean, String] as PropType<
        boolean | 'false' | 'true' | 'grammar' | 'spelling'
      >,
    },
    'aria-describedby': {
      type: String,
    },
  },
  emits: {
    'update:modelValue': (value: string) => typeof value === 'string',
    input: (event: Event) => event instanceof Event,
    focus: (event: FocusEvent) => event instanceof FocusEvent,
    blur: (event: FocusEvent) => event instanceof FocusEvent,
  },
  setup(props, { emit }) {
    // Build variant class key: theme-variant-default
    // Disabled state is handled by CSS has-[:disabled]: pseudo-class
    const variantKey = computed(() => {
      return `${props.theme}-${props.variant}-default` as keyof typeof CssVariantClassesTable
    })

    // Get variant classes
    const variantClasses = computed(() => {
      return CssVariantClassesTable[variantKey.value] || ''
    })

    // Get rounded classes
    const roundedClasses = computed(() => {
      return CssRoundedClasses[
        props.rounded as unknown as keyof typeof CssRoundedClasses
      ]
    })

    // Build wrapper classes
    // Use label element for click-to-focus behavior (no JS needed)
    const wrapperClasses = computed(() => {
      return [
        CssStaticClasses,
        variantClasses.value,
        roundedClasses.value,
        CssWrapperHeightClassesTable[props.size],
      ]
    })

    // Build input container classes
    const inputContainerClasses = computed(() => {
      return [
        CssInputContainerBaseClasses,
        CssInputContainerPaddingClassesTable[props.size],
      ]
    })

    // Get input size classes (font size and line height)
    const inputSizeClasses = computed(() => {
      return CssInputSizeClassesTable[props.size]
    })

    // Build input classes
    const inputClasses = computed(() => {
      return [CssInputClassesTable[props.theme], inputSizeClasses.value]
    })

    // Get icon color classes
    // Disabled state is handled by CSS has-[:disabled]: pseudo-class
    const iconColorKey = computed(() => {
      return `${props.theme}-${props.variant}-default` as keyof typeof CssIconColorClassesTable
    })

    const iconColorClasses = computed(() => {
      return CssIconColorClassesTable[iconColorKey.value]
    })

    // Get divider classes
    const dividerClasses = computed(() => {
      return DividerClasses[props.theme]
    })

    // Determine aria-invalid value
    const ariaInvalidValue = computed(() => {
      if (props['aria-invalid'] !== undefined) {
        return props['aria-invalid']
      }
      return props.variant === 'invalid' ? true : undefined
    })

    // Get aria-label and aria-describedby from props
    const ariaLabel = computed(() => props['aria-label'])
    const ariaDescribedBy = computed(() => props['aria-describedby'])

    // Compute input value: use value prop if provided (uncontrolled), otherwise use modelValue (controlled)
    const inputValue = computed(() => {
      return props.value ?? props.modelValue ?? ''
    })

    // Handle input event
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      const newValue = target.value
      emit('update:modelValue', newValue)
      emit('input', event)
      // Value is automatically tracked via modelValue prop in Vue
    }

    const handleFocus = (event: FocusEvent) => {
      emit('focus', event)
    }

    const handleBlur = (event: FocusEvent) => {
      emit('blur', event)
    }

    return {
      wrapperClasses,
      inputContainerClasses,
      inputClasses,
      iconColorClasses,
      dividerClasses,
      ariaInvalidValue,
      ariaLabel,
      ariaDescribedBy,
      inputValue,
      handleInput,
      handleFocus,
      handleBlur,
      // Label constants for template
      CssLabelBaseClasses,
      CssLabelSizeClassesTable,
      CssLabelThemeClassesTable,
      CssLabelBorderClassesTable,
      CssLabelRoundedClassesTable,
      // Shrink-0 class for template
      CssShrinkZeroClass,
    }
  },
})
</script>

<template>
  <label :class="wrapperClasses">
    <!-- Label Left -->
    <span
      v-if="labelLeft"
      :class="[
        CssLabelBaseClasses,
        CssLabelSizeClassesTable[size],
        CssLabelThemeClassesTable[theme],
        CssLabelBorderClassesTable.left[theme],
        CssLabelRoundedClassesTable.left[rounded ? 'rounded' : 'notRounded'],
      ]"
    >
      {{ labelLeft }}
    </span>

    <!-- Input Container -->
    <div :class="inputContainerClasses">
      <!-- Icon Left -->
      <component
        :is="iconLeft"
        v-if="iconLeft"
        size="16"
        :interactive-colors-on-group="true"
        :class="[iconColorClasses, CssShrinkZeroClass]"
      />

      <!-- Divider -->
      <div
        v-if="divider && iconLeft"
        :class="[dividerClasses, CssShrinkZeroClass]"
      />

      <!-- Input -->
      <input
        :id="id"
        :type="type"
        :class="inputClasses"
        :value="inputValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :name="name"
        :autofocus="autofocus"
        :aria-label="ariaLabel"
        :aria-invalid="ariaInvalidValue"
        :aria-describedby="ariaDescribedBy"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Icon Right -->
      <component
        :is="iconRight"
        v-if="iconRight"
        size="16"
        :interactive-colors-on-group="true"
        :class="[iconColorClasses, CssShrinkZeroClass]"
      />
    </div>

    <!-- Label Right -->
    <span
      v-if="labelRight"
      :class="[
        CssLabelBaseClasses,
        CssLabelSizeClassesTable[size],
        CssLabelThemeClassesTable[theme],
        CssLabelBorderClassesTable.right[theme],
        CssLabelRoundedClassesTable.right[rounded ? 'rounded' : 'notRounded'],
      ]"
    >
      {{ labelRight }}
    </span>
  </label>
</template>

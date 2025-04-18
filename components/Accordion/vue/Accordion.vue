<template>
  <details ref="$details" :open="openState">
    <summary
      ref="$summary"
      :class="[CssClasses.summary, headingClassName ?? CssClasses.summaryColor]"
    >
      <span :class="CssClasses.summaryDiv">
        <span :class="CssClasses.icon">
          <slot name="iconEl">
            <Icon v-if="props.icon" />
          </slot>
        </span>
        <span
          v-if="(props.icon || slots.iconEl) && separator"
          :class="CssClasses.separator"
          role="separator"
        />
        <span class="flex-grow grow pr-[16px]">
          <span
            :class="[
              titleClassName ? titleClassName : CssClasses.summaryTitleColor,
              CssClasses.summaryTitle,
            ]"
          >
            {{ title }}
          </span>
          <span
            v-if="description"
            :class="[
              CssClasses.summaryDescription,
              descriptionClassName ?? CssClasses.summaryDescriptionColor,
            ]"
          >
            {{ description }}
          </span>
        </span>
        <IconChevronDownSmall
          strokeColor="gray-300"
          class="open:icon-dark-gray-500"
          :class="CssClasses.chevron"
        />
      </span>
    </summary>
    <div ref="$content" :class="CssClasses.contentWrapper">
      <!-- @slot expandable body of the collapsible accordion -->
      <slot v-if="fullWidthContent" />
      <div v-else :class="CssClasses.content">
        <slot />
      </div>
    </div>
  </details>
</template>

<script lang="ts" setup>
import {
  FunctionalComponent,
  SVGAttributes,
  onMounted,
  ref,
  toRaw,
  useSlots,
} from 'vue'
import { CssClasses } from '@cypress-design/constants-accordion'
import { DetailsAnimation } from '@cypress-design/details-animation'
import { IconChevronDownSmall } from '@cypress-design/vue-icon'

const slots = useSlots()

const props = defineProps<{
  /**
   * Main indigo title.
   * [NOTE] Its color and font can be customized using `titleClassName`.
   */
  title: string
  /**
   * Second line in the heading.
   */
  description?: string
  /**
   * Icon to be displayed on the left of the the heading. Overridden by the iconEl slot, if one is provided.
   */
  icon?: FunctionalComponent<SVGAttributes>
  /**
   * Should we add a vertical separator between the icon and the text.
   */
  separator?: boolean
  /**
   * Change the font and color of the heading title
   */
  titleClassName?: string
  /**
   * Change the font and color of the heading description
   */
  descriptionClassName?: string
  /**
   * Additional classes to add to the header of the accordion
   * > [NOTE] useful to change the background color of the header
   */
  headingClassName?: string
  /**
   * When using content that needs ti be edge to edge,
   * removes the content wrapper from the content.
   */
  fullWidthContent?: boolean
  open?: boolean
  /**
   * Provides access to the onClick event of the summary element.
   * Allows for custom handling or cancellation of the default behavior.
   */
  onClickSummary?: (event: MouseEvent) => boolean | undefined
  /**
   * Callback triggered when the accordion toggles open or closed.
   * @param open - The new open state of the accordion.
   */
  onToggle?: (open: boolean) => void
}>()

const $content = ref(null)
const $details = ref<HTMLDetailsElement | null>(null)
const $summary = ref<HTMLElement | null>(null)
const openState = ref(props.open ?? false)

onMounted(function () {
  if ($details.value && $content.value) {
    new DetailsAnimation($details.value, $content.value)
  }

  if ($details.value) {
    $details.value.addEventListener('toggle', handleToggle)
  }

  if ($summary.value) {
    $summary.value.addEventListener('click', handleSummaryClick, {
      capture: true,
    })
  }
})

const Icon = toRaw(props.icon)

function handleSummaryClick(event: MouseEvent) {
  if (props.onClickSummary) {
    const result = props.onClickSummary(event)
    if (result === false) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
  }

  openState.value = !openState.value
  if (props.onToggle) {
    props.onToggle(openState.value)
  }
}

function handleToggle() {
  openState.value = $details.value?.open ?? false
  if (props.onToggle) {
    props.onToggle(openState.value)
  }
}
</script>

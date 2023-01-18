<template>
  <details ref="details">
    <summary
      :class="[CssClasses.summary, headingClassName ?? CssClasses.summaryColor]"
    >
      <div :class="CssClasses.summaryDiv">
        <span :class="CssClasses.icon">
          <slot name="iconEl">
            <Icon />
          </slot>
        </span>
        <hr
          v-if="(props.icon || slots.iconEl) && separator"
          :class="CssClasses.separator"
        />
        <div class="flex-grow pr-16px">
          <div
            :class="[
              titleClassName ? titleClassName : CssClasses.summaryTitleColor,
              CssClasses.summaryTitle,
            ]"
          >
            {{ title }}
          </div>
          <div
            v-if="description"
            :class="[
              CssClasses.summaryDescription,
              descriptionClassName ?? CssClasses.summaryDescriptionColor,
            ]"
          >
            {{ description }}
          </div>
        </div>
        <IconChevronDownSmall
          strokeColor="gray-300"
          class="open:icon-dark-gray-500"
          :class="CssClasses.chevron"
        />
      </div>
    </summary>
    <div ref="content" :class="CssClasses.contentWrapper">
      <!-- @slot expandable body of the collapsible accordion -->
      <slot v-if="fullWidthContent" />
      <div v-else :class="CssClasses.content">
        <slot />
      </div>
    </div>
  </details>
</template>

<script lang="ts" setup>
import { CssClasses } from '../constants'
import { DetailsAnimation } from '@cypress-design/details-animation'
import { IconChevronDownSmall } from '@cypress-design/vue-icon'
import {
  FunctionalComponent,
  SVGAttributes,
  onMounted,
  ref,
  useSlots,
} from 'vue'

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
}>()

const content = ref(null)
const details = ref(null)

onMounted(function () {
  if (details.value && content.value) {
    new DetailsAnimation(details.value, content.value)
  }
})

const Icon = props.icon
</script>

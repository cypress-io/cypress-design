<template>
  <details ref="details">
    <summary class="flex items-center" :class="CssClasses.summary">
      <Icon v-if="props.icon" :class="CssClasses.icon" />
      <hr v-if="props.icon && separator" :class="CssClasses.separator" />
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
            descriptionClassName
              ? descriptionClassName
              : CssClasses.summaryDescriptionColor,
            CssClasses.summaryDescription,
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
import { FunctionalComponent, onMounted, ref, SVGAttributes } from 'vue'

const props = defineProps<{
  /**
   * Main indigo title.
   * [NOTE] It's color and font can be customized using `titleClassName`.
   */
  title: string
  /**
   * Second line in the heading.
   */
  description?: string
  /**
   * Icon to be displayed on the left of the the heading.
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

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
      <slot v-if="fullWidthContent" />
      <div v-else :class="CssClasses.content">
        <slot />
      </div>
    </div>
  </details>
</template>

<script lang="ts" setup>
import { AccordionProps, CssClasses } from '../constants'
import { AccordionAnimation } from '../accordion-animation'
import { IconChevronDownSmall } from '@cypress-design/vue-icon'
import { FunctionalComponent, onMounted, ref, SVGAttributes } from 'vue'

export interface AccordionPropsVue extends AccordionProps {
  title: string
  description?: string
  separator?: boolean
  titleClassName?: string
  descriptionClassName?: string
  icon?: FunctionalComponent<SVGAttributes>
  fullWidthContent?: boolean
}

const props = defineProps<AccordionPropsVue>()

const content = ref(null)
const details = ref(null)

onMounted(function () {
  if (details.value && content.value) {
    new AccordionAnimation(details.value, content.value)
  }
})

const Icon = props.icon
</script>

<script lang="ts" setup>
import { Tab, variants } from '@cypress-design/constants-tabs'

type ValueOf<T> = T[keyof T]

defineProps<{
  tab: Tab
  activeId: string | undefined
  classes: ValueOf<typeof variants>['classes']
  iconProps: ValueOf<typeof variants>['icon']
  activeMarkerStyle: boolean
}>()

const emit = defineEmits<{
  (event: 'back'): void
  (event: 'forward'): void
  (event: 'click', e: MouseEvent): void
}>()
</script>

<template>
  <component
    :key="tab.id"
    :is="tab.href ? 'a' : 'button'"
    :href="tab.href"
    ref="$tab"
    role="tab"
    :tabindex="tab.id === activeId ? undefined : -1"
    :aria-selected="tab.id === activeId ? true : undefined"
    :class="[
      classes.button,
      {
        [classes.activeStatic]: tab.id === activeId && !activeMarkerStyle,
        [classes.active]: tab.id === activeId,
        [classes.inActive]: tab.id !== activeId,
      },
    ]"
    @click="(e: MouseEvent) => emit('click', e)"
    @keyup.left="emit('back')"
    @keyup.right="emit('forward')"
  >
    <component
      v-if="tab.iconBefore ?? tab.icon"
      :is="tab.iconBefore ?? tab.icon"
      v-bind="iconProps"
      class="mr-[8px]"
    />
    {{ tab.label }}
    <div v-if="tab.tag" :class="classes.tag">{{ tab.tag }}</div>
    <component
      v-if="tab.iconAfter"
      :is="tab.iconAfter"
      v-bind="iconProps"
      class="ml-[8px]"
    />
    <div
      v-if="tab.id === activeId && !activeMarkerStyle"
      :class="classes.activeMarkerStatic"
    />
  </component>
</template>

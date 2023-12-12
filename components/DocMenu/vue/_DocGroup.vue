<script lang="ts" setup>
import { computed, type DefineComponent, ref, watch, inject } from 'vue'
import { IconChevronDownSmall } from '@cypress-design/vue-icon'
import { NavGroup, classes } from '@cypress-design/constants-docmenu'
import DocGroupElements from './_DocGroupElements.vue'

const props = withDefaults(
  defineProps<{
    group: NavGroup
    activePath?: string
    collapsible: boolean
    linkComponent: DefineComponent | 'a'
    depth?: number
  }>(),
  {
    depth: 0,
  },
)

const open = ref(props.group.collapsed !== true)
const $groupElements = ref<typeof DocGroupElements>()
const $listWrapper = ref<HTMLDivElement>()

const Head = computed(() =>
  props.collapsible ? 'button' : props.group.href ? 'a' : 'div',
)

const emit = defineEmits<{
  (event: 'updateActivePosition', opts?: { top: number; height: number }): void
  (event: 'hideMarker'): void
  (event: 'updateMarkerPosition'): void
}>()

function hasActiveItemRecursively(items = props.group.items): boolean {
  return items.some((item) => {
    if ('items' in item) {
      return hasActiveItemRecursively(item.items)
    }
    return item.href === props.activePath
  })
}

function reTriggerSetActiveGroup() {
  $groupElements.value?.reTriggerSetActiveGroup()
}

const active = computed(() => props.group.href === props.activePath)

const markerIsMoving = inject('transition-is-moving', ref(false))

watch(open, () => {
  $listWrapper.value?.addEventListener(
    'transitionend',
    () => {
      markerIsMoving.value = false
      if (open.value || !hasActiveItemRecursively()) {
        emit('updateMarkerPosition')
      }
    },
    { once: true },
  )
})

watch(active, (active) => {
  if (active) {
    emit('hideMarker')
  }
})

watch(open, async (open) => {
  if (hasActiveItemRecursively()) {
    if (open) {
      reTriggerSetActiveGroup()
    } else {
      emit('hideMarker')
    }
  } else {
    emit('updateMarkerPosition')
  }
})

defineExpose({
  reTriggerSetActiveGroup,
})
</script>

<template>
  <component
    :is="Head"
    :class="[
      classes.button,
      {
        [classes.topButton]: depth === 0,
        [classes.leafButton]: depth,
        'text-indigo-500': active,
        'text-gray-900 dark:text-gray-200': !active && depth === 0,
        'text-gray-700 dark:text-gray-500': !active && depth >= 0,
      },
    ]"
    :href="group.href"
    @click="
      () => {
        if (collapsible) {
          open = !open
        } else {
          emit('updateActivePosition')
        }
      }
    "
  >
    <IconChevronDownSmall
      v-if="props.collapsible"
      stroke-color="current"
      :size="depth ? '8' : '16'"
      :class="[
        classes.expandedIcon,
        {
          'rotate-0': open,
          '-rotate-90': !open,
          'ml-[28px]': depth,
        },
      ]"
    />
    {{ group.label }}
  </component>
  <div
    class="grid transition-all relative"
    ref="$listWrapper"
    :class="{
      'grid-rows-[0fr]': !open && collapsible,
      'grid-rows-[1fr]': open || !collapsible,
    }"
  >
    <div
      v-if="open && collapsible && depth === 0"
      :class="classes.openListBorderLeft"
    />
    <DocGroupElements
      ref="$groupElements"
      class="overflow-hidden"
      :depth="depth"
      :items="group.items"
      :active-path="activePath"
      :collapsible="collapsible"
      :link-component="linkComponent"
      @hide-marker="emit('hideMarker')"
      @update-marker-position="() => emit('updateMarkerPosition')"
      @update-active-position="(opts) => emit('updateActivePosition', opts)"
    />
  </div>
</template>

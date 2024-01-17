<script lang="ts" setup>
import { computed, type DefineComponent, ref, watch, inject } from 'vue'
import { IconChevronDownSmall } from '@cypress-design/vue-icon'
import { NavGroup, classes } from '@cypress-design/constants-docmenu'
import DocGroupElements, {
  hasActiveItemRecursively,
  type DocGroupEventsEmitted,
} from './_DocGroupElements.vue'

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

const emit = defineEmits<DocGroupEventsEmitted>()

const hasActiveItem = computed(() =>
  props.group.items.some((item) => {
    if ('items' in item) {
      return hasActiveItemRecursively(item.items, props.activePath)
    }
    return item.href === props.activePath
  }),
)

function reTriggerSetActiveGroup() {
  $groupElements.value?.reTriggerSetActiveGroup()
}

const active = computed(() => props.group.href === props.activePath)

const markerIsMoving = inject('transition-is-moving', ref(false))

watch(active, (active) => {
  if (active) {
    emit('hideMarker')
  }
})

watch(open, (open) => {
  if (hasActiveItem.value) {
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
        'text-indigo-500 dark:text-indigo-400': active,
        'text-gray-900 dark:text-gray-100': hasActiveItem && !active,
        'text-gray-800 dark:text-gray-200': !hasActiveItem && !active,
      },
    ]"
    :style="{
      paddingLeft: depth >= 1 ? `${(depth - 1) * 12 + 48}px` : undefined,
    }"
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
        },
      ]"
      :style="{
        marginLeft: depth >= 1 ? `${(depth - 1) * 12 + 28}px` : undefined,
      }"
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
    @transitionstart="
      () => {
        markerIsMoving = true
      }
    "
    @transitionend="
      () => {
        markerIsMoving = false
        if (open || !hasActiveItem) {
          emit('updateMarkerPosition')
        }
      }
    "
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
      @update-active-position="
        (opts) => (open ? emit('updateActivePosition', opts) : null)
      "
    />
  </div>
</template>

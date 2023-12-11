<script lang="ts" setup>
import { computed, type DefineComponent, ref, watch } from 'vue'
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
      stroke-color="gray-400"
      :size="depth ? '8' : '16'"
      :class="[
        classes.expandedIcon,
        {
          'rotate-0': open,
          '-rotate-90': !open,
          'ml-[16px]': depth,
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
      class="absolute left-[8px] top-0 w-[1px] h-full bg-gray-100"
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
      @update-marker-position="(m) => emit('updateMarkerPosition')"
      @update-active-position="(opts) => emit('updateActivePosition', opts)"
    />
  </div>
</template>

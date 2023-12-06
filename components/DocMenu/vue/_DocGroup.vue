<script lang="ts" setup>
import { computed, type DefineComponent, ref, watch, nextTick } from 'vue'
import { IconChevronDownSmall } from '@cypress-design/vue-icon'
import { NavGroup, classes } from '@cypress-design/constants-docmenu'
import DocLink from './_DocLink.vue'
import DocGroup from './_DocGroup.vue'

const props = withDefaults(
  defineProps<{
    group: NavGroup
    activePath: string
    collapsible: boolean
    linkComponent: DefineComponent | 'a'
    depth?: number
  }>(),
  {
    depth: 0,
  },
)

const open = ref(props.group.collapsed !== true)
const $items = ref<(typeof DocLink)[]>([])
const $groups = ref<(typeof DocGroup)[]>([])

const Head = computed(() =>
  props.collapsible ? 'button' : props.group.href ? 'a' : 'div',
)

const emit = defineEmits<{
  (event: 'updateActivePosition', opts?: { top: number; height: number }): void
  (event: 'hideMarker'): void
  (event: 'updateMarkerPosition'): void
}>()

function reTriggerSetActiveGroup() {
  $items.value.forEach((item) => {
    item.setActiveMarkerPosition()
  })
}

function hasActiveItemRecursively(items = props.group.items): boolean {
  return items.some((item) => {
    if ('items' in item) {
      return hasActiveItemRecursively(item.items)
    }
    return item.href === props.activePath
  })
}

const active = computed(() => props.group.href === props.activePath)

watch(active, (active) => {
  if (active) {
    emit('hideMarker')
  }
})

watch(open, async (open) => {
  await nextTick()
  if (hasActiveItemRecursively()) {
    if (open) {
      reTriggerSetActiveGroup()
      $groups.value.forEach((group) => {
        group.reTriggerSetActiveGroup()
      })
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
      class="absolute left-0 transform transition-transform"
      :class="{
        'rotate-0': open,
        '-rotate-90': !open,
        'ml-[16px]': depth,
      }"
    />
    {{ group.label }}
  </component>
  <ul
    v-show="open"
    class="list-none p-0 ml-[7.5px]"
    :class="{
      'border-l border-gray-100': depth === 0 && props.collapsible,
    }"
  >
    <template v-for="item in group.items">
      <li class="relative list-none p-0" v-if="item && 'items' in item">
        <DocGroup
          ref="$groups"
          :activePath="activePath"
          :group="item"
          :depth="depth + 1"
          :collapsible="props.collapsible"
          :link-component="props.linkComponent"
          @update-active-position="
            (opts) => {
              emit('updateActivePosition', opts)
            }
          "
          @update-marker-position="
            () => {
              if (hasActiveItemRecursively()) {
                reTriggerSetActiveGroup()
              } else {
                emit('updateMarkerPosition')
              }
            }
          "
        />
      </li>
      <DocLink
        v-else
        ref="$items"
        :item="item"
        :active="item.href === activePath"
        :depth="depth"
        :collapsible="collapsible"
        :link-component="props.linkComponent"
        @update:active="
          (_, opts) => {
            if (!opts) return
            emit('updateActivePosition', opts)
          }
        "
      />
    </template>
  </ul>
</template>

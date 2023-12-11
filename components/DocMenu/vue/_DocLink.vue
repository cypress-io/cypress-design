<script lang="ts" setup>
import { watch, type DefineComponent, ref, onMounted, inject } from 'vue'
import type { NavItemLink } from '@cypress-design/constants-docmenu'

const props = withDefaults(
  defineProps<{
    item: NavItemLink
    active: boolean
    collapsible: boolean
    depth?: number
    linkComponent: DefineComponent | 'a'
  }>(),
  {
    depth: -1,
  },
)

const emit = defineEmits<{
  (
    event: 'update:active',
    active: boolean,
    opts?: { top: number; height: number },
  ): void
}>()

const $container = ref<HTMLLIElement>()

const markerIsMoving = inject('transition-is-moving', ref(false))

function setActiveMarkerPosition() {
  if (props.active) {
    const { top = 0, height = 36 } =
      $container.value?.getBoundingClientRect() ?? {}

    markerIsMoving.value = true

    emit('update:active', props.active, {
      top,
      height,
    })
  }
}

onMounted(() => {
  watch(
    () => props.active,
    (active) => {
      if (active) {
        setActiveMarkerPosition()
      } else {
        emit('update:active', active)
      }
    },
    { immediate: true },
  )
})

defineExpose({
  setActiveMarkerPosition,
})
</script>

<template>
  <li ref="$container" class="list-none p-0">
    <component
      :is="linkComponent"
      class="group relative block w-full pl-[24px] box-border"
      :class="{
        'text-indigo-500': active,
        'py-[8px] text-[16px] leading-[24px]': depth < 0,
        'leading-[20px] text-[14px] py-[12px]': depth >= 0,
      }"
      :style="{
        paddingLeft: depth >= 0 ? `${depth * 12 + 32}px` : undefined,
      }"
      :href="item.href"
    >
      <div
        v-if="depth >= 0"
        class="left-[6.5px] absolute top-[4px] bottom-[4px] w-[4px] z-10 rounded-full"
        :class="{
          hidden: !active || !markerIsMoving,
          'group-hover:block bg-gray-300': !active && collapsible,
          'block bg-indigo-500': active && markerIsMoving,
        }"
      />
      {{ item.label }}
    </component>
  </li>
</template>

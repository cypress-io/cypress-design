<script lang="ts" setup>
import {
  watch,
  type DefineComponent,
  ref,
  onMounted,
  inject,
  nextTick,
  computed,
} from 'vue'
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
    nextTick(() => {
      const { top = 0, height = 36 } =
        $container.value?.getBoundingClientRect() ?? {}

      emit('update:active', props.active, {
        top,
        height,
      })
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

watch(
  () => props.active,
  (active) => {
    setTimeout(() => {
      if (active && $container.value) {
        // if active check if the item is visible in the
        // viewport and scrollIntoView if not
        const rect = $container.value.getBoundingClientRect()

        if (
          rect.top > 0 &&
          rect.bottom < window.innerHeight &&
          rect.left > 0 &&
          rect.right < window.innerWidth
        ) {
          return
        }

        $container.value.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        })
      }
    }, 200)
  },
)

const itemWithoutLabel = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, ...rest } = props.item
  return rest
})
</script>

<template>
  <li ref="$container" class="list-none p-0 scroll-my-10">
    <component
      :is="linkComponent"
      v-bind="itemWithoutLabel"
      class="group relative block w-full pl-[24px]"
      :class="{
        'text-indigo-500 dark:text-indigo-400': active,
        'text-gray-700 dark:text-gray-500': !active,
        'py-[8px] text-[16px] leading-[24px]': depth < 0,
        'leading-[20px] text-[14px] py-[12px]': depth >= 0,
      }"
      :style="{
        paddingLeft: depth >= 0 ? `${depth * 12 + 48}px` : undefined,
      }"
    >
      <div
        v-if="depth >= 0"
        class="left-[6.5px] absolute top-[4px] bottom-[4px] w-[4px] z-10 rounded-full"
        :class="{
          hidden: !markerIsMoving || !active,
          'group-hover:block bg-gray-300': !active && collapsible,
          'bg-indigo-500': active && markerIsMoving,
        }"
      />
      {{ item.label }}
    </component>
  </li>
</template>

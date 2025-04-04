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
import { type NavItemLink, CssLink } from '@cypress-design/constants-docmenu'

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
  <li ref="$container" :class="CssLink.wrapper">
    <component
      :is="linkComponent"
      v-bind="itemWithoutLabel"
      :class="[
        CssLink.static,
        {
          [CssLink.active]: active,
          [CssLink.inactive]: !active,
          [CssLink.negativeDepth]: depth < 0,
          [CssLink.positiveDepth]: depth >= 0,
        },
      ]"
      :style="{
        paddingLeft: depth >= 0 ? `${depth * 12 + 48}px` : undefined,
      }"
    >
      <div
        v-if="depth >= 0"
        :class="[
          CssLink.markerStatic,
          {
            hidden: !markerIsMoving || !active,
            'group-hover:block bg-gray-300': !active && collapsible,
            'bg-indigo-500': active && markerIsMoving,
          },
        ]"
      />
      {{ item.label }}
    </component>
  </li>
</template>

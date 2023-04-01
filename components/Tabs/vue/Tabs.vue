<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { Tab, classesMap } from '../constants'

const props = withDefaults(
  defineProps<{
    tabs: Tab[]
    type?: keyof typeof classesMap
  }>(),
  {
    type: 'default',
  }
)

const $tab = ref<HTMLButtonElement[]>()

const emit = defineEmits<{
  (event: 'change', tab: Tab): void
}>()

const activeId = ref(props.tabs.find((tab) => tab.active)?.id)

const activeMarkerStyle = ref({
  left: '0',
  width: '30px',
  transitionProperty: 'none',
})

onMounted(() => {
  watch(
    activeId,
    (id) => {
      const activeIndex = props.tabs.findIndex((tab) => tab.id === id)
      if (activeIndex > -1) {
        const activeTab = $tab.value?.[activeIndex]
        if (activeTab) {
          activeMarkerStyle.value = {
            ...activeMarkerStyle.value,
            left: `${activeTab.offsetLeft}px`,
            width: `${activeTab.offsetWidth}px`,
          }
        }
      }
    },
    { immediate: true }
  )

  // Only start animation after the first render
  setTimeout(() => {
    activeMarkerStyle.value = {
      ...activeMarkerStyle.value,
      transitionProperty: 'all',
    }
  }, 10)
})

function navigate(shift: number) {
  const shiftedIndex =
    props.tabs.findIndex((tab) => tab.id === activeId.value) + shift
  const nextIndex =
    shiftedIndex < 0
      ? props.tabs.length - 1
      : shiftedIndex >= props.tabs.length
      ? 0
      : shiftedIndex
  activeId.value = props.tabs[nextIndex].id
  $tab.value?.[nextIndex]?.focus()
  emit('change', props.tabs[nextIndex])
}

const classes = computed(() => {
  if (props.type in classesMap) {
    return classesMap[props.type]
  }
  return classesMap.default
})
</script>

<template>
  <div role="tablist" :class="classes.wrapper">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      ref="$tab"
      role="tab"
      :tabindex="tab.id === activeId ? undefined : -1"
      :class="[
        classes.button,
        {
          [classes.active]: tab.id === activeId,
          [classes.inActive]: tab.id !== activeId,
        },
      ]"
      @click="
        () => {
          activeId = tab.id
          emit('change', tab)
        }
      "
      @keyup.left="navigate(-1)"
      @keyup.right="navigate(1)"
    >
      <component
        v-if="tab.iconBefore ?? tab.icon"
        :is="tab.iconBefore ?? tab.icon"
        class="mr-[8px]"
        :size="props.type === 'underline-large' ? '24' : '16'"
      />
      {{ tab.label }}
      <div v-if="tab.tag" :class="classes.tag">{{ tab.tag }}</div>
      <component
        v-if="tab.iconAfter"
        :is="tab.iconAfter"
        class="ml-[8px]"
        :size="props.type === 'underline-large' ? '24' : '16'"
      />
    </button>
    <div
      :class="[classes.activeMarker, classes.activeMarkerColor]"
      :style="activeMarkerStyle"
    />
    <div
      :class="[classes.activeMarker, classes.activeMarkerBlender]"
      :style="activeMarkerStyle"
    />
  </div>
</template>
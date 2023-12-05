<script lang="ts" setup>
import { computed, type DefineComponent, ref } from 'vue'
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

const Head = computed(() => (props.collapsible ? 'button' : 'div'))
</script>

<template>
  <component
    :is="Head"
    :class="[
      classes.button,
      {
        [classes.topButton]: depth === 0,
        [classes.leafButton]: depth,
      },
    ]"
    :href="props.group.href"
    @click="
      () => {
        if (collapsible) {
          open = !open
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
        />
      </li>
      <DocLink
        v-else
        :item="item"
        :active="item.href === activePath"
        :depth="depth"
        :collapsible="collapsible"
        :link-component="props.linkComponent"
      />
    </template>
  </ul>
</template>

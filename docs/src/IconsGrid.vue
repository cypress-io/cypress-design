<script lang="ts" setup>
import { ref, computed } from 'vue'
import { iconsMetadata } from '@cypress-design/icon-registry'
import IconButton from './IconButton.vue'
import AnimatedIcons from './AnimatedIcons.vue'

type IconMeta = (typeof iconsMetadata)[keyof typeof iconsMetadata]

const search = ref('')
const $searchInput = ref<HTMLInputElement>()

const anyIconFound = computed(() => {
  return Object.keys(iconsMetadata).some((iconName) =>
    iconName.includes(search.value),
  )
})

const groupedIconsMetadata = computed(() =>
  Object.entries(iconsMetadata).reduce(
    (acc, [iconName, iconMeta]) => {
      if (search.value && !iconName.includes(search.value)) return acc
      const iconGroup = iconName.split('-')[0]
      if (!acc[iconGroup]) {
        acc[iconGroup] = {} as Record<keyof typeof iconsMetadata, IconMeta>
      }
      acc[iconGroup][iconName as keyof typeof iconsMetadata] = iconMeta
      return acc
    },
    {} as Record<string, Record<keyof typeof iconsMetadata, IconMeta>>,
  ),
)
</script>

<template>
  <div class="relative my-6 rounded bg-gray-50 p-4">
    <input
      ref="$searchInput"
      v-model="search"
      type="search"
      placeholder="Search Icons"
      class="mb-4 block w-full rounded border-2 border-solid border-gray-200 bg-white px-2 py-1 focus:border-indigo-300"
    />
    <div v-if="!anyIconFound">
      <p class="text-center text-gray-500">No icons found</p>
    </div>
    <div
      v-for="(icons, groupName) of groupedIconsMetadata"
      class="mb-4 bg-white py-4"
    >
      <h2 :id="groupName" class="!mb-4 !mt-0 text-center text-2xl capitalize">
        {{ groupName }}
        <a class="header-anchor absolute ml-2" :href="`#${groupName}`"
          >&ZeroWidthSpace;</a
        >
      </h2>
      <div
        class="flex"
        :class="{
          'max-w-full flex-wrap gap-4 px-6': !search.length,
          'flex-col items-start gap-2': search.length,
        }"
      >
        <IconButton
          v-for="(meta, iconName) of icons"
          :key="iconName"
          :iconName="iconName"
          :meta="meta"
          :groupName="groupName"
          :focused="!!search.length"
        />
      </div>
    </div>
  </div>
  <AnimatedIcons />
</template>

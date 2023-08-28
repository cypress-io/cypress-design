<script lang="ts" setup>
import { ref, computed } from 'vue'
import { iconsMetadata } from '@cypress-design/icon-registry'
import IconButton from './IconButton.vue'

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
        acc[iconGroup] = {} as Record<keyof typeof iconsMetadata, any>
      }
      acc[iconGroup][iconName as keyof typeof iconsMetadata] = iconMeta
      return acc
    },
    {} as Record<string, Record<keyof typeof iconsMetadata, any>>,
  ),
)
</script>

<template>
  <div class="bg-gray-50 rounded p-[16px] my-[24px] relative">
    <input
      ref="$searchInput"
      type="search"
      v-model="search"
      placeholder="Search Icons"
      class="w-full border-solid border-2 block mb-[16px] px-[8px] py-[4px] border-gray-200 focus:border-indigo-300 rounded bg-white"
    />
    <div v-if="!anyIconFound">
      <p class="text-center text-gray-500">No icons found</p>
    </div>
    <div
      v-for="(icons, groupName) of groupedIconsMetadata"
      class="bg-white py-[16px] mb-[16px]"
    >
      <h2
        :id="groupName"
        class="text-[24px] text-center !mb-4 !mt-0 capitalize"
      >
        {{ groupName }}
        <a class="header-anchor absolute ml-[8px]" :href="`#${groupName}`"
          >&ZeroWidthSpace;</a
        >
      </h2>
      <div
        class="flex"
        :class="{
          'max-w-full flex-wrap px-[24px] gap-[16px]': !search.length,
          'flex-col items-start gap-[8px]': search.length,
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
</template>

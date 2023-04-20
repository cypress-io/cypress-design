<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'
import { iconsMetadata } from '@cypress-design/icon-registry'
import Icon from '@cypress-design/vue-icon'
import _ from 'lodash'
import CopyButton from './CopyButton.vue'

const IconAny = Icon as any

const { upperFirst, camelCase } = _

const search = ref('')
const $searchInput = ref<HTMLInputElement>()

const groupedIconsMetadata = computed(() =>
  Object.entries(iconsMetadata).reduce((acc, [iconName, iconMeta]) => {
    if (search.value && !iconName.includes(search.value)) return acc
    const iconGroup = iconName.split('-')[0]
    if (!acc[iconGroup]) {
      acc[iconGroup] = {} as Record<keyof typeof iconsMetadata, any>
    }
    acc[iconGroup][iconName as keyof typeof iconsMetadata] = iconMeta
    return acc
  }, {} as Record<string, Record<keyof typeof iconsMetadata, any>>)
)
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-800 rounded p-[16px] my-[24px] relative">
    <input
      ref="$searchInput"
      type="search"
      v-model="search"
      placeholder="Search Icons"
      class="w-full border-solid border-2 block mb-[16px] px-[8px] py-[4px] border-gray-200 focus:border-indigo-300 rounded bg-white dark:bg-gray-900"
    />
    <div
      v-for="(icons, groupName) of groupedIconsMetadata"
      class="bg-white py-[16px] dark:bg-gray-900 mb-[16px]"
    >
      <h2
        :id="groupName"
        class="text-[24px] text-center mb-[16px] !mt-0 capitalize"
      >
        {{ groupName }}
        <a class="header-anchor absolute ml-[8px]" :href="`#${groupName}`"
          >&ZeroWidthSpace;</a
        >
      </h2>
      <div
        class="flex"
        :class="{
          'max-w-full flex-wrap px-[24px] gap-x-[16px]': !search.length,
          'flex-col items-start': search.length,
        }"
      >
        <div
          v-for="(meta, iconName) of icons"
          :key="iconName"
          class="mt-[16px] gap-x-[16px] flex flex-wrap items-end mx-auto overflow-hidden bg-indigo-50 dark:bg-gray-800"
          :class="{
            'w-[calc(100%-32px)] mx-[16px] px-[8px] pb-[4px] rounded lg:w-[600px] md:flex-nowrap justify-end md:justify-start':
              search.length,
            'rounded py-[8px] justify-center': !search.length,
          }"
        >
          <p
            class="text-[16px] flex-shrink-0 overflow-hidden whitespace-nowrap overflow-hidden py-[4px]"
            :class="{
              'w-full text-left md:text-right md:w-[250px]': search.length,
              hidden: !search.length,
            }"
          >
            <span
              class="flex items-center justify-end mb-[8px] gap-x-[8px] group"
              ><CopyButton :text="iconName" />{{ iconName }}</span
            >
            <span class="flex items-center justify-end gap-x-[8px] group"
              ><CopyButton
                :text="`&lt;Icon${upperFirst(camelCase(iconName))}/&gt;`"
              />&lt;Icon{{ upperFirst(camelCase(iconName)) }} /&gt;</span
            >
          </p>
          <div
            v-for="size in meta.availableSizes"
            :key="size"
            class="flex gap-[8px] items-end group"
          >
            <div
              class="py-[4px] min-w-[32px] flex flex-col items-center gap-x-[16px] gap-y-[4px] justify-end"
              :class="{
                'pl-[4px] border-l border-gray-300': search.length,
                'px-[8px] md:px-[4px] md:w-[164px]': !search.length,
              }"
            >
              <IconAny :name="iconName" :size="size" />
              <button
                v-if="!search.length"
                class="text-indigo-500 inline text-[12px] invisible group-hover:visible"
                @click="
                  () => {
                    $searchInput?.focus()
                    search = iconName
                  }
                "
              >
                focus
              </button>
              <p class="text-gray-500 text-[12px]">
                <span v-if="!search.length">{{
                  iconName.slice(groupName.length + 1)
                }}</span>
                {{ size }}
              </p>
            </div>
            <div
              v-if="search.length"
              :key="`${iconName}_${size}`"
              class="text-center text-teal-500"
            >
              <div
                v-if="meta.hasStrokeColor && meta.hasStrokeColor.includes(size)"
              >
                s
              </div>
              <div v-if="meta.hasFillColor && meta.hasFillColor.includes(size)">
                f
              </div>
              <div
                v-if="
                  meta.hasSecondaryStrokeColor &&
                  meta.hasSecondaryStrokeColor.includes(size)
                "
              >
                s+
              </div>
              <div
                v-if="
                  meta.hasSecondaryFillColor &&
                  meta.hasSecondaryFillColor.includes(size)
                "
              >
                f+
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

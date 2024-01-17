<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, Ref, watch } from 'vue'
import { onContentUpdated } from 'vitepress'
import DocMenu, { NavGroup, NavItemLink } from '@cypress-design/vue-docmenu'
import { getHeaders } from '../utils/outline'
import {} from 'fs'

type NavItem = NavGroup | NavItemLink

const headers = ref<NavItem[]>([])

function update() {
  headers.value = getHeaders([2, 3])
  nextTick(() => {
    setActiveHeader()
  })
}

onContentUpdated(update)

function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeoutId: NodeJS.Timeout
  let called = false

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    if (!called) {
      fn()
      called = true
      setTimeout(() => {
        called = false
      }, delay)
    } else {
      timeoutId = setTimeout(fn, delay)
    }
  }
}

const activeId = ref<string | null>(null)

function setActiveHeader() {
  const allHeadings = Array.from(document.querySelectorAll('main h2,main h3'))

  // get the first heading on the visible viewPort
  const closestHeading = allHeadings.find((heading) => {
    const rect = heading.getBoundingClientRect()
    return rect.top > 70 && rect.top < window.innerHeight
  })

  if (closestHeading) {
    activeId.value = closestHeading?.id ?? null
    return
  }

  // if no heading is found, get the last heading before the visible viewPort
  const lastHeading = allHeadings.reverse().find((heading) => {
    const rect = heading.getBoundingClientRect()
    return rect.top < 70
  })

  activeId.value = lastHeading?.id ?? null
}

const handleScroll = throttleAndDebounce(setActiveHeader, 100)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

defineExpose({
  update,
})
</script>

<template>
  <div
    v-if="headers.length"
    class="fixed top-[72px] mt-[48px] bottom-0 overflow-auto right-0 w-[300px] border-solid border-l border-gray-1000/[.07]"
  >
    <header
      class="ml-[32px] uppercase text-gray-500 mt-0 mb-[8px] text-[14px] leading-[20px]"
    >
      Contents
    </header>
    <DocMenu
      class="ml-[8px]"
      :items="headers"
      :active-path="`#${activeId}`"
      :collapsible="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, Ref, watch } from 'vue'
import { onContentUpdated } from 'vitepress'
import DocMenu, { NavGroup, NavItemLink } from '@cypress-design/vue-docmenu'
import { getHeaders } from '../utils/outline'
import {} from 'fs'

type NavItems = (NavGroup | NavItemLink)[]

const headers = ref<NavItems>([])

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

function setHeaderActiveStatus(headers: Ref<NavItems>, activeHref: string) {
  headers.value.forEach((header) => {
    if ('items' in header) {
      header.items.forEach((item) => {
        if ('href' in item) {
          item.active = item.href === activeHref
        }
      })
    } else {
      header.active = header.href === activeHref
    }
  })
}

function setActiveHeader() {
  const allHeadings = Array.from(document.querySelectorAll('main h2,main h3'))

  // get all html heading elements visible in the current viewport
  const visibleHeadings = allHeadings.filter((el) => {
    const rect = el.getBoundingClientRect()
    return rect.top >= 0 && rect.bottom <= window.innerHeight
  })

  // if there are visible headings, they are all active
  if (visibleHeadings.length) {
    headers.value.forEach((header) => {
      if ('items' in header) {
        header.items.forEach((item) => {
          if ('href' in item) {
            item.active = visibleHeadings.some(
              (heading) => `#${heading.id}` === item.href
            )
          }
        })
      } else {
        header.active = visibleHeadings.some(
          (heading) => `#${heading.id}` === header.href
        )
      }
    })
    return
  }

  // if there are no visible headings,
  // take the one with the smallest distance to the viewport
  const closestHeading = allHeadings.reduce(
    (acc, heading) => {
      const rect = heading.getBoundingClientRect()
      if (rect.top < 0 && rect.top > acc.distance) {
        return { distance: rect.top, heading }
      }
      return acc
    },
    { distance: -Infinity, heading: null } as { distance: number; heading: any }
  )

  const activeId = closestHeading.heading?.id

  // set the active state of the heading we found
  setHeaderActiveStatus(headers, `#${activeId}`)
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
    class="fixed top-[72px] mt-[48px] border-solid border-l border-gray-1000/07"
  >
    <header
      class="ml-[32px] uppercase text-gray-500 mt-0 mb-[8px] text-[14px] leading-[20px]"
    >
      Contents
    </header>
    <DocMenu class="ml-[8px]" :items="headers" :collapsible="false" />
  </div>
</template>

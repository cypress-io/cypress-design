<script setup lang="ts">
import { h } from 'vue'
import { FAVICON_LINKS, type FaviconLink } from '@cypress-design/favicon'

const props = withDefaults(defineProps<{ links?: FaviconLink[] }>(), {
  links: () => FAVICON_LINKS,
})

/**
 * Rendered with `h` rather than a `v-for` template: the tags carry different
 * attributes from one another (`type`, `sizes`, `color`), and `v-bind`
 * spreading an arbitrary attribute object onto a `<link>` silently renders
 * nothing.
 */
const Links = () => props.links.map((link) => h('link', { ...link }))
</script>

<template>
  <Links />
</template>

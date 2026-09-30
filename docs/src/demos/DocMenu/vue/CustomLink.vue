<script setup lang="ts">
import { defineComponent, h } from 'vue'
import DocMenu from '@cypress-design/vue-docmenu'

// Swap the default <a> for your router's link. It receives `href`, and
// DocMenu's classes fall through to its root element.
const CustomLink = defineComponent({
  props: { href: { type: String, required: true } },
  setup(props, { slots }) {
    return () =>
      h(
        'a',
        {
          href: props.href,
          onClick: (evt: MouseEvent) =>
            console.log('The link was clicked.', { target: evt.target }),
        },
        [slots.default?.(), ' 🔗'],
      )
  },
})
</script>

<template>
  <DocMenu
    :link-component="CustomLink"
    :items="[{ label: 'Install', href: '#with-a-custom-link' }]"
  />
</template>

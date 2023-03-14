<script lang="ts" setup>
import { useData, useRoute } from 'vitepress'
import SideBar from './SideBar.vue'
const { page } = useData()
const { path } = useRoute()

const ReactComponents = import.meta.glob('../../../../components/*/react/*.md')
console.log({ ReactComponents, path })
</script>

<template>
  <SideBar class="float-left" />
  <div class="max-w-[800px] mx-auto">
    <p>{{ path }}</p>
    <h1>{{ page.title }}</h1>
    <Content />
  </div>
</template>

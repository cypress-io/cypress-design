<script lang="ts" setup>
import { useRouter } from 'vitepress'
import { computed, h } from 'vue'
import SideBar from './SideBar.vue'
const { route } = useRouter()

const path = computed(() => route.path)

const Components = import.meta.glob('../../../../components/*/ReadMe.md', {
  eager: true,
})

const ComponentsLower = Object.entries(Components).reduce(
  (acc, [k, v]) => ({ ...acc, [k.toLowerCase()]: v }),
  {} as Record<string, any>
)

const framework = computed(() =>
  path.value.includes('/react/') ? ('react' as const) : ('vue' as const)
)

const commonPath = computed(() =>
  `../../../..${path.value
    .replace(/\.html$/, '')
    .replace(/\/(vue|react)/, '')}/ReadMe.md`.toLowerCase()
)

const CommonContent = computed(
  () =>
    (
      ComponentsLower[commonPath.value] ?? {
        default: { name: 'MissingCommon', render: () => h('div', 'no common') },
      }
    ).default
)

const links = computed(() => ({
  react: path.value.replace(/\/vue\//, '/react/'),
  vue: path.value.replace(/\/react\//, '/vue/'),
}))
</script>

<template>
  <header class="flex h-20 justify-center gap-4">
    <a
      :href="links.react"
      class="p-4"
      :class="{
        'text-gray-400': framework === 'react',
        'text-gray-800': framework === 'vue',
      }"
      >React</a
    ><a
      :href="links.vue"
      class="p-4"
      :class="{
        'text-gray-400': framework === 'vue',
        'text-gray-800': framework === 'react',
      }"
      >Vue</a
    >
  </header>
  <div class="flex min-h-full">
    <aside>
      <SideBar class="float-left" :framework="framework" />
    </aside>
    <div class="w-[800px] mx-auto">
      <CommonContent />
      <a :href="`vscode://file/${commonPath}`">edit common file</a>
      <hr />
      <Content />
    </div>
  </div>
</template>

<style>
div[class*='language-'] {
  @apply bg-gray-1000 rounded-lg my-4 relative;
}

div[class*='language-'] pre {
  @apply m-0 py-5;
}
div[class*='language-'] code {
  @apply px-6 min-w-full block;
}

div[class*='language-'] > button.copy {
  @apply right-4 top-2 absolute;
}

div[class*='language-'] .lang {
  @apply text-gray-400 right-4 top-2 absolute;
}

h1 {
  @apply text-3xl mt-8;
}

h2 {
  @apply text-2xl mt-8;
}

h3 {
  @apply text-xl mt-8;
}

h1 .header-anchor,
h2 .header-anchor,
h3 .header-anchor {
  @apply hidden;
}

h2:hover .header-anchor,
h3:hover .header-anchor {
  @apply inline-block;
}
</style>

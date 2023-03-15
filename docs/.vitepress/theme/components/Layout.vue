<script lang="ts" setup>
import { useRouter } from 'vitepress'
import { computed, h } from 'vue'
import FrameworkSwitch from './FrameworkSwitch.vue'
import ComponentSideBar from './ComponentSideBar.vue'
const { route } = useRouter()

const routePath = computed(() => route.path)

const Components = import.meta.glob('../../../../components/*/ReadMe.md', {
  eager: true,
})

const ComponentsLower = Object.entries(Components).reduce(
  (acc, [k, v]) => ({ ...acc, [k.toLowerCase()]: v }),
  {} as Record<string, any>
)

const framework = computed(() =>
  routePath.value.includes('/react/') ? ('react' as const) : ('vue' as const)
)

const commonPath = computed(() =>
  `../../../..${routePath.value
    .replace(/\.html$/, '')
    .replace(/\/(vue|react)/, '')}/ReadMe.md`.toLowerCase()
)

const CommonContent = computed(
  () =>
    (
      ComponentsLower[commonPath.value] ?? {
        default: null,
      }
    ).default
)

const root = import.meta.env.DEV_ABSOLUTE_PATH
</script>

<template>
  <header class="flex h-20 justify-between items-center gap-4">
    <a href="/"><img src="./logo.svg" class="h-[32px] mx-[32px]" /></a>
    <FrameworkSwitch :framework="framework" :path="routePath" />
  </header>
  <div class="flex min-h-full">
    <aside>
      <ComponentSideBar class="float-left" :framework="framework" />
    </aside>
    <div class="w-[800px] mx-auto">
      <a
        v-if="root.length"
        :href="`vscode://file/${root}/${commonPath.replace(
          /^\.\.\/\.\.\//,
          ''
        )}`"
      >
        Edit Common</a
      >
      <template v-if="CommonContent">
        <CommonContent />
        <hr />
      </template>
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

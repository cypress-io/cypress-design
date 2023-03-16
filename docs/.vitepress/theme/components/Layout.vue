<script lang="ts" setup>
import { useRouter } from 'vitepress'
import { computed, onMounted } from 'vue'
import FrameworkSwitch from './FrameworkSwitch.vue'
import ComponentSideBar from './ComponentSideBar.vue'
import CommonSidebar from './CommonSidebar.vue'
import { useCookies } from '@vueuse/integrations/useCookies'
const { route } = useRouter()

const { set, get } = useCookies()

const cookieFramework = computed(
  () => get<'react' | 'vue'>('framework') || 'vue'
)

const routePath = computed(() => route.path)

const Components = import.meta.glob('../../../../components/*/ReadMe.md', {
  eager: true,
})

const docsPages = import.meta.glob('../../../*.md', {
  eager: true,
})

const items = Object.keys(docsPages)
  .map((p) => {
    const route = p.replace(/^\.\.\/\.\.\/\.\.\//, '').replace(/\.md$/, '')
    const name = route.split('/').pop() ?? ''
    return {
      text: name,
      href: route,
      active: route.includes(routePath.value),
    }
  })
  .filter((p) => p.text.toLowerCase() !== 'index')

const ComponentsLower = Object.entries(Components).reduce(
  (acc, [k, v]) => ({ ...acc, [k.toLowerCase()]: v }),
  {} as Record<string, any>
)

const hasFramework = computed(() => /\/(react|vue)\//.test(routePath.value))

const framework = computed(() =>
  routePath.value.includes('/react/')
    ? ('react' as const)
    : routePath.value.includes('/vue/')
    ? ('vue' as const)
    : cookieFramework.value
)

onMounted(() => {
  switchFramework(framework.value)
})

const commonPath = computed(() =>
  routePath.value.replace(/\.html$/, '').replace(/\/(vue|react)/, '')
)

const commonPathReadme = computed(() => `${commonPath.value}/ReadMe.md`)

const CommonContent = computed(
  () =>
    (
      ComponentsLower[`../../../..${commonPathReadme.value.toLowerCase()}`] ?? {
        default: null,
      }
    ).default
)

function switchFramework(fw: 'react' | 'vue') {
  set('framework', fw)
}

const editRoot = import.meta.env.EDIT_ROOT

/**
 * when no framework is specified, we use this url to edit the current document
 */
const editUrl = computed(() => {
  if (!editRoot) return ''
  const url = routePath.value.replace(/\.html$/, '.md').replace(/\/$/, '')
  if (url.length) return `${editRoot}${url}`
  return `${editRoot}/docs/index.md`
})
</script>

<template>
  <header class="flex h-[80px] justify-between items-center px-[32px]">
    <a href="/">
      <picture>
        <source srcset="./logo-dark.svg" media="(prefers-color-scheme: dark)" />
        <img src="./logo.svg" class="h-[32px] mr-[32px]" />
      </picture>
    </a>
    <FrameworkSwitch
      :framework="framework"
      :path="routePath"
      @switch="switchFramework"
    />
    <div class="w-[150px]" />
  </header>
  <div class="flex min-h-full pb-8">
    <aside>
      <CommonSidebar :items="items" />
      <ComponentSideBar
        class="float-left"
        :framework="framework"
        :currentPath="commonPath"
      />
    </aside>
    <div class="w-[800px] mx-auto">
      <template v-if="CommonContent">
        <a
          v-if="editRoot"
          :href="`${editRoot}${commonPathReadme}`"
          class="float-right"
        >
          Edit Common</a
        >
        <CommonContent />
        <hr />
      </template>
      <template v-if="editRoot">
        <a
          v-if="hasFramework"
          :href="`${editRoot}${commonPath}/${framework}/ReadMe.md`"
          class="float-right"
        >
          Edit {{ framework }} ReadMe
        </a>
        <a v-else :href="editUrl" class="float-right">Edit</a>
      </template>
      <Content />
    </div>
    <aside>
      <div class="w-[200px]"></div>
    </aside>
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

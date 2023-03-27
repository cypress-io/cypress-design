<script lang="ts" setup>
import './markdown.css'
import './fonts/fonts.css'
import { onContentUpdated, useRouter } from 'vitepress'
import { computed, onMounted, shallowRef, watch, ref, nextTick } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import DocMenu from '@cypress-design/vue-docmenu'
import Button from '@cypress-design/vue-button'
import FrameworkSwitch from './FrameworkSwitch.vue'
import Sidebar from './SideBar.vue'
import { getHeaders } from '../utils/outline'
const router = useRouter()

const { set, get } = useCookies()

const cookieFramework = computed(
  () => get<'react' | 'vue'>('framework') || 'vue'
)

const saveScroll = ref(0)

/**
 * keep scroll when switching framework
 */
router.onAfterRouteChanged = async (to) => {
  console.log('onAfterRouteChanged', { to, saveScroll: saveScroll.value })
  if (to.includes('/components/') && saveScroll.value) {
    nextTick(() => {
      window.scrollTo(0, saveScroll.value)
      saveScroll.value = 0
    })
  }
}

const routePath = computed(() => router.route.path)

const framework = computed(() =>
  routePath.value.includes('/react/')
    ? ('react' as const)
    : routePath.value.includes('/vue/')
    ? ('vue' as const)
    : cookieFramework.value
)

watch(
  routePath,
  (path) => {
    if (
      path.includes('/components/') &&
      !path.includes('/react/') &&
      !path.includes('/vue/')
    ) {
      router.go(path.replace('/components/', `/components/${framework.value}/`))
    }
  },
  { immediate: true }
)

const Components = import.meta.glob('../../../../components/*/ReadMe.md', {
  eager: true,
})

const ComponentsLower = Object.entries(Components).reduce(
  (acc, [k, v]) => ({ ...acc, [k.toLowerCase()]: v }),
  {} as Record<string, any>
)

const hasFramework = computed(() => /\/(react|vue)\//.test(routePath.value))

const headers = shallowRef<any>([])

onContentUpdated(() => {
  headers.value = getHeaders(2)
})

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
  saveScroll.value = window.scrollY
  set('framework', fw)
}

const editRoot = import.meta.env.EDIT_ROOT

/**
 * when no framework is specified, we use this url to edit the current document
 */
const editUrl = computed(() => {
  if (!editRoot) return ''
  const url = routePath.value.replace(/\.html$/, '.md').replace(/\/$/, '')
  if (url.length) return `${editRoot}/docs${url}`
  return `${editRoot}/docs/index.md`
})
</script>

<template>
  <header
    class="flex fixed z-50 w-full bg-white dark:bg-gray-800 h-[72px] justify-between items-center px-[32px] border-b border-gray-100"
  >
    <a href="/">
      <picture>
        <source srcset="./logo-dark.svg" media="(prefers-color-scheme: dark)" />
        <img src="./logo.svg" class="h-[32px] mr-[32px]" />
      </picture>
    </a>

    <div class="w-[150px]" />
  </header>
  <div class="h-[72px]" />
  <div class="flex min-h-full pb-8">
    <aside class="py-[32px]">
      <Sidebar
        :framework="framework"
        :currentPath="commonPath"
        :routePath="routePath"
      />
    </aside>
    <main class="w-[800px] mx-auto mt-[24px]">
      <div v-if="CommonContent" class="relative">
        <Button
          v-if="editRoot"
          :key="commonPathReadme"
          variant="link"
          :href="`${editRoot}${commonPathReadme}`"
          class="absolute right-0 top-0 peer"
        >
          Edit
        </Button>
        <div
          class="peer-hover:bg-gray-50/50 py-[4px] mt-[24px] p-[8px] rounded"
        >
          <CommonContent />
        </div>
      </div>
      <div class="relative">
        <Button
          v-if="editRoot"
          :key="`${commonPath}/${framework}`"
          :href="
            hasFramework
              ? `${editRoot}${commonPath}/${framework}/ReadMe.md`
              : editUrl
          "
          variant="link"
          class="absolute right-0 top-0 z-10 peer"
        >
          Edit
        </Button>
        <div class="peer-hover:bg-gray-50/50 py-[4px] p-[8px] rounded mt-8">
          <FrameworkSwitch
            v-if="hasFramework"
            :framework="framework"
            :path="routePath"
            @switch="switchFramework"
          />
          <Content />
        </div>
      </div>
    </main>
    <aside>
      <div class="w-[300px]">
        <DocMenu :items="headers" class="fixed top-[70px]" />
      </div>
    </aside>
  </div>
</template>

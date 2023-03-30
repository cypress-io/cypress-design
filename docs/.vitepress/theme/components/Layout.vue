<script lang="ts" setup>
import './markdown.css'
import './fonts/fonts.css'
import { onContentUpdated, useRouter } from 'vitepress'
import {
  computed,
  onMounted,
  shallowRef,
  watch,
  ref,
  nextTick,
  defineAsyncComponent,
} from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import DocMenu from '@cypress-design/vue-docmenu'
import Button from '@cypress-design/vue-button'
import { IconMenuHamburger } from '@cypress-design/vue-icon'
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

const Components = import.meta.glob('../../../../components/*/ReadMe.md')

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

const CommonContent = computed(() => {
  const CommonContentOrUndefined =
    ComponentsLower[`../../../..${commonPathReadme.value.toLowerCase()}`]
  if (!CommonContentOrUndefined) return undefined
  return defineAsyncComponent(CommonContentOrUndefined)
})

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

const mobileMenuOpen = ref(false)
</script>

<template>
  <header
    class="flex flex-row-reverse md:flex-row fixed z-40 w-full bg-white dark:bg-gray-800 h-[72px] justify-between items-center px-[32px] border-b border-gray-100"
  >
    <button
      @click="mobileMenuOpen = true"
      class="md:hidden absolute left-[16px]"
    >
      <IconMenuHamburger />
    </button>
    <a href="/">
      <picture>
        <source srcset="./logo-dark.svg" media="(prefers-color-scheme: dark)" />
        <img src="./logo.svg" class="h-[32px] md:mr-[32px]" />
      </picture>
    </a>
  </header>
  <div class="h-[72px]" />
  <div class="flex min-h-full pb-8">
    <div
      v-if="mobileMenuOpen"
      class="fixed w-screen h-screen top-0 left-0 bg-gray-900/70 z-10 md:hidden"
      @click="mobileMenuOpen = false"
    />
    <div class="w-[250px] hidden md:block flex-shrink-0" />
    <aside
      class="fixed py-[32px] bg-white dark:bg-gray-900 z-50 transition-transform duration-300 h-[calc(100vh-72px)] overflow-auto"
      :class="{
        '-translate-x-full md:translate-x-0': !mobileMenuOpen,
      }"
    >
      <Sidebar
        :framework="framework"
        :currentPath="commonPath"
        :routePath="routePath"
        @click="mobileMenuOpen = false"
      />
    </aside>
    <main class="w-[800px] mx-[16px] md:mx-auto md:mt-[24px]">
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
    <aside class="hidden xl:block">
      <div class="w-[300px]">
        <div
          v-if="headers.length"
          class="fixed top-[72px] mt-[48px] border-solid border-l border-gray-1000/07"
        >
          <header
            class="ml-[32px] uppercase text-gray-500 mt-0 mb-[8px] text-[14px] leading-[20px]"
          >
            Contents
          </header>
          <DocMenu :items="headers" class="ml-[8px]" />
        </div>
      </div>
    </aside>
  </div>
</template>

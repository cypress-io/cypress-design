<script lang="ts" setup>
import './markdown.css'
import './fonts/fonts.css'
import { useRouter } from 'vitepress'
import { computed, onMounted, watch, ref, defineAsyncComponent } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import Button from '@cypress-design/vue-button'
import {
  IconMenuHamburger,
  IconSocialGithubSolid,
} from '@cypress-design/vue-icon'
import FrameworkSwitch from './FrameworkSwitch.vue'
import Sidebar from './SideBar.vue'
import DocsOutline from './DocsOutline.vue'
import DarkModeSwitch from './DarkModeSwitch.vue'
const router = useRouter()

const { set, get } = useCookies()

const cookieFramework = computed(
  () => get<'react' | 'vue'>('framework') || 'vue'
)

const saveScroll = ref(0)

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

onMounted(() => {
  switchFramework(framework.value)
})

const commonPath = computed(() =>
  routePath.value.replace(/\.html$/, '').replace(/\/(vue|react)/, '')
)

const commonPathReadme = computed(() => `${commonPath.value}/ReadMe.md`)
const commonContentMounted = ref(false)

const CommonContent = computed(() => {
  const CommonContentOrUndefined =
    ComponentsLower[`../../../..${commonPathReadme.value.toLowerCase()}`]
  if (!CommonContentOrUndefined) return undefined
  return defineAsyncComponent(() => {
    commonContentMounted.value = false
    return CommonContentOrUndefined()
      .then((c: any) => c.default)
      .then((c: any) => ({
        ...c,
        mounted: () => {
          commonContentMounted.value = true
        },
      }))
  })
})

function switchFramework(fw: 'react' | 'vue') {
  saveScroll.value = window.scrollY
  set('framework', fw)
  router.go(routePath.value.replace(/\/(react|vue)\//, `/${fw}/`)).then(() => {
    setTimeout(() => {
      window.scrollTo(0, saveScroll.value)
      saveScroll.value = 0
    }, 10)
  })
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
  <DarkModeSwitch class="fixed bottom-[32px] right-[32px]" />
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
      <img src="./logo.svg" class="h-[32px] md:mr-[32px] dark:hidden" />
      <img
        src="./logo-dark.svg"
        class="h-[32px] md:mr-[32px] hidden dark:inline-block"
      />
    </a>
    <a
      href="https://github.com/cypress-io/cypress-design"
      class="dark:hover:text-indigo-300 hover:text-indigo-500"
    >
      <IconSocialGithubSolid class="w-[32px] h-[32px]" />
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
          class="peer-hover:bg-gray-50/50 dark:peer-hover:bg-gray-800/20 py-[4px] mt-[24px] p-[8px] rounded"
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
        <div
          class="peer-hover:bg-gray-50/50 dark:peer-hover:bg-gray-800/20 py-[4px] p-[8px] rounded mt-8"
        >
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
        <DocsOutline :common-content-mounted="commonContentMounted" />
      </div>
    </aside>
  </div>
</template>

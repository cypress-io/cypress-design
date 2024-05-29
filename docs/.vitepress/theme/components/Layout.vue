<script lang="ts" setup>
import '../assets/markdown.scss'
import '../assets/fonts/fonts.css'
import { useData, useRouter } from 'vitepress'
import {
  computed,
  onMounted,
  watch,
  ref,
  defineAsyncComponent,
  h,
  nextTick,
} from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import Button from '@cypress-design/vue-button'
import {
  IconMenuHamburger,
  IconSocialGithubSolid,
} from '@cypress-design/vue-icon'
import FrameworkSwitch from './FrameworkSwitch.vue'
import Sidebar from './SideBar.vue'
import DocsOutline from './DocsOutline.vue'
import EditButton from './EditButton.vue'
const router = useRouter()

const cookie = ref<ReturnType<typeof useCookies>>()

onMounted(() => {
  cookie.value = useCookies()
})

const cookieFramework = computed(() => {
  return cookie.value?.get<'react' | 'vue'>('framework') || 'vue'
})

const saveScroll = ref(0)

const routePath = computed(() => router.route.path)

const framework = computed(() =>
  routePath.value.includes('/react/')
    ? ('react' as const)
    : routePath.value.includes('/vue/')
      ? ('vue' as const)
      : cookieFramework.value,
)

watch(
  routePath,
  (path) => {
    if (
      path.includes('/components/') &&
      !path.includes('/react/') &&
      !path.includes('/vue/')
    ) {
      const frameworkUrl = path.replace(
        '/components/',
        `/components/${framework.value}/`,
      )
      nextTick(() => {
        router.go(frameworkUrl)
      })
    }
  },
  { immediate: true },
)

const Components = import.meta.glob('../../../../components/*/ReadMe.md')

const ComponentsLower = Object.entries(Components).reduce(
  (acc, [k, v]) => ({ ...acc, [k.toLowerCase()]: v }),
  {} as Record<string, any>,
)

const hasFramework = computed(() => /\/(react|vue)\//.test(routePath.value))

onMounted(() => {
  switchFramework(framework.value)
})

const commonPath = computed(() =>
  routePath.value.replace(/\.html$/, '').replace(/\/(vue|react)/, ''),
)

const commonPathReadme = computed(() => `${commonPath.value}/ReadMe.md`)

const $outline = ref<typeof DocsOutline | null>(null)

const $common = ref<typeof CommonContent | null>(null)
const commonHeight = ref('0')
const CommonContent = computed(() => {
  const CommonContentOrUndefined =
    ComponentsLower[`../../../..${commonPathReadme.value.toLowerCase()}`]
  if (!CommonContentOrUndefined) {
    return undefined
  }
  return defineAsyncComponent({
    loadingComponent: () =>
      h('div', {
        style: { height: commonHeight.value },
      }),
    // Delay before showing the loading component. Default: 200ms.
    delay: 0,
    loader: () => {
      return CommonContentOrUndefined()
        .then((c: any) => c.default)
        .then((c: any) => ({
          ...c,
          mounted: () => {
            $outline.value?.update()
            commonHeight.value = $common.value?.$el.clientHeight + 'px'
          },
        }))
    },
  })
}) as any

function switchFramework(fw: 'react' | 'vue') {
  saveScroll.value = window.scrollY
  cookie.value?.set('framework', fw)
  router.go(routePath.value.replace(/\/(react|vue)\//, `/${fw}/`)).then(() => {
    setTimeout(() => {
      window.scrollTo(0, saveScroll.value)
      saveScroll.value = 0
    }, 10)
  })
}

const mobileMenuOpen = ref(false)
const { frontmatter } = useData() as any
</script>

<template>
  <template v-if="!frontmatter.layout">
    <header
      class="flex flex-row-reverse md:flex-row fixed z-40 w-full bg-white h-[72px] justify-between items-center px-[24px] md:px-[32px] border-b border-gray-100/[.07]"
    >
      <a href="/">
        <img src="../assets/logo.svg" class="h-[32px] md:mr-[32px]" />
        <img
          src="../assets/logo-dark.svg"
          class="h-[32px] md:mr-[32px] hidden"
        />
      </a>
      <Button
        href="https://github.com/cypress-io/cypress-design"
        variant="outline-light"
        class="fixed bottom-[34px] right-[116px] md:static text-indigo-500 !bg-gray-50 !!rounded-full !dark:border-gray-50/[.07] !dark:hover:border-gray-50/20 !dark:hover:shadow-gray-50/07"
      >
        <IconSocialGithubSolid />
      </Button>
      <button @click="mobileMenuOpen = true" class="md:hidden">
        <IconMenuHamburger />
      </button>
    </header>
    <div class="h-[72px]" />
    <div class="flex min-h-full pb-8">
      <div
        v-if="mobileMenuOpen"
        class="fixed w-screen h-screen top-0 left-0 bg-gray-900/70 z-10 md:hidden"
        @click="mobileMenuOpen = false"
      />
      <div class="w-[250px] hidden md:block shrink-0" />
      <aside
        class="fixed py-[32px] bg-white z-50 transition transition-transform duration-300 h-[calc(100vh-72px)] overflow-auto border-r border-gray-100/[.07]"
        :class="{
          'transform -translate-x-full md:translate-x-0': !mobileMenuOpen,
        }"
      >
        <Sidebar
          :framework="framework"
          :currentPath="commonPath"
          :routePath="routePath"
          @click="mobileMenuOpen = false"
        />
      </aside>
      <main class="w-[800px] mx-[24px] min-[1420px]:mx-auto md:mt-[24px]">
        <div v-if="CommonContent" class="relative">
          <EditButton
            :key="commonPathReadme"
            :commonPath="commonPath"
            :commonPathReadme="commonPathReadme"
            common
          />
          <div
            class="peer-hover:bg-gray-50/50 py-[4px] mt-[24px] p-[8px] rounded"
          >
            <CommonContent ref="$common" class="markdown" />
          </div>
        </div>
        <div class="relative">
          <EditButton
            :key="`${commonPath}/${framework}`"
            :commonPath="commonPath"
            :commonPathReadme="commonPathReadme"
            :framework="hasFramework ? framework : undefined"
          />
          <div class="peer-hover:bg-gray-50/50 py-[4px] p-[8px] rounded mt-8">
            <FrameworkSwitch
              v-if="hasFramework"
              :framework="framework"
              :path="routePath"
              @switch="switchFramework"
            />
            <Content
              class="markdown"
              role="tabpanel"
              :id="`tabpanel-${framework}`"
            />
          </div>
        </div>
      </main>
      <aside class="hidden xl:block">
        <div class="w-[300px]">
          <DocsOutline ref="$outline" />
        </div>
      </aside>
    </div>
  </template>
  <Content v-else />
  <div id="modal-target" />
</template>

<style lang="scss">
.shiki {
  .line > span {
    color: var(--shiki-dark);
  }
}
</style>

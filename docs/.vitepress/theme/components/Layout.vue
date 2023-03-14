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
    <a :href="links.react" class="p-4">react</a
    ><a :href="links.vue" class="p-4">vue</a>
  </header>
  <div class="flex min-h-full">
    <aside>
      <SideBar class="float-left" :framework="framework" />
    </aside>
    <div class="max-w-[800px] mx-auto">
      <CommonContent />
      <hr />
      <Content />
    </div>
  </div>
</template>

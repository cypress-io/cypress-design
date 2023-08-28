<script lang="ts" setup>
import { computed } from 'vue'
import Button from '@cypress-design/vue-button'
import { useRouter } from 'vitepress'
import { getDocsPages } from '../utils/docsPages'
const router = useRouter()

const props = withDefaults(
  defineProps<{
    common?: boolean
    commonPathReadme: string
    framework?: 'react' | 'vue'
    commonPath: string
  }>(),
  {
    common: false,
  },
)

const routePath = computed(() => router.route.path)

const { routeMap } = getDocsPages(routePath)

const editRoot =
  import.meta.env.MODE === 'development'
    ? import.meta.env.EDIT_ROOT_LOCAL
    : import.meta.env.EDIT_ROOT_GITHUB

/**
 * when no framework is specified, we use this url to edit the current document
 */
const editUrl = computed(() => {
  if (!editRoot) return ''
  const url = routeMap[routePath.value.replace(/\.html$/, '')]
  if (url?.length) return `${editRoot}/docs${url}`
  const firstServerRoute = Object.values(routeMap)[0]
  return `${editRoot}/docs/${firstServerRoute}`
})

const href = computed(() => {
  if (props.common) {
    return `${editRoot}${props.commonPathReadme}`
  }
  return props.framework
    ? `${editRoot}${props.commonPath}/${props.framework}/ReadMe.md`
    : editUrl.value
})
</script>

<template>
  <template v-if="editRoot">
    <Button
      :href="href"
      variant="link"
      class="absolute right-0 top-0 z-10 peer"
    >
      Edit
    </Button>
  </template>
</template>

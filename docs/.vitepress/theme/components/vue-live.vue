<script lang="ts" setup>
import { VueLiveEditor, VueLivePreview } from 'vue-live'
import { createElement, createRoot, ReactPreview } from './react-preview'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import 'prismjs/themes/prism-tomorrow.css'
import 'vue-live/style.css'

const props = defineProps<{
  framework: 'vue' | 'react'
  code: string
  requires?: Record<string, any>
  components?: Record<string, any>
  jsx?: boolean
}>()

const liveCode = ref(props.code)
const error = ref()

const prismLang = ref<'html' | 'vsg'>('html')

const LANG_TO_PRISM = {
  vue: 'html',
  vsg: 'vsg',
} as const

function switchLanguage(newLang: 'vue' | 'vsg') {
  const newPrismLang = LANG_TO_PRISM[newLang]
  if (prismLang.value !== newPrismLang) {
    prismLang.value = newPrismLang
  }
}

const reactAppRoot$ = ref<HTMLDivElement>()

onMounted(() => {
  liveCode.value = props.code
  if (reactAppRoot$.value) {
    root.value = createRoot(reactAppRoot$.value)
    renderReactApp(liveCode.value)

    watch(
      liveCode,
      (code) => {
        renderReactApp(code)
      },
      { immediate: true }
    )
  }
})

const root = ref<{
  render: (el: any) => void
  unmount: () => void
} | null>(null)

function renderReactApp(code: string) {
  root.value?.render(
    createElement(ReactPreview, {
      code,
      requires: props.requires,
      components: props.components,
    })
  )
}

onUnmounted(() => {
  root.value?.unmount()
})

const copiedSuccess = ref(false)
function copyCode() {
  const el = document.createElement('textarea')
  el.value = liveCode.value
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  copiedSuccess.value = true
  setTimeout(() => {
    copiedSuccess.value = false
  }, 1000)
}
</script>

<template>
  <div class="vue-live vue-live-preview-code">
    <div class="vue-live-preview vue-live-block">
      <div v-if="props.framework === 'react'" v-once ref="reactAppRoot$">
        React app root
      </div>
      <VueLivePreview
        v-if="props.framework !== 'react'"
        :requires="requires"
        :components="components"
        :code="liveCode"
        :jsx="jsx"
        @detect-language="switchLanguage"
        @error="(e: any) => (error = e)"
        @success="error = undefined"
      />
    </div>
    <div
      class="vue-live-editor vue-live-block"
      :class="`language-${props.framework}`"
    >
      <VueLiveEditor
        :code="liveCode"
        :prism-lang="props.framework === 'react' ? 'tsx' : prismLang"
        :error="error"
        :jsx="jsx || props.framework === 'react'"
        @change="(newCode:string) => (liveCode = newCode)"
      />
      <button
        class="copy"
        :class="{ copied: copiedSuccess }"
        @click="copyCode"
      />
    </div>
  </div>
</template>

<style scoped>
.vue-live-editor.vue-live-block {
  @apply bg-gray-1000 rounded-t-none rounded-b-md my-0;
}
.vue-live-preview-code {
  display: flex;
  flex-flow: column;
  overflow: hidden;
  @apply rounded-lg my-[24px] border border-gray-100;
}
.vp-doc .vue-live-preview-code .vue-live-block {
  flex-grow: 1;
  border-radius: 0;
  margin: 0;
}

.vue-live-preview-code .vue-live-editor pre {
  margin: 0;
  box-sizing: border-box;
  border-radius: 0;
  white-space: pre-wrap;
}

.vue-live-preview-code .vue-live-editor {
  @apply py-0;
}

.vue-live-preview-code .vue-live-preview {
  box-sizing: border-box;
  @apply bg-indigo-50 p-[12px];
}

html.dark .vue-live-preview-code .vue-live-preview {
  @apply bg-gray-800;
}

.vue-live-preview-code :deep(.prism-editor-wrapper) {
  color: white;
  padding: 0;
}

.vue-live-preview-code :deep(.prism-editor-wrapper .prism-editor__textarea),
.vue-live-preview-code :deep(.prism-editor-wrapper .prism-editor__editor) {
  padding: 16px;
  padding-top: 12px;
  padding-bottom: 0;
  white-space: pre-wrap;
  font-family: 'Fira Code', monospace;
  line-height: 1.3;
  font-size: 0.875rem;
}
</style>

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

const root = ref<{ render: (el: any) => void } | null>(null)

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
  root.value = null
})
</script>

<template>
  <div class="preview-code">
    <div class="preview code-block">
      <VueLivePreview
        v-if="props.framework === 'vue'"
        :requires="requires"
        :components="components"
        :code="liveCode"
        :jsx="jsx"
        @detect-language="switchLanguage"
        @error="(e: any) => (error = e)"
        @success="error = undefined"
      />
      <div v-else v-once ref="reactAppRoot$">React app root</div>
    </div>
    <div class="editor code-block" :class="`language-${props.framework}`">
      <VueLiveEditor
        :code="liveCode"
        :prism-lang="props.framework === 'react' ? 'tsx' : prismLang"
        :error="error"
        :jsx="jsx || props.framework === 'react'"
        @change="(code) => (liveCode = code)"
      />
    </div>
  </div>
</template>

<style scoped>
.editor.code-block {
  @apply bg-gray-1000 rounded-t-none rounded-b-md my-0;
}
.preview-code {
  display: flex;
  flex-flow: column;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e2e2e2;
  margin-top: 24px;
}
.vp-doc .preview-code .code-block {
  flex-grow: 1;
  border-radius: 0;
  margin: 0;
}

.preview-code .editor pre {
  margin: 0;
  box-sizing: border-box;
  border-radius: 0;
  white-space: pre-wrap;
}
.preview-code .preview {
  background-color: rgb(249, 245, 245);
  box-sizing: border-box;
  padding: 12px;
}

.preview-code :deep(.prism-editor-wrapper) {
  color: white;
  padding: 0;
}

.preview-code :deep(.prism-editor-wrapper .prism-editor__textarea),
.preview-code :deep(.prism-editor-wrapper .prism-editor__editor) {
  padding: 16px;
  padding-top: 12px;
  padding-bottom: 0;
  white-space: pre-wrap;
  font-family: 'Fira Code', monospace;
  line-height: var(--vp-code-line-height);
  font-size: var(--vp-code-font-size);
}
</style>

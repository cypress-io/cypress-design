<template>
  <div class="preview-code">
    <div class="preview code-block">
      <VueLivePreview
        v-if="lang === 'vue'"
        :requires="requires"
        :components="components"
        @detect-language="switchLanguage"
        :code="liveCode"
        @error="(e: any) => (error = e)"
        @success="error = undefined"
      />
      <pre v-else>
						{{ liveCode }}
					</pre
      >
    </div>
    <div class="editor code-block" :class="`language-${lang}`">
      <VueLiveEditor
        :code="liveCode"
        @change="(code) => (liveCode = code)"
        :prism-lang="prismLang"
        :error="error"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'prismjs/themes/prism-tomorrow.css'
import 'vue-live/style.css'
import { VueLiveEditor, VueLivePreview } from 'vue-live'
import { ref } from 'vue'

const props = defineProps<{
  lang: string
  code: string
  requires?: Record<string, any>
  components?: Record<string, any>
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
</script>

<style scoped>
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

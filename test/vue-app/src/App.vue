<script setup lang="ts">
import { ref } from 'vue'
import Accordion from '@cypress-design/vue-accordion'
import Checkbox from '@cypress-design/vue-checkbox'
import Icon, {
  IconActionQuestionMarkCircle,
  IconObjectBookCode,
  IconObjectMagnifyingGlass,
} from '@cypress-design/vue-icon'
import Modal from '@cypress-design/vue-modal'
import Alert from '@cypress-design/vue-alert'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore see this issue https://github.com/vuejs/language-tools/issues/1662
import Spinner from '@cypress-design/vue-spinner/sfc'
import Button from '@cypress-design/vue-button'

const checked = ref(false)
const showModal = ref(false)
</script>

<template>
  <div
    class="@container/main mb-4 overflow-hidden max-w-[600px] mx-auto text-center"
  >
    <h2 class="p-4">Example of container query usage</h2>
    <div class="grid grid-cols-1 @[30rem]/main:grid-cols-3 gap-4">
      <div class="bg-gray-100 p-4">1</div>
      <div class="bg-gray-100 p-4">2</div>
      <div class="bg-gray-100 p-4">3</div>
      <div class="bg-gray-100 p-4">4</div>
      <div class="bg-gray-100 p-4">5</div>
      <div class="bg-gray-100 p-4">6</div>
    </div>
  </div>
  <div class="group w-[500px] text-center mx-auto">
    <Icon
      name="general-grid-2x2"
      size="16"
      stroke-color="gray-500"
      fill-color="gray-100"
    />
    <Checkbox
      v-model="checked"
      label="Checkbox"
      id="Sample"
      @update:model-value=""
    />
    <p v-if="checked">Checked</p>
    <IconObjectBookCode
      size="48"
      class="icon-dark-red-300"
      :stroke-color="checked ? 'indigo-600' : 'red-300'"
      fill-color="indigo-300"
      hover-fill-color="red-300"
      interactive-colors-on-group
    />
    <Icon
      name="object-book"
      strokeColor="jade-500"
      size="24"
      hoverStrokeColor="red-500"
    />
    <div class="h-[80vh]" />
    <Alert type="error" disabled> Error </Alert>
    <Spinner />
    <Button variant="jade-dark">Button</Button>
    <Accordion title="hi">
      hello
      <template #iconEl>
        <IconActionQuestionMarkCircle fillColor="jade-50" />
      </template>
    </Accordion>
    <div class="group p-4 bg-jade-50">
      <IconObjectMagnifyingGlass
        interactive-colors-on-group
        strokeColor="jade-600"
        fillColor="jade-50"
        focus-within-stroke-color="red-500"
      /><input />
    </div>
    <Button variant="jade-dark" @click="showModal = true">Open Modal</Button>
    <Modal v-model:show="showModal" title="This is shown">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel reiciendis
      magni quo dolor unde dolorem illum possimus laborum voluptatum maiores
      blanditiis officiis fugiat sapiente, adipisci eum. Sapiente recusandae
      voluptates mollitia?
    </Modal>
    <a class="hocus:text-purple-500" href="https://google.com">Google</a>

    <div class="h-[80vh]" />
    Bottom of page
  </div>
</template>

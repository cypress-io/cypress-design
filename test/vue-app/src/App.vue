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
// @ts-expect-error see this issue https://github.com/vuejs/language-tools/issues/1662
import Spinner from '@cypress-design/vue-spinner/sfc'
import Button from '@cypress-design/vue-button'

const checked = ref(false)
const showModal = ref(false)
</script>

<template>
  <div class="group w-[500px] text-center mx-auto">
    <Icon
      name="general-grid-2x2"
      size="16"
      stroke-color="gray-500"
      fill-color="gray-100"
    />
    <Checkbox v-model="checked" label="Checkbox" id="Sample" />
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
    <div class="h-[80vh]" />
    Bottom of page
  </div>
</template>

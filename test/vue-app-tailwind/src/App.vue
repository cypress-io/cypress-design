<script setup lang="ts">
import { ref } from 'vue'
import Accordion from '@cypress-design/vue-accordion'
import Checkbox from '@cypress-design/vue-checkbox'
import Icon, {
  IconActionQuestionMarkCircle,
  IconObjectBookCode,
  IconObjectMagnifyingGlass,
} from '@cypress-design/vue-icon'
import Alert from '@cypress-design/vue-alert'
import Spinner from '@cypress-design/vue-spinner/sfc'
import Button from '@cypress-design/vue-button'

const checked = ref(false)
</script>

<template>
  <div class="group w-[500px] text-center mx-auto">
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
  </div>
</template>

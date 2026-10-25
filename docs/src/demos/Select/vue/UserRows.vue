<script setup lang="ts">
import { ref } from 'vue'
import Select, { type SelectItem } from '@cypress-design/vue-select'
import { IconUserGeneralOutline } from '@cypress-design/vue-icon'

const value = ref<string | undefined>()
const items: SelectItem[] = [
  {
    type: 'user',
    value: 'jordan',
    label: 'Jordan Lee',
    secondary: 'jordan@example.com',
    iconLeft: IconUserGeneralOutline,
  },
  {
    type: 'user',
    value: 'maya',
    label: 'Maya Patel',
    secondary: 'maya@example.com',
    iconLeft: IconUserGeneralOutline,
  },
  {
    type: 'user',
    value: 'sam',
    label: 'Sam Rivera',
    secondary: 'sam@example.com — Enterprise SSO',
    iconLeft: IconUserGeneralOutline,
  },
]
</script>

<template>
  <Select
    v-model="value"
    :items="items"
    placeholder="Assignee"
    :min-width="280"
  />
</template>

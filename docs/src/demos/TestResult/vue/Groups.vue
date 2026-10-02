<script setup lang="ts">
import { ref } from 'vue'
import TestResult from '@cypress-design/vue-testresult'
import Button from '@cypress-design/vue-button'
import { IconChevronRightSmall } from '@cypress-design/vue-icon'

const open = ref(false)
const groups = ['Chrome', 'Firefox', 'Safari']
</script>

<template>
  <div class="bg-white p-4">
    <TestResult
      status="passed"
      :names="['TestResult', 'should render with groups']"
      flaky
      modified
    >
      <template #actions>
        <Button
          variant="outline-light"
          size="32"
          class="!px-2"
          aria-label="Show groups"
          :aria-expanded="open"
          @click="open = !open"
        >
          <IconChevronRightSmall
            stroke-color="gray-500"
            :class="{ 'rotate-90': open }"
          />
        </Button>
      </template>
      <!-- Render the groups slot only while expanded. -->
      <template v-if="open" #groups>
        <div
          v-for="group in groups"
          :key="group"
          class="border border-t-0 border-gray-100 px-4 py-2 first:border-t"
        >
          {{ group }}
        </div>
      </template>
    </TestResult>
  </div>
</template>

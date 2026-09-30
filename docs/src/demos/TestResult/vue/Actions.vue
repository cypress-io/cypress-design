<script setup lang="ts">
import TestResult from '@cypress-design/vue-testresult'
import Button from '@cypress-design/vue-button'
import { IconActionTestReplay } from '@cypress-design/vue-icon'
</script>

<template>
  <div class="bg-white p-4">
    <TestResult
      status="passed"
      :names="['TestResult', 'should render two levels']"
    >
      <template #actions>
        <!-- @lg/test-result sizes the label to the row, not the viewport. -->
        <Button
          variant="outline-light"
          size="32"
          class="!px-2 @lg/test-result:!px-3"
        >
          <IconActionTestReplay />
          <span class="ml-2 hidden @lg/test-result:inline">Test Replay</span>
        </Button>
      </template>
    </TestResult>
  </div>
</template>

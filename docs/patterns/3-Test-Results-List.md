<script lang="ts" setup>
  const components$ = { }
</script>

# Test Results List

## Usage

```vue live
<script setup lang="ts">
import TestResult from '@cypress-design/vue-testresult'
import Button from '@cypress-design/vue-button'
import { TestResults } from '@cypress-design/constants-testresult'
import {
  IconActionTestReplay,
  IconChevronRightSmall,
} from '@cypress-design/vue-icon'
</script>

<template>
  <div class="bg-white p-4 max-h-[400px] overflow-hidden overflow-y-auto">
    <TestResult v-for="tr of TestResults" v-bind="tr">
      <Button
        variant="outline-light"
        size="32"
        class="!px-[8px] @lg/test-result:!px-[12px] h-[32px]"
      >
        <IconActionTestReplay />
        <span class="hidden @lg/test-result:inline ml-[8px]">
          Test Replay
        </span>
      </Button>
      <Button
        variant="outline-light"
        size="32"
        class="!px-[8px] hidden @xl/test-result:inline-block h-[32px]"
      >
        <IconChevronRightSmall stroke-color="gray-500" />
      </Button>
    </TestResult>
  </div>
</template>
```

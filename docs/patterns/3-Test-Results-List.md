<script lang="ts" setup>
  const components$ = { }
</script>

# Test Results List

## Usage

```vue live
<script lang="ts" setup>
import { reactive } from 'vue'
import TestResult from '@cypress-design/vue-testresult'
import Button from '@cypress-design/vue-button'
import { TestResults } from '@cypress-design/constants-testresult'
import {
  IconActionTestReplay,
  IconChevronRightSmall,
} from '@cypress-design/vue-icon'

const groupShowed = reactive<Record<string, boolean>>({})
</script>

<template>
  <div class="bg-white p-4 max-h-[400px] overflow-hidden overflow-y-auto">
    <TestResult v-for="tr of TestResults" v-bind="tr">
      <template #actions>
        <Button
          v-if="!tr.groups"
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
          v-else
          variant="outline-light"
          size="32"
          class="!px-[8px] hidden @xl/test-result:inline-block h-[32px]"
          @click="groupShowed[tr.id] = !groupShowed[tr.id]"
        >
          <IconChevronRightSmall
            stroke-color="gray-500"
            :class="{
              'rotate-90': groupShowed[tr.id],
              'transform transition-transform': true,
            }"
          />
        </Button>
      </template>
      <template v-if="groupShowed[tr.id]" #groups>
        <div
          v-for="group in tr.groups"
          class="px-[16px] py-[10px] border border-gray-100 border-t-0 first:border-t flex items-center"
        >
          <span class="flex-1">{{ group }}</span>
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
        </div>
      </template>
    </TestResult>
  </div>
</template>
```

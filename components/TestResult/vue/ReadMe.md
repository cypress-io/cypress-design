# TestResult

## Install

```bash
npm install @cypress-design/vue-testresult
```

or with yarn

```bash
yarn add @cypress-design/vue-testresult
```

## Usage

```ts
import TestResult from '@cypress-design/vue-testresult'
```

```vue live
<script lang="ts" setup>
import { ref } from 'vue'
import {
  IconActionTestReplay,
  IconChevronRightSmall,
} from '@cypress-design/vue-icon'
import Button from '@cypress-design/vue-button'

const toggled = ref(false)
</script>

<template>
  <div class="bg-white p-2">
    <TestResult
      status="passed"
      :names="['<TestResults />', 'playground']"
      flaky
      modified
      added
    >
      <template #actions>
        <Button
          variant="outline-light"
          size="32"
          class="hidden h-[32px] !px-[8px] @xl/test-result:inline-block"
          @click="toggled = !toggled"
        >
          <IconChevronRightSmall
            stroke-color="gray-500"
            :class="{
              'rotate-90': toggled,
              'transform transition-transform': true,
            }"
          />
        </Button>
      </template>
      <template v-if="toggled" #groups>
        <div
          v-for="group in ['Chrome', 'Firefox']"
          class="flex items-center border border-gray-100 px-[16px] py-[8px]"
        >
          <span class="flex-1">{{ group }}</span>
          <Button
            variant="outline-light"
            size="32"
            class="h-[32px] !px-[8px] @lg/test-result:!px-[12px]"
          >
            <IconActionTestReplay />
            <span class="ml-[8px] hidden @lg/test-result:inline">
              Test Replay
            </span>
          </Button>
        </div>
      </template>
    </TestResult>
  </div>
</template>
```

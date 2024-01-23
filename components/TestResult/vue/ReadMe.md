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
      hasGroups
    >
      <Button
        variant="outline-light"
        size="32"
        class="!px-[8px] @lg/test-result:!px-[12px] h-[32px]"
      >
        <IconActionTestReplay />
        <span class="hidden @lg/test-result:inline ml-[8px]">Test Replay</span>
      </Button>
      <Button
        variant="outline-light"
        size="32"
        class="!px-[8px] hidden @xl/test-result:inline-block h-[32px]"
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
    </TestResult>
  </div>
</template>
```

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
import { IconActionTestReplay } from '@cypress-design/vue-icon'
import Button from '@cypress-design/vue-button'
</script>

<template>
  <TestResult
    status="passed"
    :names="['Test 1', 'Test 2']"
    flaky
    modified
    added
    hasGroups
    class="bg-white"
  >
    <Button
      variant="outline-light"
      size="32"
      class="!px-[8px] @lg/test-result:!px-[12px] h-[32px]"
    >
      <IconActionTestReplay />
      <span class="hidden @lg/test-result:inline ml-[8px]">Test Replay</span>
    </Button>
  </TestResult>
</template>
```

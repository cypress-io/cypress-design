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
    </TestResult>
  </div>
</template>
```

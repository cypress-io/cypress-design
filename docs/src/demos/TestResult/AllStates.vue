<script lang="ts" setup>
import TestResult from '@cypress-design/vue-testresult'
import Button from '@cypress-design/vue-button'
import { TestResults } from '@cypress-design/constants-testresult'
import {
  IconActionTestReplay,
  IconChevronRightSmall,
} from '@cypress-design/vue-icon'
</script>

<template>
  <div class="max-h-[400px] overflow-hidden overflow-y-auto bg-white p-4">
    <TestResult v-for="tr in TestResults" :key="tr.id" v-bind="tr">
      <template #actions>
        <Button
          v-if="!tr.groups"
          variant="outline-light"
          size="32"
          class="h-[32px] !px-[8px] @lg/test-result:!px-[12px]"
        >
          <IconActionTestReplay />
          <span class="ml-[8px] hidden @lg/test-result:inline"
            >Test Replay</span
          >
        </Button>
        <Button
          v-else
          variant="outline-light"
          size="32"
          class="hidden h-[32px] !px-[8px] @xl/test-result:inline-block"
        >
          <IconChevronRightSmall stroke-color="gray-500" />
        </Button>
      </template>
      <template #groups>
        <div
          v-for="group in tr.groups"
          :key="group"
          class="flex items-center border border-t-0 border-gray-100 px-[16px] py-[10px] first:border-t"
        >
          <span class="flex-1">{{ group }}</span>
          <Button
            variant="outline-light"
            size="32"
            class="h-[32px] !px-[8px] @lg/test-result:!px-[12px]"
          >
            <IconActionTestReplay />
            <span class="ml-[8px] hidden @lg/test-result:inline"
              >Test Replay</span
            >
          </Button>
        </div>
      </template>
    </TestResult>
  </div>
</template>

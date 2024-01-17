<template>
  <div
    data-cy="test-result-container"
    class="test-result-container relative my-[-1px] hover:z-10 hover:outline outline-[3px] outline-gray-50 transition-all rounded-[1px] mix-blend-darken @container/test-result"
  >
    <div
      data-cy="test-result-row"
      class="test-result-row flex border border-gray-100 hover:border-gray-300 transition-all cursor-pointer justify-start items-center flex-nowrap px-[16px] py-[12px] @lg/test-result:py-[16px] @lg/test-result:h-[56px]"
    >
      <div
        data-cy="test-result-list"
        class="test-result-list flex justify-start items-center flex-nowrap w-[100%] h-[100%] box-content"
      >
        <div
          data-cy="test-result-icon"
          class="test-result-icon h-[16px] w-[16px] pr-[8px] box-content"
        >
          <StatusIcon
            size="16"
            :status="status"
            variant="solid"
            class="align-top"
          />
        </div>
        <template v-for="(name, index) in names" :key="index">
          <div
            data-cy="test-result-name"
            class="test-result overflow-hidden w-[max-content] min-w-[16px] h-[24px] box-content text-gray-1000 max-w-[max-content]"
            :class="{
              'test-result-first shrink-[2] basis-[max-content] text-gray-700 @lg/test-result:text-gray-1000':
                names.length >= 2 && index === 0,
              'test-result-middle shrink-[100000] basis-auto text-gray-700 @lg/test-result:text-gray-1000':
                names.length >= 2 && index > 0 && index < names.length - 1,
              'test-result-last flex shrink basis-[100%] @lg/test-result:shrink @lg/test-result:basis-[max-content]':
                index === names.length - 1,
            }"
          >
            <span
              data-cy="test-result-text"
              class="relative inline-block w-[100%] whitespace-nowrap overflow-hidden text-ellipsis min-w-[24px] left-[-4px] box-content"
              >&nbsp;{{ name }}</span
            >
          </div>
          <div
            data-cy="test-result-chevron"
            class="px-[2px] @lg/test-result:px-[4px] relative text-gray-300 shrink-0"
            v-if="index < names.length - 1"
          >
            <IconChevronRightSmall stroke-color="gray-300" class="align-top" />
          </div>
        </template>
        <div
          data-cy="test-result-attributes"
          class="flex items-center gap-x-[8px] px-[4px]"
        >
          <IconStatusFlaky data-cy="test-result-flaky" v-if="flaky" />
          <IconDocumentModifiedSquareDot
            data-cy="test-result-modified"
            v-if="modified"
          />
          <IconDocumentAddedSquarePlus
            data-cy="test-result-added"
            v-if="added"
          />
        </div>
        <div
          class="shrink-0 grow flex items-center gap-x-[12px] justify-end pl-[12px]"
        >
          <Button
            variant="outline-light"
            size="32"
            class="!px-[8px] @lg/test-result:!px-[12px] h-[32px]"
          >
            <IconActionTestReplay />
            <span class="hidden @lg/test-result:inline ml-[8px]"
              >Test Replay</span
            >
          </Button>

          <Button
            variant="outline-light"
            size="32"
            class="!px-[8px] hidden @lg/test-result:inline-block h-[32px]"
          >
            <IconChevronRightSmall stroke-color="gray-500" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '@cypress-design/vue-button'
import { StatusIcon } from '@cypress-design/vue-statusicon'
import {
  IconChevronRightSmall,
  IconStatusFlaky,
  IconDocumentModifiedSquareDot,
  IconDocumentAddedSquarePlus,
  IconActionTestReplay,
} from '@cypress-design/vue-icon'

defineProps<{
  status:
    | 'running'
    | 'failing'
    | 'passed'
    | 'failed'
    | 'unclaimed'
    | 'placeholder'
    | 'cancelled'
    | 'noTests'
    | 'errored'
    | 'timedOut'
    | 'overLimit'
    | 'skipped'
    | 'pending'
    | undefined
  flaky?: boolean
  modified?: boolean
  added?: boolean
  names: Array<string>
}>()
</script>

<style lang="scss" scoped>
// .test-result {
//   &-container {
//     container: item / inline-size;
//   }

//   &-row {
//     @container item (max-width: 600px) {
//       height: auto;
//       padding: 12px 16px;
//     }
//   }

//   &-icon {
//     @container item (max-width: 600px) {
//       position: absolute;
//       left: 16px;
//       top: 50%;
//       margin-top: -8px;
//     }
//   }

//   &-middle {
//     @container item (max-width: 600px) {
//       flex-basis: 0;
//       color: #888;
//       font-size: 14px;
//     }
//   }

//   &-first {
//     @container item (max-width: 600px) {
//       flex-basis: 0;
//       color: #888;
//       font-size: 14px;
//     }
//   }

//   &-last {
//     @container item (max-width: 600px) {
//       display: flex;
//       flex-shrink: 0;
//       flex-basis: 100%;
//     }
//   }

//   &-list {
//     @container item (max-width: 600px) {
//       flex-wrap: wrap;
//       padding-left: 28px;
//       flex-direction: row;
//     }
//   }

//   &-chevron {
//     @container item (max-width: 600px) {
//       padding: 0 4px 0 2px;
//     }
//   }
// }
</style>

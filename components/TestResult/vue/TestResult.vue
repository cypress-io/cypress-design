<template>
  <div
    data-cy="test-item-container"
    class="test-item-container relative my-[-1px] hover:z-10 hover:outline outline-[3px] outline-gray-50 transition-all rounded-[1px] mix-blend-darken @container/test-result"
  >
    <div
      data-cy="test-item-row"
      class="test-item-row flex border border-gray-100 hover:border-gray-300 transition-all cursor-pointer justify-start items-center flex-nowrap px-[16px] py-[12px] @md/test-result:py-[16px] @md/test-result:h-[52px]"
    >
      <div
        data-cy="test-item-list"
        class="test-item-list flex justify-start items-center flex-nowrap overflow-hidden w-[100%] h-[100%] box-content"
      >
        <div
          data-cy="test-item-icon"
          class="test-item-icon h-[16px] w-[16px] pr-[8px] box-content"
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
            data-cy="test-item-name"
            class="test-item overflow-hidden w-[max-content] min-w-[16px] max-w-[max-content] h-[24px] box-content text-gray-1000"
            :class="{
              'test-item-first shrink-[2] basis-[max-content] text-gray-700 @md/test-result:text-gray-1000':
                names.length >= 2 && index === 0,
              'test-item-middle shrink-[100000] basis-auto text-gray-700 @md/test-result:text-gray-1000':
                names.length >= 2 && index > 0 && index < names.length - 1,
              'test-item-last shrink basis-[max-content]':
                index === names.length - 1,
            }"
          >
            <span
              data-cy="test-item-text"
              class="relative inline-block w-[100%] whitespace-nowrap overflow-hidden text-ellipsis min-w-[24px] left-[-4px] box-content"
              >&nbsp;{{ name }}</span
            >
          </div>
          <div
            data-cy="test-item-chevron"
            class="px-[6px] relative text-gray-300"
            v-if="index < names.length - 1"
          >
            <IconChevronRightSmall stroke-color="gray-300" class="align-top" />
          </div>
        </template>
        <div
          data-cy="test-attributes"
          class="flex items-center gap-x-[8px] px-[4px]"
        >
          <IconStatusFlaky v-if="flaky" />
          <IconDocumentModifiedSquareDot v-if="modified" />
          <IconDocumentAddedSquarePlus v-if="added" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { StatusIcon } from '@cypress-design/vue-statusicon'
import {
  IconChevronRightSmall,
  IconStatusFlaky,
  IconDocumentModifiedSquareDot,
  IconDocumentAddedSquarePlus,
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
// .test-item {
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

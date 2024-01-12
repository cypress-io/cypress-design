<template>
  <div
    class="test-item-container relative my-[-1px] hover:z-10 hover:outline outline-[3px] outline-gray-50 transition-all rounded-[1px] mix-blend-darken @container"
  >
    <div
      class="test-item-row flex border border-gray-100 hover:border-gray-300 transition-all cursor-pointer justify-start items-center flex-nowrap px-[16px] h-[52px]"
      data-cy="test-item-row"
    >
      <div class="test-item-list test-item-list-describes">
        <div class="test-item-icon pr-[8px]" data-cy="test-item-icon">
          <StatusIcon size="16" :status="status" variant="solid" />
        </div>
        <template v-for="(name, index) in names" :key="index">
          <div
            data-cy="test-item-name"
            :data-index="index"
            class="test-item"
            :class="{
              'test-item-first grow shrink basis-[max-content]': index === 0,
              'test-item-middle shrink-100000 basis-auto':
                index > 0 && index < names.length - 1,
              'item-last grow shrink-0 basis-[max-content]':
                index === names.length - 1,
            }"
          >
            <span data-cy="test-item-text">&nbsp;{{ name }}</span>
          </div>
          <div class="test-item-chevron" v-if="index < name.length">
            <IconChevronRightSmall stroke-color="gray-300" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconChevronRightSmall } from '@cypress-design/vue-icon'
import { StatusIcon } from '@cypress-design/vue-statusicon'

defineProps<{
  status: string
  names: Array<string>
}>()
</script>

<style lang="scss" scoped>
.test-item {
  overflow: hidden;
  width: max-content;
  max-width: max-content;
  min-width: 16px;

  &-container {
    container: item / inline-size;
  }

  &-row {
    @container item (max-width: 600px) {
      height: auto;
      padding: 12px 16px;
    }
  }

  &-icon {
    @container item (max-width: 600px) {
      position: absolute;
      left: 16px;
      top: 50%;
      margin-top: -8px;
    }
  }

  &-middle {
    @container item (max-width: 600px) {
      flex-basis: 0;
      color: #888;
      font-size: 14px;
    }
  }

  &-first {
    @container item (max-width: 600px) {
      flex-basis: 0;
      color: #888;
      font-size: 14px;
    }
  }

  &-last {
    @container item (max-width: 600px) {
      display: flex;
      flex-shrink: 0;
      flex-basis: 100%;
    }
  }

  &-list {
    list-style: none;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    overflow: hidden;

    @container item (max-width: 600px) {
      flex-wrap: wrap;
      padding-left: 28px;
      flex-direction: row;
    }
  }

  &-chevron {
    padding: 0 8px 0 6px;
    color: #aaa;
    position: relative;
    bottom: -1px;

    @container item (max-width: 600px) {
      padding: 0 4px 0 2px;
    }
  }
}

span {
  position: relative;
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 24px;
  left: -4px;
}
</style>

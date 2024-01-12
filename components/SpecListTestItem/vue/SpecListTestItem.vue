<template>
  <div
    class="test-item-container relative my-[-1px] hover:z-10 hover:outline outline-[3px] outline-gray-50 transition-all rounded-[1px] mix-blend-darken"
  >
    <div class="test-item-row">
      <div class="test-item-list test-item-list-describes">
        <div class="test-item-icon">
          <StatusIcon size="16" status="failed" variant="solid" />
        </div>
        <template v-for="(name, index) in names" :key="index">
          <div
            class="test-item"
            :class="{
              'test-item-first': index === 0,
              'test-item-middle': index > 0 && index < name.length - 1,
              'item-last': index === name.length - 1,
            }"
          >
            <span>&nbsp;{{ name }}</span>
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
  names: Array<string>
}>()
</script>

<style lang="scss" scoped>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding: 16px;
  -webkit-font-smoothing: antialiased;
}

.test-item {
  overflow: hidden;
  width: max-content;
  max-width: max-content;
  min-width: 16px;

  &-container {
    container: item / inline-size;
  }

  &-row {
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: nowrap;
    padding: 0 16px;
    height: 52px;
    cursor: pointer;
    transition: all 150ms ease;
    @apply border border-gray-100 hover:border-gray-300;

    @container item (max-width: 600px) {
      height: auto;
      padding: 12px 16px;
    }
  }

  &-icon {
    padding-right: 8px;

    @container item (max-width: 600px) {
      position: absolute;
      left: 16px;
      top: 50%;
      margin-top: -8px;
    }
  }

  &-middle {
    flex-shrink: 100000;
    flex-basis: auto;

    @container item (max-width: 600px) {
      flex-basis: 0;
      color: #888;
      font-size: 14px;
    }
  }

  &-first {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: max-content;

    @container item (max-width: 600px) {
      flex-basis: 0;
      color: #888;
      font-size: 14px;
    }
  }

  &-last {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: max-content;

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

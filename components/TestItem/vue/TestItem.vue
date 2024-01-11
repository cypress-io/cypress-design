<template>
  <div class="test-item-container">
    <div class="test-item-row">
      <div class="test-item-list test-item-list-describes">
        <div class="test-item-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="#E45770"></circle>
            <path
              d="M6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L6.70711 5.29289ZM9.29289 10.7071C9.68342 11.0976 10.3166 11.0976 10.7071 10.7071C11.0976 10.3166 11.0976 9.68342 10.7071 9.29289L9.29289 10.7071ZM10.7071 6.70711C11.0976 6.31658 11.0976 5.68342 10.7071 5.29289C10.3166 4.90237 9.68342 4.90237 9.29289 5.29289L10.7071 6.70711ZM5.29289 9.29289C4.90237 9.68342 4.90237 10.3166 5.29289 10.7071C5.68342 11.0976 6.31658 11.0976 6.70711 10.7071L5.29289 9.29289ZM5.29289 6.70711L9.29289 10.7071L10.7071 9.29289L6.70711 5.29289L5.29289 6.70711ZM9.29289 5.29289L5.29289 9.29289L6.70711 10.7071L10.7071 6.70711L9.29289 5.29289Z"
              fill="white"
            ></path>
          </svg>
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m6 12 4-4-4-4"
              ></path>
            </svg>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  names: Array<string>
}>()
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}

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

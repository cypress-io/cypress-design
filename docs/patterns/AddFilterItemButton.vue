<template>
  <div class="dropdown" @click="isOpen = !isOpen">
    <button class="dropdown-button">
      <Icon
        name="action-add-medium"
        strokeColor="indigo-500"
        size="16"
        hoverStrokeColor="indigo-700"
      />
    </button>
    <div class="dropdown-content" v-if="isOpen">
      <div
        class="dropdown-item"
        v-for="type in filterTypes"
        :key="type"
        @click="addFilterItem(type)"
      >
        {{ type }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@cypress-design/vue-icon'

export default {
  components: {
    Icon,
  },
  data() {
    return {
      isOpen: false,
      filterTypes: [
        'Status',
        'flaky tests',
        'last modified',
        'Spec file',
        'run group',
        'browser',
        'os',
        'testing type',
      ],
    }
  },
  props: ['filterItems', 'filterTypes'],
  methods: {
    addFilterItem(filterType) {
      // Use this.filterItems instead of this.state.filterItems
      this.filterItems.push({
        open: false,
        value: null,
        selected: null,
        activeDescendant: null,
        applied: false,
        options: [],
        item: { name: filterType },
      })

      // Remove filterType from filterTypes
      const index = this.filterTypes.indexOf(filterType)
      if (index !== -1) {
        this.filterTypes.splice(index, 1)
      }
    },
  },
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content .dropdown-item {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>

<script>
import Icon from '@cypress-design/vue-icon'

export default {
  components: {
    Icon,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  props: ['filterItems', 'availableFilterItemTypes'],
  methods: {
    handleAddFilterItem(filterType) {
      this.$emit('add', filterType)
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
        v-for="type in availableFilterItemTypes"
        :key="type"
        @click="handleAddFilterItem(type)"
      >
        {{ type }}
      </div>
    </div>
  </div>
</template>

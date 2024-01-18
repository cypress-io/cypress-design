<template>
  <div>
    <button @click="isOpen = !isOpen">
      {{ label }}
    </button>
    <div v-if="isOpen">
      <ul>
        <li v-for="option in options" :key="option.value">
          <button @click="selectOption(option)">
            {{ option.label }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        // ... other options ...
      ],
      selectedOption: null,
    }
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option
      this.isOpen = false
      this.$emit('input', option.value)
    },
  },
}
</script>

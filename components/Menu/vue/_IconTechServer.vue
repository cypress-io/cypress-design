<template>
  <svg
    width="24"
    height="24"
    fill="none"
    class="stroke-gray-900 stroke-2 hover:stroke-0 hover:stroke-white transition-all duration-200 group"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    @mousedown="isActive = true"
    @mouseup="isActive = false"
  >
    <g stroke-linecap="round" clip-rule="evenodd">
      <g :transform="isActive ? `translate(0 -2)` : undefined">
        <path
          class="fill-transparent group-hover:fill-gray-200 transition-all duration-100"
          d="M2 5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Z"
        />
        <path d="M8 6 L16 6" stroke-width="2" />
        <path d="M5 6Z" stroke-width="2" />
      </g>
      <g>
        <path
          class="fill-gray-200 group-hover:fill-gray-800 transition-all duration-100"
          :transform="isActive ? `scale(1.2)` : undefined"
          fill-rule="evenodd"
          transform-origin="50% 50%"
          d="M2 11c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2Z"
        />
        <path d="M8 12 L19 12" stroke-width="2" />
        <path d="M5 12Z" stroke-width="2" />
        <!-- need a cross -->
      </g>
      <g :transform="isActive ? `translate(0 2)` : undefined">
        <path
          d="M2 17c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2Z"
          class="fill-transparent group-hover:fill-gray-200 transition-all duration-100"
        />
        <path d="M8 18L12 18" stroke-width="2" />
        <path d="M5 18Z" stroke-width="2" />
      </g>
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isActive = ref(false)
</script>

<script lang="ts" setup>
defineProps<{
  isActive?: boolean
}>()

const dSmallBubble = `m20,18
      a2,2 0 0 0 2,-2
      l0,-6
      a2,2 0 0 0 -2,-2
      l-8,0
      a2,2 0 0 0 -2,2
      l0,6
      c0,1 1,2 2,2
      l2,0
      l5,2.5
      a0,0 0 0 0 0,0
      l0,-2.5
      l1,0z`

const dSmallBubbleModded = `m19,18
      a3,3 0 0 0 3,-3
      l0,-4
      a3,3 0 0 0 -3,-3
      l-6,0
      a3,3 0 0 0 -3,3
      l0,4
      c0,2 2,3 3,3
      l1,0
      l4,2
      a3,10 0 0 0 1,-0.5
      l0,-1.5
      l0,0z`
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path
      stroke="#1B1E2E"
      stroke-linejoin="round"
      stroke-width="2"
      :d="dSmallBubble"
    >
      <animate
        attributeName="d"
        dur="1s"
        repeatCount="once"
        :values="`${dSmallBubble};${dSmallBubbleModded};${dSmallBubble};`"
      />
    </path>
    <path
      fill="#BFC2D4"
      stroke="#1B1E2E"
      stroke-linejoin="round"
      stroke-width="2"
      d="M17 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6c0 1.1.9 2 2 2h1v2.5l5-2.5h5a2 2 0 0 0 2-2V6Z"
    />
    <circle cx="6" cy="9" r="1" fill="#1B1E2E" />
    <circle cx="9.5" cy="9" r="1" fill="#1B1E2E" />
    <circle cx="13" cy="9" r="1" fill="#1B1E2E" />
  </svg>
</template>

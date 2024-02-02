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
      l1,0Z`.replace(/\n {6}/g, ' ')

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
      l0,0Z`.replace(/\n {6}/g, ' ')

const dBigBubble = `m17 6
    a2 2 0 0 0-2-2
    h-11
    a2 2 0 0 0-2 2
    v6
    a2 2 0 0 0 2 2
    h1
    v2.5
    c0.1 .1.1 .1 .1 .1
    l5-2.5
    h5
    a2 2 0 0 0 2-2
    v-3Z`.replace(/\n {4}/g, ' ')

const dBigBubbleModded = `m17 7
    a3 3 0 0 0-3-3
    h-9
    a3 3 0 0 0-3 3
    v4
    a3 3 0 0 0 3 3
    h0
    v1.3
    c0 .5.6 1 1 .7
    l4-2
    h4
    a3 3 0 0 0 3-3
    v-2Z`.replace(/\n {4}/g, ' ')

const duration = '1s'
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
        :dur="duration"
        repeatCount="once"
        :values="`${dSmallBubble};${dSmallBubbleModded};${dSmallBubble};`"
      />
      <animate
        attributeName="stroke-width"
        :dur="duration"
        repeatCount="once"
        :values="`2;0;2;`"
      />
      <animate
        attributeName="fill"
        :dur="duration"
        repeatCount="once"
        :values="`transparent;#9095AD;transparent;`"
      />
    </path>
    <path
      fill="#BFC2D4"
      stroke="#1B1E2E"
      stroke-linejoin="round"
      stroke-width="2"
      :d="dBigBubble"
    >
      <animate
        attributeName="d"
        :dur="duration"
        repeatCount="once"
        :values="`${dBigBubble};${dBigBubbleModded};${dBigBubble};`"
      />
      <animate
        attributeName="stroke-width"
        :dur="duration"
        repeatCount="once"
        :values="`2;0;2;`"
      />
      <animate
        attributeName="fill"
        :dur="duration"
        repeatCount="once"
        :values="`transparent;#1B1E2E;transparent;`"
      />
    </path>
    <circle cx="6" cy="9" r="1" fill="#1B1E2E">
      <animate
        attributeName="fill"
        :dur="duration"
        repeatCount="once"
        :values="`#1B1E2E;#FFFFFF;#1B1E2E;`"
      />
    </circle>
    <circle cx="9.5" cy="9" r="1" fill="#1B1E2E">
      <animate
        attributeName="fill"
        :dur="duration"
        repeatCount="once"
        :values="`#1B1E2E;#FFFFFF;#1B1E2E;`"
      />
    </circle>
    <circle cx="13" cy="9" r="1" fill="#1B1E2E">
      <animate
        attributeName="fill"
        :dur="duration"
        repeatCount="once"
        :values="`#1B1E2E;#FFFFFF;#1B1E2E;`"
      />
    </circle>
  </svg>
</template>

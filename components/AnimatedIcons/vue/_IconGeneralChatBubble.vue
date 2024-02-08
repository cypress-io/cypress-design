<script lang="ts" setup>
defineProps<{
  isActive?: boolean
}>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    :class="{
      active: isActive,
    }"
  >
    <path
      stroke="#1B1E2E"
      stroke-linejoin="round"
      stroke-width="2"
      d="m19,18 a2,2 0 0 0 2,-2 v-6 a2,2 0 0 0 -2,-2 h-2 v2 a3 3 0 0 1 -3 3 h-4 v2 c0,2 2,3 3,3 h1 l4,2 a3,10 0 0 0 1,-0.5 l0,-1.5 l0,0Z"
      class="small-bubble"
    />
    <path
      fill="#BFC2D4"
      stroke="#1B1E2E"
      stroke-linejoin="round"
      stroke-width="2"
      d="m17 6 a2 2 0 0 0-2-2 h-11 a2 2 0 0 0-2 2 v6 a2 2 0 0 0 2 2 h1 v2.5 c0.1 .1.1 .1 .1 .1 l5-2.5 h5 a2 2 0 0 0 2-2 v-3Z"
      class="big-bubble"
    />
    <circle cx="6" cy="9" r="1" fill="#1B1E2E" class="dots dot1" />
    <circle cx="9.5" cy="9" r="1" fill="#1B1E2E" class="dots dot2" />
    <circle cx="13" cy="9" r="1" fill="#1B1E2E" class="dots dot3" />
  </svg>
</template>

<style scoped>
svg .small-bubble,
svg .big-bubble,
svg .dots {
  transition: all 0.3s;
}

svg:hover .small-bubble {
  fill: #9095ad;
  stroke-width: 0;
  d: path(
    'm19,18 a3,3 0 0 0 3,-3 v-4 a3,3 0 0 0 -3,-3 h-2 v3 a3 3 0 0 1 -3 3 h-4 v1 c0,2 2,3 3,3 h1 l4,2 a3,10 0 0 0 1,-0.5 l0,-1.5 l0,0Z'
  );
}

svg:hover .big-bubble {
  fill: #1b1e2e;
  stroke-width: 0;
  d: path(
    'm17 7 a3 3 0 0 0-3-3 h-9 a3 3 0 0 0-3 3 v4 a3 3 0 0 0 3 3 h0 v1.3 c0 .5.6 1 1 .7 l4-2 h4 a3 3 0 0 0 3-3 v-2Z'
  );
}

svg:hover .dots {
  fill: #ffffff;
  cy: 9;
}

svg:hover .dot1 {
  cx: 6;
}
svg:hover .dot2 {
  cx: 9.5;
}

svg:hover .dot3 {
  cx: 13;
}

.active > .big-bubble {
  fill: #1b1e2e;
  stroke-width: 0;
  d: path(
    'm16 5.5 a3 3 0 0 0-3-3 h-9 a3 3 0 0 0-3 3 v5 a3 3 0 0 0 3 3 h0 v1.3 c0 .5.6 1 1 .7 l4-2 h4 a3 3 0 0 0 3-3 v-2Z'
  );
}

.active .small-bubble {
  fill: #9095ad;
  stroke-width: 0;
  d: path(
    'm19,19.5 a3,3 0 0 0 3,-3 v-5 a3,3 0 0 0 -3,-3 h-2 v2 a4 4 0 0 1 -4 4 h-3 v2 c0,2 2,3 3,3 h1 l4,2 a3,10 0 0 0 1,-0.5 l0,-1.5 l0,0Z'
  );
}

.active .dots {
  fill: #ffffff;
  cy: 8;
}

.active .dot1 {
  cx: 5;
}
.active .dot2 {
  cx: 8.5;
}

.active .dot3 {
  cx: 12;
}
</style>

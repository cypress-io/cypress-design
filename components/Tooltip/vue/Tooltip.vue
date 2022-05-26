<template>
  <div class="group relative">
    <slot />
    <div
      class="absolute hidden border rounded border-gray-100 p-8px text-16px leading-24px min-w-160px text-center group-hover:block">
      <svg viewPort="0 0 9 22" width="22" height="9" class="absolute -top-9px stroke-gray-100 fill-white" fill="none">
        <path
          d="M 0.029 9.038 C 1.546 9.034 3.001 8.419 4.074 7.323 L 8.955 2.327 C 10.072 1.183 11.882 1.183 12.999 2.327 L 17.881 7.323 C 18.953 8.419 20.406 9.034 21.926 9.038">
        </path>
      </svg>
      <slot name="popover" />
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    color?: 'light' | 'dark'
  }>(),
  {
    color: 'light'
  }
)
</script>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { statuses, variants, sizes } from '@cypress-design/constants-statusicon'
import { StatusIcon } from '@cypress-design/vue-statusicon'

const statusNames = Object.keys(statuses)
const sizeSlider = ref(3)
const size = computed(() => sizes[sizeSlider.value])
</script>

<template>
  <div class="flex items-center gap-4 mb-4">
    Size <input type="range" min="0" max="4" step="1" v-model="sizeSlider" />
    {{ size }}
  </div>
  <table>
    <tbody>
      <tr>
        <th>&nbsp;</th>
        <th v-for="variant in variants" :key="variant" class="w-[100px]">
          {{ variant }}
        </th>
      </tr>
      <tr v-for="status in statusNames" :key="status" class="text-center">
        <td class="text-right">{{ status }}</td>
        <td v-for="variant in variants" :key="variant">
          <StatusIcon :status="status" :variant="variant" :size="size" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

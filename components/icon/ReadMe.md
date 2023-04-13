<script lang="ts" setup>
import { iconsMetadata } from '@cypress-design/icon-registry';
import Icon from '@cypress-design/vue-icon'
</script>

# Icon

<div class="grid grid-cols-4 bg-white dark:bg-gray-700 gap-[8px] max-w-[86vw] justify-items-center items-center h-[50vh] overflow-auto py-[16px] my-[32px] border border-gray-50 shadow">
  <div class="h-[48px] text-center flex flex-col items-center justify-end gap-[8px]" v-for="icon, iconName of iconsMetadata" :key="iconName">
    <Icon :name="iconName" />
    <p class="text-[10px] whitespace-nowrap overflow-hidden">{{ iconName }}</p>
  </div>
</div>

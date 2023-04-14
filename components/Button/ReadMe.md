<script lang="ts" setup>
import Button from '@cypress-design/vue-button'
import { VariantClassesTable, SizeClassesTable } from './constants'
</script>

# Button

<DemoWrapper>
  <div class="grid grid-cols-4 gap-x-[16px] gap-y-[32px]">
    <div v-for="(_,variant) in VariantClassesTable" class="py-[16px] flex flex-col items-center gap-[16px]" :class="{'bg-gray-900 text-white':variant === 'outline-dark'}">
      <div class="flex gap-[8px]" v-for="(_,size) in SizeClassesTable">
        {{ size }}
        <Button :variant="variant" :size="size">
          {{ variant }}
        </Button>
      </div>
    </div>
  </div>
	
</DemoWrapper>

The button component is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.

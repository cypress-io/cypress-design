<script lang="ts" setup>
import { ref, computed } from 'vue'
import { statuses, variants, sizes } from '@cypress-design/constants-statusicon'
import { StatusIcon } from '@cypress-design/vue-statusicon'

const statusNames = Object.keys(statuses)
const sizeSlider = ref(3)
const size = computed(() => sizes[sizeSlider.value])
</script>

# StatusIcon

<DemoWrapper>
  <div class="flex items-center gap-4">
    Size  <input type="range" min="0" max="4" step="1" v-model="sizeSlider"> {{size}} 
  </div>
	<table>
    <tbody>
      <tr>
        <th>&nbsp;</th>
        <th v-for="variant in variants" class="w-[100px]">{{variant}}</th>
      </tr>
      <tr v-for="status in statusNames" class="text-center">
        <td class="text-right">{{status}}</td>
        <td v-for="variant in variants">
          <StatusIcon :status="status" :variant="variant" :size="size" />
        </td>
      </tr>
    </tbody>
  </table>
</DemoWrapper>

The status icon component is used to display a status icon.

## Figma Link

Status Icons are defined in the `Icons` page of our Figma Design System.

[figma::Icons](https://www.figma.com/design/1WJ3GVQyMV5e7xVxPg3yID/Design-System?node-id=6814-10840&t=Xw29fKu9ZdgvIJki-4)

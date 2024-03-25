<script lang="ts" setup>
import { CypressMark, CypressLockUp } from '@cypress-design/vue-logo'
</script>

# Logo

<DemoWrapper>
  <div class="flex items-center justify-center gap-8 mb-4">
    <div class="p-4">
      <CypressLockUp class="w-[119px] h-[48px]" />
    </div>
    <div class="p-4">
      <CypressLockUp class="w-[119px] h-[48px]" variant="color-dark" />
    </div>
    <div class="bg-gray-1000 p-4 rounded">
      <CypressLockUp class="w-[119px] h-[48px]" variant="color-white" />
    </div>
  </div>
  <div class="flex items-center justify-center gap-8">
    <div class="p-4">
      <CypressMark class="w-[48px] h-[48px]" />
    </div>
    <div class="p-4">
      <CypressMark class="w-[48px] h-[48px]" variant="color-dark" />
    </div>
    <div class="p-4 bg-gray-1000 rounded">
      <CypressMark class="w-[48px] h-[48px]" variant="color-white" />
    </div>
  </div>
</DemoWrapper>

The Cypress logo is a visual representation of the brand or product. It can be an image, or a combination of both an image and a word.

For just the icon use the `CypressMark` component, and for the icon with the wordmark use the `CypressLockUp` component.

[figma::Logo](https://www.figma.com/file/1WJ3GVQyMV5e7xVxPg3yID/Design-System?type=design&node-id=3125-4344&mode=design&t=Vy6yz2hD7pjlD3N1-4)

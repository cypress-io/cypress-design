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
    <div class="p-4 rounded bg-gray-1000">
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
    <div class="p-4 rounded bg-gray-1000">
      <CypressMark class="w-[48px] h-[48px]" variant="color-white" />
    </div>
  </div>
</DemoWrapper>

The Cypress logo is a visual representation of the brand or product. It can be an image, or a combination of both an image and a word.

For just the icon use the `CypressMark` component, and for the icon with the wordmark use the `CypressLockUp` component.

[figma::Logo](https://www.figma.com/design/MInXXOFULhBbdflyvAdjdh/Component---Logos--v1.x----latest?node-id=7-36)

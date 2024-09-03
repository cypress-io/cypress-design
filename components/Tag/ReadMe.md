<script lang="ts" setup>
import { CssSize, CssColor } from '@cypress-design/constants-tag'
import Tag from '@cypress-design/vue-tag'
</script>

# Tag

<DemoWrapper>
	<Tag color="jade" class="px-[8px]">Tag</Tag>
  <div class="flex flex-row flex-wrap items-start justify-center bg-gray-700 gap-6 mt-5">
    <div v-for="size of Object.keys(CssSize)" class="flex flex-col items-center gap-3 justify-center my-4 p-4 bg-white rounded-lg">
      <h3 class="text-right">{{size}}</h3>
      <div v-for="color of Object.keys(CssColor)" class="flex gap-4 items-center justify-stretch">
        <div class="flex items-center justify-center">
          <Tag :size="size" :color="color">
            {{color}}
          </Tag>
        </div>
        <div class="flex items-center justify-center">
          <Tag :size="size" :color="color" dark>
            {{color}}
          </Tag>
        </div>
      </div>
    </div>
  </div>
</DemoWrapper>

[figma::Tag](https://www.figma.com/file/1WJ3GVQyMV5e7xVxPg3yID/Design-System%2C-v1.x---%40latest?node-id=1950-2659&t=XOxzeAZJ0mBFwEHV-4)

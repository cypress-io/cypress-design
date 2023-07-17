<script lang="ts" setup>
import {ref} from 'vue'
import Modal from '@cypress-design/vue-modal'
import Button from '@cypress-design/vue-button'
const visible = ref(false)
</script>

# Modal

As a general rule, modals are used when a quick action is required by the user. They should be avoided when a dedicated page is a preferrable due to the limitations of screen size, preserving browser history, etc.

<DemoWrapper>
	<Modal v-model:show="visible" title="modal">
    Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Id perspiciatis hic ad minima ex recusandae autem
    incidunt, perferendis, illo voluptatum repudiandae iste voluptate
    reiciendis quam officiis voluptas laboriosam eligendi explicabo!
  </Modal>
  <Button @click="visible = true">Open Modal</Button>
</DemoWrapper>

[figma::Modal](https://www.figma.com/file/1WJ3GVQyMV5e7xVxPg3yID/Design-System%2C-v1.x---%40latest?type=design&node-id=11381-16819&t=eTHkHYIn7QpvUPjI-4)

<script lang="ts" setup>
import {ref} from 'vue'
import Modal from '@cypress-design/vue-modal'
import Button from '@cypress-design/vue-button'
const visible = ref(false)
</script>

# Modal

<DemoWrapper>
	<Modal v-model="visible" title="modal">
    Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Id perspiciatis hic ad minima ex recusandae autem
    incidunt, perferendis, illo voluptatum repudiandae iste voluptate
    reiciendis quam officiis voluptas laboriosam eligendi explicabo!
  </Modal>
  <Button @click="visible = true">Open Modal</Button>
</DemoWrapper>

Describe your component here.

[figma::Modal](https://www.figma.com/file/1WJ3GVQyMV5e7xVxPg3yID/Design-System%2C-v1.x---%40latest?type=design&node-id=11381-16819&t=eTHkHYIn7QpvUPjI-4)

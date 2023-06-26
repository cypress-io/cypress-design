import { ref } from 'vue'
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import Modal from './Modal.vue'

describe('<Modal/>', () => {
  function mountStory(options: {
    title?: string
    helpLink?: string
    fullscreen?: boolean
  }) {
    const visibleModal = ref(false)
    mount(() => (
      <div>
        <div class="h-[900px] w-[50px] bg-red-200"></div>
        <button onClick={() => (visibleModal.value = true)}>Open Modal</button>
        <div class="h-[900px] w-[50px] bg-red-200"></div>
        <Modal {...options} v-model:show={visibleModal.value}>
          <p>
            Contents of the modal: Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Id perspiciatis hic ad minima ex recusandae autem
            incidunt, perferendis, illo voluptatum repudiandae iste voluptate
            reiciendis quam officiis voluptas laboriosam eligendi explicabo!
          </p>
        </Modal>
      </div>
    ))
  }
  assertions(mountStory)
})

/// <reference types="cypress" />
import { ref } from 'vue'
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import Modal from './Modal.vue'

describe('<Modal/>', () => {
  function mountStory(options: { title?: string; helpLink?: string }) {
    const visibleModal = ref(false)
    mount(() => (
      <div>
        <div class="h-[900px] w-[50px] bg-red-200"></div>
        <button onClick={() => (visibleModal.value = true)}>Open Modal</button>
        <div class="h-[900px] w-[50px] bg-red-200"></div>
        <Modal {...options} v-model={visibleModal.value}>
          Contents of the modal
        </Modal>
        <div id="modal-target"></div> {/* for portal */}
      </div>
    ))
  }
  assertions(mountStory)
})

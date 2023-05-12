/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import ModalStory from './Modal.rootstory'
import assertions from '../assertions'

describe('Modal', () => {
  function mountStory(options: Parameters<typeof ModalStory>[0] = {}) {
    mount(<ModalStory {...options} />)
  }
  assertions(mountStory)
})

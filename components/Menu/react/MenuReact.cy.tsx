/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import Menu from './Menu'
import assertions from '../assertions'

describe('Menu', () => {
  function mountStory(options: Parameters<typeof Menu>[0] = { id: '1' }) {
    mount(<Menu {...options} />)
  }
  assertions(mountStory)
})

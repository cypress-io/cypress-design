/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders', () => {
    mount(<Spinner />)
  })
})

/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import Radio from './Radio.vue'

describe('<Radio/>', () => {
  it('renders with label text', () => {
    mount(() => <Radio label="Hello" id="radio" />)
  })

  it('renders without label text', () => {
    mount(() => <Radio label="Hello" id="radio" />)
  })

  it('changes when the label is clicked', () => {
    mount(() => <Radio label="Hello" id="radio" />)
  })

  it('changes when the radio is clicked', () => {
    mount(() => <Radio label="Hello" id="radio" />)
  })
})

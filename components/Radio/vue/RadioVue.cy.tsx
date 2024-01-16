/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import Radio from './Radio.vue'

describe('<Radio/>', () => {
  it('renders with label text as a string', () => {
    mount(() => <Radio label="Hello" id="some-radio" />)
  })

  it('renders with label text as a component', () => {
    mount(() => <Radio label="Hello" id="some-radio" />)
  })

  it('renders without label text', () => {
    mount(() => <Radio label="Hello" id="some-radio" />)
  })

  it('changes when the label is clicked', () => {
    mount(() => <Radio label="Hello" id="some-radio" />)
  })

  it('changes when the radio is clicked', () => {
    mount(() => <Radio label="Hello" id="some-radio" />)
  })

  it('cannot be clicked when disabled', () => {
    mount(() => <Radio label="Hello" id="some-radio" disabled />)
  })

  it('can be marked as checked, even if disabled', () => {
    mount(() => <Radio label="Hello" id="some-radio" disabled checked />)
  })
})

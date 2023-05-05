import { IconObjectBookCode } from './index'
import { mount } from 'cypress/vue'

describe('Icon', () => {
  it('renders correctly', () => {
    mount(() => (
      <IconObjectBookCode
        fillColor="red-100"
        strokeColor="red-500"
        secondaryFillColor="indigo-100"
        secondaryStrokeColor="indigo-600"
      />
    ))
  })
})

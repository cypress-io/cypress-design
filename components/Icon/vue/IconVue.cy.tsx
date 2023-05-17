import assertions from '../assertions'
import Icon, { IconDocumentBlank, IconObjectBookCode } from './index'
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

  assertions((props) => {
    if (props.name) {
      return mount(() => <Icon {...props} />)
    }
    mount(() => <IconDocumentBlank {...props} />)
  })
})

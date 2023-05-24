import assertions from '../assertions'
import Icon, {
  IconDocumentBlank,
  IconObjectBookCode,
  IconBrowserWebkit,
} from './index'
import { mount } from 'cypress/vue'

describe('Icon', { viewportWidth: 80, viewportHeight: 80 }, () => {
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

  it('renders multiple times an icon with defs with the Icon comp', () => {
    mount(() => (
      <div class="p-2">
        <Icon name="browser-webkit" class="w-16 h-16 hidden" />
        <Icon name="browser-webkit" class="w-16 h-16" />
      </div>
    ))
  })

  it('renders multiple times an icon with defs', () => {
    mount(() => (
      <div class="p-2">
        <IconBrowserWebkit class="w-16 h-16 hidden" />
        <IconBrowserWebkit class="w-16 h-16" />
      </div>
    ))
  })
})

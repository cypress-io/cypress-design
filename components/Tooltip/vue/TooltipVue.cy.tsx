/// <reference types="cypress" />
import { IconActionQuestionMarkCircle } from '@cypress-design/vue-icon'
import { mount } from 'cypress/vue'
import TooltipStory from './Tooltip.rootstory'
import Tooltip from './Tooltip.vue'
import assertions from '../assertions'

describe('<Tooltip />', { viewportHeight: 800, viewportWidth: 800 }, () => {
  function mountStory(options: Parameters<typeof TooltipStory>[0] = {}) {
    mount(() => <TooltipStory {...options} tabIndex={1} />)
  }

  assertions(mountStory)

  it('does not blink', () => {
    mount(() => (
      <div class="h-400px flex items-center justify-center">
        <Tooltip placement="top-end" interactive>
          {{
            default: () => (
              <button class="cursor-default">
                <IconActionQuestionMarkCircle />
              </button>
            ),
            popper: () => <div class="bg-jade-200 p-4">Popov Blinky</div>,
          }}
        </Tooltip>
      </div>
    ))
  })
})

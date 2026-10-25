/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions, { waitForTooltipsToPosition } from '../assertions'
import { ComponentProps } from '../../vue-utils'
import Tooltip from './Tooltip.vue'

const TooltipMulti = ({
  color = 'light',
  placement,
  tabindex = 0,
  disabled,
}: ComponentProps<typeof Tooltip> & { tabindex?: number } = {}) => (
  <div class="center flex flex-col items-center gap-20">
    <Tooltip
      class="w-1/2 bg-red-200 p-4"
      placement={placement}
      color={color}
      // @ts-expect-error TSX in volar has a tendency to be a bit wrong, this would work in a template
      tabindex={tabindex}
      disabled={disabled}
    >
      {{
        default: () => <div>Hover Me (dynamic: {placement?.toString()})</div>,
        popper: () => <div class="bg-jade-200 p-4 text-gray-800">PopovDyn</div>,
      }}
    </Tooltip>
    <Tooltip
      class="w-1/2 bg-red-200 p-4"
      color={color}
      placement="top"
      forcePlacement
    >
      {{
        default: () => <div>Force Placement to the top</div>,
        popper: () => (
          <div class="flex h-[200px] items-center justify-center">Popov</div>
        ),
      }}
    </Tooltip>
    <Tooltip
      class="w-1/2 bg-red-200 p-4"
      color={color}
      placement={placement}
      interactive
    >
      {{
        default: () => <div>Interactive {placement?.toString()}</div>,
        popper: () => <div>PopovInt</div>,
      }}
    </Tooltip>
    {(['top', 'right', 'bottom', 'left', 'top-start'] as const).map(
      (placement) => (
        <Tooltip
          class="w-1/2 bg-indigo-200 p-4"
          placement={placement}
          color={color}
          // @ts-expect-error TSX in volar has a tendency to be a bit wrong
          tabindex={tabindex}
          disabled={disabled}
        >
          {{
            default: () => <div>Hover Me ({placement})</div>,
            popper: () => (
              <div class="bg-jade-200 p-4 text-gray-900">
                Popover ({placement})
              </div>
            ),
          }}
        </Tooltip>
      ),
    )}
  </div>
)

describe('<Tooltip />', { viewportHeight: 800, viewportWidth: 800 }, () => {
  function mountStory(
    options: { single?: boolean } & Parameters<typeof TooltipMulti>[0] = {},
  ) {
    const { single, tabindex = 0, ...rest } = options
    if (single) {
      mount(() => (
        <Tooltip
          {...rest}
          class="m-4 w-[150px] bg-red-300 p-4"
          // @ts-expect-error TSX in volar has a tendency to be a bit wrong, this would work in a template
          tabindex={tabindex}
          placement="bottom-start"
        >
          {{
            default: () =>
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            popper: () => (
              <div class="w-[300px]">
                popit: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatum.
              </div>
            ),
          }}
        </Tooltip>
      ))
    } else {
      mount(() => <TooltipMulti {...rest} tabindex={tabindex} />)
    }
  }

  assertions(mountStory, 'vue')

  it('open', () => {
    mount(() => (
      <div class="text-center">
        <Tooltip class="m-16 inline-block border p-3" open>
          {{
            default: () => 'make sure its open',
            popper: () => <div>should be visible</div>,
          }}
        </Tooltip>
      </div>
    ))
    cy.findByText('should be visible').should('be.visible')
  })

  it('arrowPadding', () => {
    mount(() => (
      <div class="center flex flex-col items-center gap-20 bg-gray-1000">
        {(
          [
            'bottom-start',
            'bottom-end',
            'left-start',
            'left-end',
            'right-start',
            'right-end',
            'top-start',
            'top-end',
          ] as const
        ).map((placement) => (
          <Tooltip
            class="w-1/2 bg-indigo-200 p-4"
            placement={placement}
            arrowPadding={1}
            open
          >
            {{
              default: () => <div>Hover Me ({placement})</div>,
              popper: () => <div class="bg-jade-200 p-4 text-gray-900">H</div>,
            }}
          </Tooltip>
        ))}
      </div>
    ))

    waitForTooltipsToPosition()
    cy.percySnapshot()
  })

  it('shiftOptions', () => {
    mount(() => (
      <div class="flex h-[400px] w-[200px] items-center justify-center">
        <Tooltip
          class="bg-indigo-200 p-4"
          placement="bottom"
          shiftOptions={{ padding: 50 }}
          open
        >
          {{
            default: () => <div>Tooltip with custom shift padding</div>,
            popper: () => (
              <div class="bg-jade-200 p-4 text-gray-900">
                Custom shift padding of 50px
              </div>
            ),
          }}
        </Tooltip>
      </div>
    ))

    cy.findByText('Custom shift padding of 50px').should('be.visible')
  })

  it('offsetOptions', () => {
    mount(() => (
      <div class="center flex flex-col items-center gap-40">
        <Tooltip
          class="bg-indigo-200 p-4"
          placement="bottom"
          offsetOptions={40}
          open
        >
          {{
            default: () => <div>Tooltip with offset 40px</div>,
            popper: () => (
              <div class="bg-jade-200 p-4 text-gray-900">Offset 40px</div>
            ),
          }}
        </Tooltip>
        <Tooltip
          class="bg-red-200 p-4"
          placement="bottom"
          offsetOptions={5}
          open
        >
          {{
            default: () => <div>Tooltip with offset 5px</div>,
            popper: () => (
              <div class="bg-jade-200 p-4 text-gray-900">Offset 5px</div>
            ),
          }}
        </Tooltip>
      </div>
    ))

    cy.findByText('Offset 40px').should('be.visible')
    cy.findByText('Offset 5px').should('be.visible')
    waitForTooltipsToPosition()
    cy.percySnapshot()
  })
})

/// <reference types="cypress" />
import { mount } from 'cypress/vue'
import assertions from '../assertions'
import { ComponentProps } from '../../vue-utils'
import { ref } from 'vue'
import Tooltip from './Tooltip.vue'

const TooltipMulti = ({
  color = 'light',
  placement,
  tabindex = 1,
  disabled,
}: ComponentProps<typeof Tooltip> & { tabindex?: number } = {}) => (
  <div class="flex flex-col items-center center gap-20">
    <Tooltip
      class="w-1/2 p-4 bg-red-200"
      placement={placement}
      color={color}
      // @ts-expect-error TSX in volar has a tendency to be a bit wrong, this would work in a template
      tabindex={tabindex}
      disabled={disabled}
    >
      {{
        default: () => <div>Hover Me (dynamic: {placement?.toString()})</div>,
        popper: () => <div class="p-4 bg-jade-200">PopovDyn</div>,
      }}
    </Tooltip>
    <Tooltip
      class="w-1/2 p-4 bg-red-200"
      color={color}
      placement="top"
      forcePlacement
    >
      {{
        default: () => <div>Force Placement to the top</div>,
        popper: () => (
          <div class="h-[200px] flex items-center justify-center">Popov</div>
        ),
      }}
    </Tooltip>
    <Tooltip
      class="w-1/2 p-4 bg-red-200"
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
          class="w-1/2 p-4 bg-indigo-200"
          placement={placement}
          color={color}
          // @ts-expect-error TSX in volar has a tendency to be a bit wrong
          tabindex={tabindex}
          disabled={disabled}
        >
          {{
            default: () => <div>Hover Me ({placement})</div>,
            popper: () => (
              <div class="p-4 bg-jade-200 text-gray-900">
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
    const { single, tabindex = 1, ...rest } = options
    if (single) {
      mount(() => (
        <Tooltip
          {...rest}
          class="m-4 p-4 bg-red-300 w-[150px]"
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
        <Tooltip class="border inline-block m-16 p-3" open>
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
      <div class="flex flex-col items-center center gap-20 bg-gray-1000">
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
            class="w-1/2 p-4 bg-indigo-200"
            placement={placement}
            arrowPadding={1}
            open
          >
            {{
              default: () => <div>Hover Me ({placement})</div>,
              popper: () => <div class="p-4 bg-jade-200 text-gray-900">H</div>,
            }}
          </Tooltip>
        ))}
      </div>
    ))

    cy.percySnapshot()
  })

  it('shiftOptions', () => {
    mount(() => (
      <div class="flex items-center justify-center h-[400px] w-[200px]">
        <Tooltip
          class="p-4 bg-indigo-200"
          placement="bottom"
          shiftOptions={{ padding: 50 }}
          open
        >
          {{
            default: () => <div>Tooltip with custom shift padding</div>,
            popper: () => (
              <div class="p-4 bg-jade-200 text-gray-900">
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
      <div class="flex flex-col items-center center gap-40">
        <Tooltip
          class="p-4 bg-indigo-200"
          placement="bottom"
          offsetOptions={40}
          open
        >
          {{
            default: () => <div>Tooltip with offset 40px</div>,
            popper: () => (
              <div class="p-4 bg-jade-200 text-gray-900">Offset 40px</div>
            ),
          }}
        </Tooltip>
        <Tooltip
          class="p-4 bg-red-200"
          placement="bottom"
          offsetOptions={5}
          open
        >
          {{
            default: () => <div>Tooltip with offset 5px</div>,
            popper: () => (
              <div class="p-4 bg-jade-200 text-gray-900">Offset 5px</div>
            ),
          }}
        </Tooltip>
      </div>
    ))

    cy.findByText('Offset 40px').should('be.visible')
    cy.findByText('Offset 5px').should('be.visible')
    cy.percySnapshot()
  })
  describe('keyboard', () => {
    const InteractiveTooltip = ({
      withAfter = true,
    }: {
      withAfter?: boolean
    }) => (
      <div class="mt-[200px] flex gap-4 p-4">
        <button data-cy="before">before</button>
        <Tooltip interactive placement="top">
          {{
            default: ({ describedBy }: { describedBy?: string }) => (
              <button data-cy="trigger" aria-describedby={describedBy}>
                trigger text
              </button>
            ),
            popper: () => (
              <div>
                Tooltip copy <a href="#learn-more">Learn more</a>
              </div>
            ),
          }}
        </Tooltip>
        {withAfter ? <button data-cy="after">after</button> : null}
      </div>
    )

    it('opens on keyboard focus and closes on Escape', () => {
      mount(() => <InteractiveTooltip />)
      cy.get('[data-cy="before"]').focus()
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'trigger')
      cy.get('[role="tooltip"]').should('be.visible')
      cy.realPress('Escape')
      cy.get('[role="tooltip"]').should('not.be.visible')
      cy.focused().should('have.attr', 'data-cy', 'trigger')
    })

    it('tabs from the trigger into the popper, back, and on to the next control', () => {
      mount(() => <InteractiveTooltip />)
      cy.get('[data-cy="before"]').focus()
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.focused().should('have.text', 'Learn more')
      cy.get('[role="tooltip"]').should('be.visible')
      cy.realPress(['Shift', 'Tab'])
      cy.focused().should('have.attr', 'data-cy', 'trigger')
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'after')
      cy.get('[role="tooltip"]').should('not.be.visible')
    })

    it('closes on Escape from inside the popper and returns focus to the trigger', () => {
      mount(() => <InteractiveTooltip />)
      cy.get('[data-cy="before"]').focus()
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.focused().should('have.text', 'Learn more')
      cy.realPress('Escape')
      cy.focused().should('have.attr', 'data-cy', 'trigger')
      cy.get('[role="tooltip"]').should('not.be.visible')
    })

    it('does not loop back into the popper when the trigger is the last control', () => {
      mount(() => <InteractiveTooltip withAfter={false} />)
      cy.get('[data-cy="before"]').focus()
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.focused().should('have.text', 'Learn more')
      cy.realPress('Tab')
      cy.get('[role="tooltip"] a').should('not.be.focused')
      cy.get('[role="tooltip"]').should('not.be.visible')
    })

    it('skips disabled and tabindex="-1" controls in the popper', () => {
      mount(() => (
        <div class="mt-[200px] flex gap-4 p-4">
          <button data-cy="before">before</button>
          <Tooltip interactive placement="top">
            {{
              default: () => <button data-cy="trigger">trigger text</button>,
              popper: () => (
                <div>
                  <button disabled>disabled</button>
                  <a href="#skipped" tabindex={-1}>
                    skipped
                  </a>
                  <a href="#reachable">reachable</a>
                </div>
              ),
            }}
          </Tooltip>
          <button data-cy="after">after</button>
        </div>
      ))
      cy.get('[data-cy="before"]').focus()
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.focused().should('have.text', 'reachable')
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'after')
    })

    it('describes the trigger with the tooltip copy', () => {
      mount(() => <InteractiveTooltip />)
      cy.get('[data-cy="trigger"]')
        .should('have.attr', 'aria-describedby')
        .then((id) => {
          cy.get(`[id="${id}"]`).should('have.text', 'Tooltip copy Learn more')
        })
    })

    it('describes a focusable wrapper with the tooltip copy', () => {
      mount(() => (
        <Tooltip
          class="mt-[200px] inline-block"
          // @ts-expect-error TSX in volar has a tendency to be a bit wrong, this would work in a template
          tabindex={0}
        >
          {{
            default: () => <span>Focus me</span>,
            popper: () => <span>Extra information</span>,
          }}
        </Tooltip>
      ))
      cy.contains('[tabindex="0"]', 'Focus me')
        .should('have.attr', 'aria-describedby')
        .then((id) => {
          cy.get(`[id="${id}"]`).should('have.text', 'Extra information')
        })
    })

    it('does not stay open after a mouse click', () => {
      mount(() => <InteractiveTooltip />)
      cy.get('[data-cy="trigger"]').realClick()
      cy.get('[data-cy="after"]').realHover()
      cy.get('[role="tooltip"]').should('not.be.visible')
    })

    it('releases a hover that ended while the trigger had keyboard focus', () => {
      mount(() => <InteractiveTooltip />)
      cy.get('[data-cy="trigger"]').realHover()
      cy.get('[role="tooltip"]').should('be.visible').realHover()
      cy.get('[data-cy="before"]').focus()
      cy.realPress('Tab')
      cy.get('[data-cy="after"]').realHover()
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'after')
      cy.get('[role="tooltip"]').should('not.be.visible')
    })
  })

  describe('inside a modal dialog', () => {
    beforeEach(() => {
      mount(() => (
        <dialog>
          <button data-cy="before">before</button>
          <Tooltip interactive placement="top">
            {{
              default: () => <button data-cy="trigger">trigger text</button>,
              popper: () => <a href="#learn-more">Learn more</a>,
            }}
          </Tooltip>
          <button data-cy="after">after</button>
        </dialog>
      ))
      cy.get('dialog').then(($dialog) =>
        ($dialog[0] as HTMLDialogElement).showModal(),
      )
      cy.focused().should('have.attr', 'data-cy', 'before')
    })

    it('lets Tab move past the trigger when the popper is inert', () => {
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'trigger')
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'after')
    })

    it('closes only the tooltip on the first Escape', () => {
      cy.realPress('Tab')
      cy.get('[role="tooltip"]').should('be.visible')
      cy.realPress('Escape')
      cy.get('[role="tooltip"]').should('not.be.visible')
      cy.get('dialog').should('have.attr', 'open')
      cy.realPress('Escape')
      cy.get('dialog').should('not.have.attr', 'open')
    })
  })

  it('returns focus to the trigger on Escape after clicking into the popper', () => {
    mount(() => (
      <div class="mt-[200px] flex gap-4 p-4">
        <Tooltip interactive placement="top">
          {{
            default: () => <button data-cy="trigger">trigger text</button>,
            popper: () => <a href="#learn-more">Learn more</a>,
          }}
        </Tooltip>
      </div>
    ))
    cy.get('[data-cy="trigger"]').realHover()
    cy.contains('a', 'Learn more').should('be.visible').realClick()
    cy.realPress('Escape')
    cy.focused().should('have.attr', 'data-cy', 'trigger')
    cy.get('[role="tooltip"]').should('not.be.visible')
  })

  it('does not stay open after clicking into a text field trigger', () => {
    mount(() => (
      <div class="mt-[200px] flex gap-4 p-4">
        <Tooltip placement="top">
          {{
            default: () => <input data-cy="field" aria-label="field" />,
            popper: () => <span>Field help</span>,
          }}
        </Tooltip>
        <button data-cy="after">after</button>
      </div>
    ))
    cy.get('[data-cy="field"]').realClick()
    cy.focused().should('have.attr', 'data-cy', 'field')
    cy.get('[data-cy="after"]').realHover()
    cy.get('[role="tooltip"]').should('not.be.visible')
  })

  it('tabs through every focusable in the reference before entering the popper', () => {
    mount(() => (
      <div class="mt-[200px] flex gap-4 p-4">
        <button data-cy="before">before</button>
        <Tooltip interactive placement="top">
          {{
            default: () => (
              <>
                <button data-cy="first">first</button>
                <button data-cy="second">second</button>
              </>
            ),
            popper: () => <a href="#learn-more">Learn more</a>,
          }}
        </Tooltip>
      </div>
    ))
    cy.get('[data-cy="before"]').focus()
    cy.realPress('Tab')
    cy.focused().should('have.attr', 'data-cy', 'first')
    cy.realPress('Tab')
    cy.focused().should('have.attr', 'data-cy', 'second')
    cy.realPress('Tab')
    cy.focused().should('have.text', 'Learn more')
  })

  it('releases a popper hover once a controlled `open` turns false', () => {
    const open = ref(true)
    mount(() => (
      <div class="mt-[200px] flex gap-4 p-4">
        <Tooltip interactive placement="top" open={open.value}>
          {{
            default: () => <span>trigger text</span>,
            popper: () => <div>controlled</div>,
          }}
        </Tooltip>
        <button data-cy="after">after</button>
      </div>
    ))
    cy.get('[role="tooltip"]').should('be.visible').realHover()
    cy.get('[data-cy="after"]').realHover()
    cy.then(() => (open.value = false))
    cy.get('[role="tooltip"]').should('not.be.visible')
  })
})

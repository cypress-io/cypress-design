/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import type { Placement } from '@floating-ui/react'
import assertions from '../assertions'
import Tooltip from './Tooltip'

const TooltipStoryMulti = ({
  color = 'light',
  placement,
  disabled,
  tabindex = 1,
}: {
  color?: 'light' | 'dark'
  placement?: Placement
  disabled?: boolean
  tabindex?: number
} = {}) => (
  <div className="flex flex-col items-center center gap-20">
    <Tooltip
      className="w-1/2 p-4 bg-red-200"
      popper={<div className="p-4 text-gray-800 bg-jade-200">PopovDyn</div>}
      color={color}
      placement={placement}
      tabIndex={tabindex}
      disabled={disabled}
    >
      <div>Hover Me (dynamic: {placement?.toString()})</div>
    </Tooltip>
    <Tooltip
      className="w-1/2 p-4 bg-red-200"
      popper={
        <div className="h-[200px] flex items-center justify-center">Popov</div>
      }
      color={color}
      placement="top"
      forcePlacement
    >
      <div>Force Placement to the top</div>
    </Tooltip>
    <Tooltip
      className="w-1/2 p-4 bg-red-200"
      popper={<div>PopovInt</div>}
      color={color}
      placement={placement}
      interactive
    >
      <div>Interactive {placement?.toString()}</div>
    </Tooltip>
    {(['top', 'right', 'bottom', 'left', 'top-start'] as const).map(
      (placement) => (
        <Tooltip
          className="w-1/2 p-4 bg-indigo-200"
          placement={placement}
          key={placement}
          color={color}
          tabIndex={tabindex}
          disabled={disabled}
          popper={
            <div className="p-4 text-gray-800 bg-jade-200">
              Popover ({placement})
            </div>
          }
        >
          <div>Hover Me ({placement})</div>
        </Tooltip>
      ),
    )}
  </div>
)

describe('Tooltip', { viewportHeight: 800, viewportWidth: 800 }, () => {
  function mountStory(
    options: { single?: boolean } & Parameters<
      typeof TooltipStoryMulti
    >[0] = {},
  ) {
    const { single, tabindex = 1, ...rest } = options
    if (single) {
      mount(
        <Tooltip
          {...rest}
          tabIndex={tabindex}
          popper={
            <div className="w-[300px]">
              popit: Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, voluptatum.
            </div>
          }
          className="m-4 p-4 bg-red-300 w-[150px]"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum.
        </Tooltip>,
      )
    } else {
      mount(<TooltipStoryMulti {...rest} tabindex={tabindex} />)
    }
  }

  assertions(mountStory, 'react')

  it('open', () => {
    mount(
      <div className="text-center">
        <Tooltip
          className="border inline-block m-16 p-3"
          popper="should be visible"
          open
        >
          make sure its open
        </Tooltip>
      </div>,
    )
    cy.findByText('should be visible').should('be.visible')
  })

  it('arrowPadding', () => {
    mount(
      <div className="flex flex-col items-center center gap-20 bg-gray-1000">
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
            key={placement}
            className="w-1/2 p-4 bg-indigo-200"
            placement={placement}
            arrowPadding={1}
            open
            popper={<div className="p-4 bg-jade-200 text-gray-900">H</div>}
          >
            <div>Hover Me ({placement})</div>
          </Tooltip>
        ))}
      </div>,
    )

    cy.percySnapshot()
  })

  it('shiftOptions', () => {
    mount(
      <div className="flex items-center justify-center h-[400px] w-[200px]">
        <Tooltip
          className="p-4 bg-indigo-200"
          placement="bottom"
          shiftOptions={{ padding: 50 }}
          open
          popper={
            <div className="p-4 bg-jade-200 text-gray-900">
              Custom shift padding of 50px
            </div>
          }
        >
          <div>Tooltip with custom shift padding</div>
        </Tooltip>
      </div>,
    )

    cy.findByText('Custom shift padding of 50px').should('be.visible')
  })

  it('offsetOptions', () => {
    mount(
      <div className="flex flex-col items-center center gap-40">
        <Tooltip
          className="p-4 bg-indigo-200"
          placement="bottom"
          offsetOptions={40}
          open
          popper={
            <div className="p-4 bg-jade-200 text-gray-900">Offset 40px</div>
          }
        >
          <div>Tooltip with offset 40px</div>
        </Tooltip>
        <Tooltip
          className="p-4 bg-red-200"
          placement="bottom"
          offsetOptions={5}
          open
          popper={
            <div className="p-4 bg-jade-200 text-gray-900">Offset 5px</div>
          }
        >
          <div>Tooltip with offset 5px</div>
        </Tooltip>
      </div>,
    )

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
      <div className="mt-[200px] flex gap-4 p-4">
        <button data-cy="before">before</button>
        <Tooltip
          interactive
          placement="top"
          popper={
            <div>
              Tooltip copy <a href="#learn-more">Learn more</a>
            </div>
          }
        >
          <button data-cy="trigger">trigger text</button>
        </Tooltip>
        {withAfter ? <button data-cy="after">after</button> : null}
      </div>
    )

    it('opens on keyboard focus and closes on Escape', () => {
      mount(<InteractiveTooltip />)
      cy.get('[data-cy="before"]').focus()
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'trigger')
      cy.get('[role="tooltip"]').should('be.visible')
      cy.realPress('Escape')
      cy.get('[role="tooltip"]').should('not.exist')
      cy.focused().should('have.attr', 'data-cy', 'trigger')
    })

    it('tabs from the trigger into the popper, back, and on to the next control', () => {
      mount(<InteractiveTooltip />)
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
      cy.get('[role="tooltip"]').should('not.exist')
    })

    it('closes on Escape from inside the popper and returns focus to the trigger', () => {
      mount(<InteractiveTooltip />)
      cy.get('[data-cy="before"]').focus()
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.focused().should('have.text', 'Learn more')
      cy.realPress('Escape')
      cy.focused().should('have.attr', 'data-cy', 'trigger')
      cy.get('[role="tooltip"]').should('not.exist')
    })

    it('does not loop back into the popper when the trigger is the last control', () => {
      mount(<InteractiveTooltip withAfter={false} />)
      cy.get('[data-cy="before"]').focus()
      cy.realPress('Tab')
      cy.realPress('Tab')
      cy.focused().should('have.text', 'Learn more')
      cy.realPress('Tab')
      cy.get('[role="tooltip"]').should('not.exist')
    })

    it('does not stay open after a mouse click', () => {
      mount(<InteractiveTooltip />)
      cy.get('[data-cy="trigger"]').realClick()
      cy.get('[data-cy="after"]').realHover()
      cy.get('[role="tooltip"]').should('not.exist')
    })

    it('describes a focusable child through the render function', () => {
      mount(
        <div className="mt-[200px] flex gap-4 p-4">
          <button data-cy="before">before</button>
          <Tooltip placement="top" popper="Tooltip copy">
            {({ describedBy }) => (
              <button data-cy="trigger" aria-describedby={describedBy}>
                trigger text
              </button>
            )}
          </Tooltip>
        </div>,
      )
      cy.get('[data-cy="before"]').focus()
      cy.realPress('Tab')
      cy.get('[data-cy="trigger"]')
        .should('have.attr', 'aria-describedby')
        .then((id) => {
          cy.get(`[id="${id}"]`).should('have.text', 'Tooltip copy')
        })
    })

    it('returns focus to the trigger on Escape after clicking into the popper', () => {
      mount(<InteractiveTooltip />)
      cy.get('[data-cy="trigger"]').realHover()
      cy.contains('a', 'Learn more').should('be.visible').realClick()
      cy.realPress('Escape')
      cy.focused().should('have.attr', 'data-cy', 'trigger')
      cy.get('[role="tooltip"]').should('not.exist')
    })

    it('tabs through every focusable in the reference before entering the popper', () => {
      mount(
        <div className="mt-[200px] flex gap-4 p-4">
          <button data-cy="before">before</button>
          <Tooltip
            interactive
            placement="top"
            popper={<a href="#learn-more">Learn more</a>}
          >
            <button data-cy="first">first</button>
            <button data-cy="second">second</button>
          </Tooltip>
        </div>,
      )
      cy.get('[data-cy="before"]').focus()
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'first')
      cy.realPress('Tab')
      cy.focused().should('have.attr', 'data-cy', 'second')
      cy.realPress('Tab')
      cy.focused().should('have.text', 'Learn more')
    })
  })

  describe('inside a modal dialog', () => {
    beforeEach(() => {
      mount(
        <dialog>
          <button data-cy="before">before</button>
          <Tooltip
            interactive
            placement="top"
            popper={<a href="#learn-more">Learn more</a>}
          >
            <button data-cy="trigger">trigger text</button>
          </Tooltip>
          <button data-cy="after">after</button>
        </dialog>,
      )
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
      cy.get('[role="tooltip"]').should('exist')
      cy.realPress('Escape')
      cy.get('[role="tooltip"]').should('not.exist')
      cy.get('dialog').should('have.attr', 'open')
      cy.realPress('Escape')
      cy.get('dialog').should('not.have.attr', 'open')
    })
  })
})

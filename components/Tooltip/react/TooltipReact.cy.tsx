/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react'
import type { Placement } from '@floating-ui/react'
import assertions, { waitForTooltipsToPosition } from '../assertions'
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
  <div className="center flex flex-col items-center gap-20">
    <Tooltip
      className="w-1/2 bg-red-200 p-4"
      popper={<div className="bg-jade-200 p-4 text-gray-800">PopovDyn</div>}
      color={color}
      placement={placement}
      tabIndex={tabindex}
      disabled={disabled}
    >
      <div>Hover Me (dynamic: {placement?.toString()})</div>
    </Tooltip>
    <Tooltip
      className="w-1/2 bg-red-200 p-4"
      popper={
        <div className="flex h-[200px] items-center justify-center">Popov</div>
      }
      color={color}
      placement="top"
      forcePlacement
    >
      <div>Force Placement to the top</div>
    </Tooltip>
    <Tooltip
      className="w-1/2 bg-red-200 p-4"
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
          className="w-1/2 bg-indigo-200 p-4"
          placement={placement}
          key={placement}
          color={color}
          tabIndex={tabindex}
          disabled={disabled}
          popper={
            <div className="bg-jade-200 p-4 text-gray-800">
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
          className="m-4 w-[150px] bg-red-300 p-4"
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
          className="m-16 inline-block border p-3"
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
      <div className="center flex flex-col items-center gap-20 bg-gray-1000">
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
            className="w-1/2 bg-indigo-200 p-4"
            placement={placement}
            arrowPadding={1}
            open
            popper={<div className="bg-jade-200 p-4 text-gray-900">H</div>}
          >
            <div>Hover Me ({placement})</div>
          </Tooltip>
        ))}
      </div>,
    )

    waitForTooltipsToPosition()
    cy.percySnapshot()
  })

  it('shiftOptions', () => {
    mount(
      <div className="flex h-[400px] w-[200px] items-center justify-center">
        <Tooltip
          className="bg-indigo-200 p-4"
          placement="bottom"
          shiftOptions={{ padding: 50 }}
          open
          popper={
            <div className="bg-jade-200 p-4 text-gray-900">
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
      <div className="center flex flex-col items-center gap-40">
        <Tooltip
          className="bg-indigo-200 p-4"
          placement="bottom"
          offsetOptions={40}
          open
          popper={
            <div className="bg-jade-200 p-4 text-gray-900">Offset 40px</div>
          }
        >
          <div>Tooltip with offset 40px</div>
        </Tooltip>
        <Tooltip
          className="bg-red-200 p-4"
          placement="bottom"
          offsetOptions={5}
          open
          popper={
            <div className="bg-jade-200 p-4 text-gray-900">Offset 5px</div>
          }
        >
          <div>Tooltip with offset 5px</div>
        </Tooltip>
      </div>,
    )

    cy.findByText('Offset 40px').should('be.visible')
    cy.findByText('Offset 5px').should('be.visible')
    waitForTooltipsToPosition()
    cy.percySnapshot()
  })
})

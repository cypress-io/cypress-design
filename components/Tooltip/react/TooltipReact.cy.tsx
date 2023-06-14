/// <reference types="cypress" />

import * as React from 'react'
import { mount } from 'cypress/react18'
import { Placement } from '@floating-ui/react-dom-interactions'
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
      )
    )}
  </div>
)

describe('Tooltip', { viewportHeight: 800, viewportWidth: 800 }, () => {
  function mountStory(
    options: { single?: boolean } & Parameters<typeof TooltipStoryMulti>[0] = {}
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
        </Tooltip>
      )
    } else {
      mount(<TooltipStoryMulti {...rest} tabindex={tabindex} />)
    }
  }

  assertions(mountStory, 'react')
})

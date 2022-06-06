import { Placement } from '@floating-ui/react-dom-interactions'
import * as React from 'react'
import Tooltip from './Tooltip'

export default ({
  color = 'light',
  placement,
  tabIndex,
}: {
  color?: 'light' | 'dark'
  placement?: Placement
  tabIndex?: number
} = {}) => (
  <div className="center flex flex-col items-center gap-20">
    <Tooltip
      className="bg-red-200 p-4 w-1/2"
      popper={<div className="bg-jade-200 text-gray-800 p-4">Popover</div>}
      color={color}
      placement={placement}
      tabIndex={tabIndex}
    >
      <div>Hover Me (dynamic: {placement?.toString()})</div>
    </Tooltip>
    {(['top', 'right', 'bottom', 'left', 'top-start'] as const).map(
      (placement) => (
        <Tooltip
          className="bg-indigo-200 p-4 w-1/2"
          placement={placement}
          key={placement}
          color={color}
          tabIndex={tabIndex}
          popper={
            <div className="bg-jade-200 text-gray-800 p-4">
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

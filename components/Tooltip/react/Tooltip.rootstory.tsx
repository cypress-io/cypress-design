import { Placement } from '@floating-ui/react-dom-interactions'
import * as React from 'react'
import Tooltip from './Tooltip'

export default ({
  color = 'light',
  placement,
  disabled,
  tabIndex,
}: {
  color?: 'light' | 'dark'
  placement?: Placement
  disabled?: boolean
  tabIndex?: number
} = {}) => (
  <div className="flex flex-col items-center center gap-20">
    <Tooltip
      className="w-1/2 p-4 bg-red-200"
      popper={<div className="p-4 text-gray-800 bg-jade-200">PopovDyn</div>}
      color={color}
      placement={placement}
      tabIndex={tabIndex}
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
          tabIndex={tabIndex}
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

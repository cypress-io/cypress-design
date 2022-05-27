import * as React from 'react'
import Tooltip from './Tooltip'

export default () => (
  <div className="center flex flex-col items-center gap-20">
    <Tooltip
      className="bg-red-200 p-4 w-1/2"
      popper={<div className="bg-jade-200 p-4">Popover</div>}
    >
      <div>Hover Me</div>
    </Tooltip>
    {(['top', 'right', 'bottom', 'left', 'top-start'] as const).map(
      (placement) => (
        <Tooltip
          className="bg-indigo-200 p-4 w-1/2"
          placement={placement}
          key={placement}
          popper={<div className="bg-jade-200 p-4">Popover</div>}
        >
          <div>Hover Me ({placement})</div>
        </Tooltip>
      )
    )}
  </div>
)

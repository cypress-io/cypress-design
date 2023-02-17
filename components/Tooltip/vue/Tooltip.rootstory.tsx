import type { Placement } from '@floating-ui/dom'
import Tooltip from './Tooltip.vue'

export default ({
  color = 'light',
  placement,
  tabIndex,
  disabled,
}: {
  color?: 'light' | 'dark'
  placement?: Placement
  tabIndex?: number
  disabled?: boolean
} = {}) => (
  <div class="center flex flex-col items-center gap-20">
    <Tooltip
      class="bg-red-200 p-4 w-1/2"
      placement={placement}
      color={color}
      tabIndex={tabIndex}
      disabled={disabled}
    >
      {{
        default: () => <div>Hover Me (dynamic: {placement?.toString()})</div>,
        popper: () => <div class="bg-jade-200 p-4">PopovDyn</div>,
      }}
    </Tooltip>
    <Tooltip
      class="bg-red-200 p-4 w-1/2"
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
      class="bg-red-200 p-4 w-1/2"
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
          class="bg-indigo-200 p-4 w-1/2"
          placement={placement}
          color={color}
          tabIndex={tabIndex}
          disabled={disabled}
        >
          {{
            default: () => <div>Hover Me ({placement})</div>,
            popper: () => (
              <div class="bg-jade-200 p-4">Popover ({placement})</div>
            ),
          }}
        </Tooltip>
      )
    )}
  </div>
)

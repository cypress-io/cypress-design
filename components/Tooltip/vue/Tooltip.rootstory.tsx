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
  <div class="flex flex-col items-center center gap-20">
    <Tooltip
      class="w-1/2 p-4 bg-red-200"
      placement={placement}
      color={color}
      tabindex={tabIndex}
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
          tabindex={tabIndex}
          disabled={disabled}
        >
          {{
            default: () => <div>Hover Me ({placement})</div>,
            popper: () => (
              <div class="p-4 bg-jade-200">Popover ({placement})</div>
            ),
          }}
        </Tooltip>
      )
    )}
  </div>
)

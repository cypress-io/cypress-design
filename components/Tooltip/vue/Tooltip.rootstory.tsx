import Tooltip from './Tooltip.vue'

export default () => (
  <div class="center flex flex-col items-center gap-20">
    <Tooltip class="bg-red-200 p-4 w-1/2">
      {{
        default: () => <div>Hover Me</div>,
        popper: () => <div class="bg-jade-200 p-4">Popover</div>,
      }}
    </Tooltip>
    {(['top', 'right', 'bottom', 'left', 'top-start'] as const).map(
      (placement) => (
        <Tooltip class="bg-indigo-200 p-4 w-1/2" placement={placement}>
          {{
            default: () => <div>Hover Me ({placement})</div>,
            popper: () => <div class="bg-jade-200 p-4">Popover</div>,
          }}
        </Tooltip>
      )
    )}
  </div>
)

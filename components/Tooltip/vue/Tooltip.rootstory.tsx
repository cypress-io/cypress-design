import Tooltip from './Tooltip.vue'

export default () => (
  <div class="h-100px">
    <Tooltip>
      {{
        default: () => <div>Hover Me</div>,
        popover: () => <div>Popover</div>,
      }}
    </Tooltip>
  </div>
)

import Tooltip from '@cypress-design/react-tooltip'

// Flips to the opposite side when there isn't room, unless forcePlacement is set.
export default function Placement() {
  return (
    <Tooltip
      placement="right"
      tabIndex={0}
      className="inline-block py-2"
      popper="Extra information"
    >
      <span>Focus me / right</span>
    </Tooltip>
  )
}

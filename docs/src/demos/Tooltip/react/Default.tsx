import Tooltip from '@cypress-design/react-tooltip'

// tabIndex={0} lets keyboard focus open the tooltip, not only hover.
export default function Default() {
  return (
    <Tooltip
      tabIndex={0}
      className="inline-block py-2"
      popper="Extra information"
    >
      <span>Focus me / light</span>
    </Tooltip>
  )
}

import Tooltip from '@cypress-design/react-tooltip'

export default function Dark() {
  return (
    <Tooltip
      color="dark"
      tabIndex={0}
      className="inline-block py-2"
      popper="Extra information"
    >
      <span>Focus me / dark</span>
    </Tooltip>
  )
}

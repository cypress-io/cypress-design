import Tooltip from '@cypress-design/react-tooltip'

// Tab from the trigger moves into the link; Escape closes and returns focus.
export default function Interactive() {
  return (
    <Tooltip
      interactive
      tabIndex={0}
      className="inline-block py-2"
      popper={
        <>
          Extra information{' '}
          <a href="#" className="text-indigo-500">
            Learn more
          </a>
        </>
      }
    >
      <span>Focus me / interactive</span>
    </Tooltip>
  )
}

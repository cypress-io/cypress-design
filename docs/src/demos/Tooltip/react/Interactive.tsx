import Tooltip from '@cypress-design/react-tooltip'

// Tab from the trigger moves into the link; Escape closes and returns focus.
export default function Interactive() {
  return (
    <Tooltip
      interactive
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
      {({ describedBy }) => (
        <button type="button" aria-describedby={describedBy}>
          Focus me / interactive
        </button>
      )}
    </Tooltip>
  )
}

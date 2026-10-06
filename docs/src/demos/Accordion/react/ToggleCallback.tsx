import { useState } from 'react'
import Accordion from '@cypress-design/react-accordion'

// `onToggle` receives the new open state after each toggle.
export default function ToggleCallback() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Accordion title="Accordion title" onToggle={setIsOpen}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </Accordion>
      <p className="mt-4 text-sm text-gray-700">{isOpen ? 'Open' : 'Closed'}</p>
    </>
  )
}

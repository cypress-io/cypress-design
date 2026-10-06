import Accordion from '@cypress-design/react-accordion'

// `open` sets the starting state; the reader can still collapse it.
export default function OpenByDefault() {
  return (
    <Accordion title="Accordion title" open>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </Accordion>
  )
}

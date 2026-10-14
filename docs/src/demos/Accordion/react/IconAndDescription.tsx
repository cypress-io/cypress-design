import Accordion from '@cypress-design/react-accordion'
import { IconActionQuestionMarkCircle } from '@cypress-design/react-icon'

// `separator` draws a vertical rule between the icon and the text.
export default function IconAndDescription() {
  return (
    <Accordion
      icon={IconActionQuestionMarkCircle}
      title="Accordion title"
      description="Vestibulum id ligula porta felis euismod semper. Nulla..."
      separator
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </Accordion>
  )
}

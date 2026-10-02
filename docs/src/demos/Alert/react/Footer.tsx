import Alert from '@cypress-design/react-alert'
import Button from '@cypress-design/react-button'

export default function Footer() {
  return (
    <Alert
      variant="clear"
      title="Angular component testing is available for this project"
      footer={
        <div className="flex flex-wrap gap-4 p-4">
          <Button variant="outline-indigo" size="32">
            Quick setup
          </Button>
          <Button variant="link" size="32">
            Read our guides
          </Button>
        </div>
      }
    >
      You can now use Cypress to develop and test individual components without
      running your whole application.
    </Alert>
  )
}

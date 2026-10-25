import Button from '@cypress-design/react-button'
import { IconActionQuestionMarkCircle } from '@cypress-design/react-icon'

export default function Default() {
  return (
    <Button>
      <IconActionQuestionMarkCircle className="mr-2" fillColor="indigo-400" />
      Button
    </Button>
  )
}

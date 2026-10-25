import { useState } from 'react'
import Alert from '@cypress-design/react-alert'

// The alert hides itself; use onDismiss to update the rest of the page.
export default function Dismissible() {
  const [dismissed, setDismissed] = useState(false)
  return (
    <>
      <Alert
        title="This is an info message"
        dismissible
        onDismiss={() => setDismissed(true)}
      />
      {dismissed && <p>Alert dismissed</p>}
    </>
  )
}

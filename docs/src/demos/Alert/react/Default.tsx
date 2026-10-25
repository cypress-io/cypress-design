import Alert from '@cypress-design/react-alert'

// `title` is the header; children render as the body below it.
export default function Default() {
  return (
    <Alert
      title={
        <>
          This is an <code>info</code> message
        </>
      }
    >
      <p>This is the body of the alert.</p>
    </Alert>
  )
}

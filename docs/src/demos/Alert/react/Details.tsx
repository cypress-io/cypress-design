import Alert from '@cypress-design/react-alert'

// `details` renders behind a toggle labelled by `detailsTitle`.
export default function Details() {
  return (
    <Alert
      title={
        <>
          This is an <code>info</code> message
        </>
      }
      detailsTitle="Additional details"
      details={<p>This is the details of the alert.</p>}
    >
      <p>This is the body of the alert.</p>
    </Alert>
  )
}

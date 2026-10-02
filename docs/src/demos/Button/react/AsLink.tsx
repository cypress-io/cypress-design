import Button from '@cypress-design/react-button'

export default function AsLink() {
  return (
    // With `href`, Button renders an <a> styled as a button.
    <Button
      href="https://docs.cypress.io"
      target="_blank"
      variant="outline-indigo"
    >
      Button
    </Button>
  )
}

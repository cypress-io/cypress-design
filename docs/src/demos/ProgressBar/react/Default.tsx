import ProgressBar from '@cypress-design/react-progressbar'

// The bar renders no text, so always give it a name.
export default function Default() {
  return (
    <div className="rounded bg-white p-4">
      <ProgressBar value={36} aria-label="Included tests used" />
    </div>
  )
}

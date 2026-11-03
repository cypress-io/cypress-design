import ProgressBar from '@cypress-design/react-progressbar'

export default function Sizes() {
  return (
    <div className="flex flex-col gap-4 rounded bg-white p-4">
      <ProgressBar size="6" value={36} aria-label="6px bar" />
      <ProgressBar size="8" value={36} aria-label="8px bar" />
      <ProgressBar size="12" value={36} aria-label="12px bar" />
    </div>
  )
}

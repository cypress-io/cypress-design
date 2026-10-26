import { CypressMark } from '@cypress-design/react-logo'

// The default variant takes its color from the text color.
export default function Mark() {
  return (
    <div className="flex items-center gap-8">
      <CypressMark className="size-12 text-gray-500" />
      <CypressMark className="size-12" variant="color-dark" />
      <div className="rounded bg-gray-1000 p-4">
        <CypressMark className="size-12" variant="color-white" />
      </div>
    </div>
  )
}

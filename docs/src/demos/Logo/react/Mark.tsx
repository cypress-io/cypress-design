import { CypressMark } from '@cypress-design/react-logo'

// The default variant takes its color from the text color.
export default function Mark() {
  return (
    <div className="flex items-center gap-8">
      <CypressMark className="h-[48px] w-[48px] text-gray-500" />
      <CypressMark className="h-[48px] w-[48px]" variant="color-dark" />
      <div className="rounded bg-gray-1000 p-4">
        <CypressMark className="h-[48px] w-[48px]" variant="color-white" />
      </div>
    </div>
  )
}

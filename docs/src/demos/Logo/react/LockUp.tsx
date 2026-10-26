import { CypressLockUp } from '@cypress-design/react-logo'

export default function LockUp() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <CypressLockUp className="h-12 w-auto" />
      <CypressLockUp className="h-12 w-auto" variant="color-dark" />
      <div className="rounded bg-gray-1000 p-4">
        <CypressLockUp className="h-12 w-auto" variant="white" />
      </div>
      <div className="rounded bg-gray-1000 p-4">
        <CypressLockUp className="h-12 w-auto" variant="color-white" />
      </div>
    </div>
  )
}

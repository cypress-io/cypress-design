import { CypressLockUp } from '@cypress-design/react-logo'

export default function LockUp() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <CypressLockUp className="h-[48px] w-[119px]" />
      <CypressLockUp className="h-[48px] w-[119px]" variant="color-dark" />
      <div className="rounded bg-gray-1000 p-4">
        <CypressLockUp className="h-[48px] w-[119px]" variant="white" />
      </div>
      <div className="rounded bg-gray-1000 p-4">
        <CypressLockUp className="h-[48px] w-[119px]" variant="color-white" />
      </div>
    </div>
  )
}

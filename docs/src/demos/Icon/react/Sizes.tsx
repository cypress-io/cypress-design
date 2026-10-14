import { IconObjectBook } from '@cypress-design/react-icon'

// Each icon ships a fixed set of sizes; the /icons page lists them.
export default function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <IconObjectBook size="16" />
      <IconObjectBook size="24" />
      <IconObjectBook size="48" />
    </div>
  )
}

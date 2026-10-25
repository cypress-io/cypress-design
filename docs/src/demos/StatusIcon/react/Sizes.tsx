import StatusIcon from '@cypress-design/react-statusicon'

// At 4 and 8, every status renders as a filled dot.
const sizes = ['4', '8', '12', '16', '24'] as const

export default function Sizes() {
  return (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <StatusIcon key={size} size={size} status="failed" variant="solid" />
      ))}
    </div>
  )
}

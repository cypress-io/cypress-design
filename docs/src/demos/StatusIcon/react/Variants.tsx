import StatusIcon from '@cypress-design/react-statusicon'

// A status without an icon for the variant falls back to one it has.
const variants = ['outline', 'simple', 'solid'] as const

export default function Variants() {
  return (
    <div className="flex items-center gap-8">
      {variants.map((variant) => (
        <div key={variant} className="flex items-center gap-2">
          <StatusIcon status="failed" variant={variant} />
          {variant}
        </div>
      ))}
    </div>
  )
}

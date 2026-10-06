import Tag from '@cypress-design/react-tag'

// `size` is the tag's height in px.
const sizes = ['16', '20', '24', '32'] as const

export default function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <Tag key={size} size={size} color="jade">
          {size}
        </Tag>
      ))}
    </div>
  )
}

import Button from '@cypress-design/react-button'

// Size is the button height in pixels. The default is 40.
const sizes = ['20', '24', '32', '40', '48'] as const

export default function Sizes() {
  return (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Button key={size} size={size}>
          Button
        </Button>
      ))}
    </div>
  )
}

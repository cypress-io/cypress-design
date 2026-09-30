import Button, { type ButtonVariants } from '@cypress-design/react-button'

// indigo-dark is the default variant.
const variants: ButtonVariants[] = [
  'indigo-dark',
  'jade-dark',
  'teal-dark',
  'purple-dark',
  'red-dark',
  'gray-dark',
  'gray-darkest',
]

export default function SolidVariants() {
  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  )
}

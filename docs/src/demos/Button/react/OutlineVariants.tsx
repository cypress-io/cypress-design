import Button, { type ButtonVariants } from '@cypress-design/react-button'

const variants: ButtonVariants[] = [
  'outline-indigo',
  'outline-purple',
  'outline-teal-dark',
  'outline-jade-light',
  'outline-jade-dark',
  'outline-red',
  'outline-gray-dark',
  'outline-light',
  'outline-gray-light',
  'outline-orange-dark',
  'outline-orange-light',
]

export default function OutlineVariants() {
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

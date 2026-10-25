import Button, { type ButtonVariants } from '@cypress-design/react-button'

// Dark mode variants are for dark surfaces.
const variants: ButtonVariants[] = [
  'outline-dark',
  'outline-red-dark-mode',
  'outline-jade-dark-mode',
  'outline-indigo-dark-mode',
  'outline-purple-dark-mode',
  'red-dark-mode',
  'purple-dark-mode',
  'indigo-dark-mode',
]

export default function DarkModeVariants() {
  return (
    <div className="flex flex-wrap gap-4 rounded bg-gray-1000 p-4">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  )
}

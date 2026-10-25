import Button, { type ButtonVariants } from '@cypress-design/react-button'

// `disabled` restyles each variant. The `disabled` and `outline-disabled`
// variants render disabled on their own.
const variants: ButtonVariants[] = [
  'indigo-dark',
  'indigo-light',
  'outline-indigo',
  'white',
  'link',
]

export default function Disabled() {
  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Button key={variant} variant={variant} disabled>
          {variant}
        </Button>
      ))}
    </div>
  )
}

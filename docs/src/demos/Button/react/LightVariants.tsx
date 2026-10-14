import Button, { type ButtonVariants } from '@cypress-design/react-button'

const variants: ButtonVariants[] = [
  'indigo-light',
  'jade-light',
  'white',
  'link',
]

export default function LightVariants() {
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

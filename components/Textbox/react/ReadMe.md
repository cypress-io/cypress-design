# Textbox

## Install

The textbox component is contained in the `@cypress-design/react-textbox` package. You'll also want to install `@cypress-design/constants-textbox` to get proper types for TypeScript.

```bash
npm install @cypress-design/react-textbox @cypress-design/constants-textbox
```

or with yarn

```bash
yarn add @cypress-design/react-textbox @cypress-design/constants-textbox
```

## Usage

```ts
import Textbox from '@cypress-design/react-textbox'
```

```jsx
import { IconShapeLightningBolt } from '@cypress-design/react-icon'
import Textbox from '@cypress-design/react-textbox'

export default () => (
  <Textbox iconLeft={IconShapeLightningBolt} placeholder="Search..." />
)
```

## Possible variants

The Textbox component supports four variants: `default`, `valid`, `invalid`, and `warning`. Each variant has different visual styling to indicate the input state.

### Placeholders

All variants with placeholder text:

```jsx live
import Textbox from '@cypress-design/react-textbox'
export default () => (
  <div className="bg-white p-4 rounded">
    <div className="flex flex-col gap-4">
      <Textbox variant="default" placeholder="Default placeholder" />
      <Textbox variant="valid" placeholder="Valid placeholder" />
      <Textbox variant="invalid" placeholder="Invalid placeholder" />
      <Textbox variant="warning" placeholder="Warning placeholder" />
    </div>
  </div>
)
```

### Types

All variants with values:

```jsx live
import Textbox from '@cypress-design/react-textbox'
export default () => (
  <div className="bg-white p-4 rounded">
    <div className="flex flex-col gap-4">
      <Textbox variant="default" defaultValue="Default" />
      <Textbox variant="valid" defaultValue="Valid" />
      <Textbox variant="invalid" defaultValue="Invalid" />
      <Textbox variant="warning" defaultValue="Warning" />
      <Textbox disabled defaultValue="Disabled" />
    </div>
  </div>
)
```

### Dark mode

All variants in dark mode with placeholders:

```jsx live
import Textbox from '@cypress-design/react-textbox'
export default () => (
  <div className="bg-gray-1000 p-4 rounded">
    <div className="flex flex-col gap-4">
      <Textbox theme="dark" variant="default" placeholder="Default" />
      <Textbox theme="dark" variant="valid" placeholder="Valid" />
      <Textbox theme="dark" variant="invalid" placeholder="Invalid" />
      <Textbox theme="dark" variant="warning" placeholder="Warning" />
    </div>
  </div>
)
```

All variants in dark mode with values:

```jsx live
import Textbox from '@cypress-design/react-textbox'
export default () => (
  <div className="bg-gray-1000 p-4 rounded">
    <div className="flex flex-col gap-4">
      <Textbox theme="dark" variant="default" defaultValue="Default" />
      <Textbox theme="dark" variant="valid" defaultValue="Valid" />
      <Textbox theme="dark" variant="invalid" defaultValue="Invalid" />
      <Textbox theme="dark" variant="warning" defaultValue="Warning" />
      <Textbox theme="dark" disabled defaultValue="Disabled" />
    </div>
  </div>
)
```

## Sizes

The Textbox supports three sizes: `32`, `40` (default), and `48`.

```jsx live
import Textbox from '@cypress-design/react-textbox'
export default () => (
  <div className="bg-white p-4 rounded">
    <div className="flex flex-col gap-4">
      <Textbox size="32" defaultValue="Size 32" />
      <Textbox size="40" defaultValue="Size 40" />
      <Textbox size="48" defaultValue="Size 48" />
    </div>
  </div>
)
```

Dark mode:

```jsx live
import Textbox from '@cypress-design/react-textbox'
export default () => (
  <div className="bg-gray-1000 p-4 rounded">
    <div className="flex flex-col gap-4">
      <Textbox theme="dark" size="32" defaultValue="Size 32" />
      <Textbox theme="dark" size="40" defaultValue="Size 40" />
      <Textbox theme="dark" size="48" defaultValue="Size 48" />
    </div>
  </div>
)
```

## Rounded

The Textbox supports a `rounded` prop to toggle between rounded and square corners. Shown here with size 40px:

```jsx live
import Textbox from '@cypress-design/react-textbox'
export default () => (
  <div className="bg-white p-4 rounded">
    <div className="flex flex-col gap-4">
      <Textbox size="40" rounded={false} defaultValue="Not rounded" />
      <Textbox size="40" rounded={true} defaultValue="Rounded" />
    </div>
  </div>
)
```

Dark mode:

```jsx live
import Textbox from '@cypress-design/react-textbox'
export default () => (
  <div className="bg-gray-1000 p-4 rounded">
    <div className="flex flex-col gap-4">
      <Textbox
        theme="dark"
        size="40"
        rounded={false}
        defaultValue="Not rounded"
      />
      <Textbox theme="dark" size="40" rounded={true} defaultValue="Rounded" />
    </div>
  </div>
)
```

## Options

The Textbox supports various combinations of optional elements. All sizes with labels on the left and right:

```jsx live
import Textbox from '@cypress-design/react-textbox'
import { IconShapeLightningBolt } from '@cypress-design/react-icon'
export default () => (
  <div className="bg-white p-4 rounded">
    <div className="flex flex-col gap-4">
      <Textbox
        divider
        size="32"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 32"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        divider
        size="40"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 40"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        divider
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 48"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        divider
        variant="valid"
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 48"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        divider
        variant="invalid"
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 48"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        divider
        variant="warning"
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 48"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        disabled
        divider
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="disabled"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        rounded
        divider
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 48"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        divider
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        placeholder="Placeholder"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
    </div>
  </div>
)
```

Dark mode:

```jsx live
import Textbox from '@cypress-design/react-textbox'
import { IconShapeLightningBolt } from '@cypress-design/react-icon'
export default () => (
  <div className="bg-gray-1000 p-4 rounded">
    <div className="flex flex-col gap-4">
      <Textbox
        divider
        theme="dark"
        size="32"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 32"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        divider
        theme="dark"
        size="40"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 40"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        divider
        theme="dark"
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 48"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        divider
        theme="dark"
        variant="valid"
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 48"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        divider
        theme="dark"
        variant="invalid"
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 48"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        divider
        theme="dark"
        variant="warning"
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 48"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        disabled
        divider
        theme="dark"
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="disabled"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        rounded
        theme="dark"
        divider
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        defaultValue="Size 48"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
      <Textbox
        divider
        theme="dark"
        size="48"
        labelLeft="Label left"
        labelRight="Label right"
        placeholder="Placeholder"
        iconLeft={IconShapeLightningBolt}
        iconRight={IconShapeLightningBolt}
      />
    </div>
  </div>
)
```

## Props

### onClick

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">(((event: MouseEvent&lt;HTMLElement, MouseEvent&gt;) =&gt; void) & MouseEventHandler&lt;HTMLInputElement&gt;)</code></p>

### onChange

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">((event: ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void)</code></p>

### onInput

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">((event: FormEvent&lt;HTMLInputElement&gt;) =&gt; void)</code></p>

### onFocus

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">((event: FocusEvent&lt;HTMLInputElement, Element&gt;) =&gt; void)</code></p>

### onBlur

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">((event: FocusEvent&lt;HTMLInputElement, Element&gt;) =&gt; void)</code></p>

### className

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">string</code></p>

### iconLeft

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">ComponentType&lt;any&gt; | ReactNode</code></p>

### iconRight

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">ComponentType&lt;any&gt; | ReactNode</code></p>

### type

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">"text" | "password" | "email" | "search" | "tel" | "url"</code> - <b>default</b>: <code>text</code></p>

### name

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">string</code></p>

### id

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">string</code></p>

### autoFocus

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">boolean</code></p>

### rounded

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">boolean</code></p>

### size

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">"32" | "40" | "48"</code></p>

Size (height) of the textbox in pixels

### disabled

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">boolean</code></p>

Whether the input is disabled

### placeholder

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">string</code></p>

Placeholder text

### value

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">string | (string & readonly string[])</code></p>

Current value of the input

### defaultValue

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">string | (string & readonly string[])</code></p>

Default value (uncontrolled)

### theme

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">TextboxTheme</code></p>

Theme mode: 'light' or 'dark' forces a specific mode

### variant

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">TextboxVariant</code></p>

Visual variant/type of the textbox

### labelLeft

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">any</code></p>

Label text or element on the left side

### divider

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">boolean</code></p>

Whether to show a divider between iconLeft and input

### labelRight

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">string | ReactNode</code></p>

Label text or element on the right side

## Ref Forwarding

The Textbox component supports ref forwarding, allowing you to access the underlying input element directly:

```tsx
import { useRef } from 'react'
import Textbox from '@cypress-design/react-textbox'

function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    inputRef.current?.focus()
  }

  return (
    <>
      <Textbox ref={inputRef} placeholder="Type here..." />
      <button onClick={handleFocus}>Focus Input</button>
    </>
  )
}
```

This is useful for:

- Programmatically focusing the input
- Accessing input methods like `select()`, `setSelectionRange()`
- Integrating with third-party libraries that need direct DOM access
- Measuring input dimensions

## Keyboard Event Handlers

The Textbox component supports keyboard event handlers for advanced interactions:

```tsx
import Textbox from '@cypress-design/react-textbox'

function MyComponent() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Enter pressed')
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('Key released:', e.key)
  }

  return (
    <Textbox
      placeholder="Press Enter..."
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    />
  )
}
```

### Available Keyboard Handlers

- **onKeyDown**: Fired when a key is pressed down
- **onKeyUp**: Fired when a key is released
- **onKeyPress**: Fired when a printable character key is pressed (deprecated but still supported)

## Common Input Attributes

The Textbox component supports all standard HTML input attributes through the `...rest` props spread. This includes:

### Form Attributes

- **readonly**: Makes the input read-only
- **required**: Marks the input as required for form validation
- **name**: Input name for form submission
- **form**: Associates input with a form element

### Validation Attributes

- **maxLength**: Maximum number of characters
- **minLength**: Minimum number of characters
- **pattern**: Regular expression pattern for validation
- **title**: Tooltip text shown on validation error

### Other Attributes

- **readOnly**: Alias for readonly
- **tabIndex**: Tab order
- **autoComplete**: Autocomplete behavior
- **spellCheck**: Enable/disable spell checking

Example:

```tsx
<Textbox
  placeholder="Username"
  name="username"
  required
  maxLength={20}
  minLength={3}
  pattern="[a-zA-Z0-9]+"
  title="Username must be 3-20 alphanumeric characters"
/>
```

## Real-World Use Cases

### Form Input with Validation

```tsx
function LoginForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setError('')
  }

  const handleBlur = () => {
    if (!email.includes('@')) {
      setError('Invalid email address')
    }
  }

  return (
    <div>
      <Textbox
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        variant={error ? 'invalid' : 'default'}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && <div id="email-error">{error}</div>}
    </div>
  )
}
```

### Search Input with Keyboard Shortcuts

```tsx
import { useRef, useEffect } from 'react'
import Textbox from '@cypress-design/react-textbox'
import { IconShapeLightningBolt } from '@cypress-design/react-icon'

function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && e.target !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <Textbox
      ref={inputRef}
      iconLeft={IconShapeLightningBolt}
      placeholder="Search (press / to focus)"
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.currentTarget.blur()
        }
      }}
    />
  )
}
```

### Controlled Input with Debouncing

```tsx
function DebouncedSearch() {
  const [value, setValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, 300)

    return () => clearTimeout(timer)
  }, [value])

  return (
    <>
      <Textbox
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
      />
      <p>Searching for: {debouncedValue}</p>
    </>
  )
}
```

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
import { IconActionSearch } from '@cypress-design/react-icon'
import Textbox from '@cypress-design/react-textbox'

export default () => (
  <Textbox iconLeft={IconActionSearch} placeholder="Search..." />
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

Theme mode: 'auto' adapts to system preference, 'light' or 'dark' forces a mode

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

<p><b>type</b> <code class="bg-gray-50 py-[2px] px-[4px] rounded">any</code></p>

Label text or element on the right side

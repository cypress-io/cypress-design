# Alert

## Install

```bash
npm install @cypress-design/react-alert
```

or with yarn

```bash
yarn add @cypress-design/react-alert
```

## Usage

```ts
import Alert from '@cypress-design/react-alert'
```

The simplest is to use with plain text. The only prop that is required is the `title`. By default, type is `info`.

```jsx live
import Alert from '@cypress-design/react-alert'

export const AlertComp = () => {
  return <Alert variant="error" title="This is an info message" />
}
```

One can also have rich text in both the title and the body.

```jsx live
import Alert from '@cypress-design/react-alert'

export const AlertComp = () => {
  return (
    <Alert
      title={
        <>
          This is an <code>info</code> message
        </>
      }
    >
      <p>This is the body of the alert.</p>
    </Alert>
  )
}
```

If you want the alert to be dismissible, you can add the `dismissible` prop. Don't forget to add the `onDismiss` prop to handle the dismiss event.

```jsx live
import Alert from '@cypress-design/react-alert'

export const AlertComp = () => {
  const [dismissed, setDismissed] = React.useState(false)
  return dismissed ? (
    <div>dismissed</div>
  ) : (
    <Alert
      title="This is an info message"
      dismissible
      onDismiss={() => setDismissed(true)}
    />
  )
}
```

You can also remove the rounded corners and the icon of the alert by adding the `notRounded` and `noIcon` props.

```jsx live
import Alert from '@cypress-design/react-alert'

export const AlertComp = () => {
  return (
    <Alert
      variant="warning"
      title="This is an info message"
      notRounded
      noIcon
    />
  )
}
```

```jsx live
<Alert variant="clear" title="This is an info message" />
```

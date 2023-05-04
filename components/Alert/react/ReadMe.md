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
import Button from '@cypress-design/react-button'

export const AlertComp = () => (
  <div className="bg-white m-4 p-4">
    <Alert
      variant="clear"
      dismissible
      title={
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 inline"
          >
            <path
              d="M8 0L0.552002 2.656L1.688 12.504L8 16L14.312 12.504L15.448 2.656L8 0Z"
              fill="#DD0031"
            />
            <path
              d="M8 0L8.00001 1.776V1.768L8 16L14.312 12.504L15.448 2.656L8 0Z"
              fill="#C3002F"
            />
            <path
              d="M8.00001 1.768L3.34401 12.208H5.08001L6.01601 9.872H9.96801L10.904 12.208H12.64L8.00001 1.768ZM9.36001 8.432H6.64001L8.00001 5.16L9.36001 8.432Z"
              fill="white"
            />
          </svg>
          Angular component testing is available for this project
        </>
      }
      footer={
        <div className="p-4 flex gap-4">
          <Button variant="outline-indigo" size="32">
            Quick setup
          </Button>
          <Button variant="link" size="32">
            Read our guides
          </Button>
          <div class="flex-grow grow" />
          <Button variant="link" size="32">
            Give feedback
          </Button>
        </div>
      }
    >
      You can now use Cypress to develop and test individual components without
      running your whole application. Generate the config in just a few clicks.
    </Alert>
  </div>
)
```

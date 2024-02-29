# Menu

## Install

```bash
npm install @cypress-design/react-menu
```

or with yarn

```bash
yarn add @cypress-design/react-menu
```

```jsx live
import {
  IconGeneralChatBubble,
  IconAnimatedGeneralChatBubble,
  IconTechnologyServerAlt,
  IconAnimatedTechnologyServer,
  IconTechnologyGitBranches,
  IconAnimatedTechnologyGitBranches,
  IconViewPieChart,
  IconAnimatedViewChart,
  IconObjectGear,
  IconAnimatedObjectGear,
  IconWindowCodeEditor,
} from '@cypress-design/react-icon'

export default () => {
  const [activePath, setActivePath] = React.useState('#runs')

  return (
    <>
      <pre>URL: {activePath}</pre>
      <Menu
        className="w-64"
        activePath={activePath}
        items={[
          {
            label: 'Runs',
            icon: (props) => <IconTechnologyServerAlt {...props} />,
            iconActive: IconAnimatedTechnologyServer,
            href: '#runs',
          },
          {
            label: 'Reviews',
            icon: (props) => <IconGeneralChatBubble {...props} />,
            iconActive: IconAnimatedGeneralChatBubble,
            href: '#reviews',
          },
          {
            label: 'Branches',
            icon: (props) => <IconTechnologyGitBranches {...props} />,
            iconActive: IconAnimatedTechnologyGitBranches,
            href: '#branches',
          },
          {
            label: 'Insights',
            icon: (props) => <IconViewPieChart {...props} />,
            iconActive: IconAnimatedViewChart,
            href: '#insights',
            items: [
              'Run status',
              'Run duration',
              'Test suite size',
              'Top failures',
              'Slowest tests',
              'Most common errors',
              'Flaky tests',
            ].map((l) => ({
              label: l,
              href: `#${l.toLowerCase().replace(/ /g, '-')}`,
            })),
          },
          {
            label: 'Specs',
            icon: (props) => <IconWindowCodeEditor {...props} />,
            iconActive: ({ animated, ...props }) => (
              <IconWindowCodeEditor {...props} />
            ),
            href: '#specs',
          },

          {
            label: 'Settings',
            icon: (props) => <IconObjectGear {...props} />,
            iconActive: IconAnimatedObjectGear,
            href: '#settings',
          },
        ]}
        onMouseDown={(e) => {
          if (e.target.href) {
            e.preventDefault()
            setActivePath(`#${e.target.href.split('#')[1]}`)
          }
        }}
      />
    </>
  )
}
```

import DocMenu, {
  type NavGroup,
  type NavItemLink,
} from '@cypress-design/react-docmenu'

const items: (NavItemLink | NavGroup)[] = [
  { label: 'Page', href: '#page' },
  {
    label: 'Overview',
    items: [
      { label: 'Overview Item 1', href: '#item1' },
      { label: 'Overview Item 2', href: '#item2' },
    ],
  },
]

export default function NotCollapsible() {
  // With `collapsible` off, every group stays open and has no toggle.
  return <DocMenu activePath="#item1" items={items} collapsible={false} />
}

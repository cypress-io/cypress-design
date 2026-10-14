import DocMenu, {
  type NavGroup,
  type NavItemLink,
} from '@cypress-design/react-docmenu'

// `collapsed: true` starts a group closed; readers can still open it.
const items: (NavItemLink | NavGroup)[] = [
  { label: 'Page', href: '#page' },
  {
    label: 'Overview',
    collapsed: true,
    items: [
      { label: 'Overview Item 1', href: '#item1' },
      { label: 'Overview Item 2', href: '#item2' },
    ],
  },
]

export default function CollapsedGroup() {
  return <DocMenu activePath="#page" items={items} />
}

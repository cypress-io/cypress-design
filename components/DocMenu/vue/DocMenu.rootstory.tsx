import type { NavGroup, NavItemLink } from '../constants'
import DocMenu from './DocMenu.vue'

export default ({ items }: { items: (NavGroup | NavItemLink)[] }) => {
  return <DocMenu items={items} />
}

import type {
  NavGroup,
  NavItemLink,
} from '@cypress-design/constants-sidebarnavigation'

interface NavigationItem {
  name: string
  href: string
  icon: any
  current?: boolean
}

interface Project {
  id: string
  label: string
}

interface Organization {
  name: string
  icon: any
}

export interface NavigationLayoutInterface {
  items: (NavItemLink | NavGroup)[]
  currentProject: string
  currentOrganization: Organization
  projects: Project[]
  navigation: NavigationItem[]
}

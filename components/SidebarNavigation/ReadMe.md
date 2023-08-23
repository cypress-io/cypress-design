<script lang="ts" setup>
import SidebarNavigation from '@cypress-design/react-SidebarNavigation'
</script>

# SidebarNavigation

<DemoWrapper>
	<SidebarNavigation items={
    const menuItems = [
      {
        text: 'Runs',
        href: '#',
        icon: IconGeneralPlaceholder,
        active: true,
      },
      {
        text: 'Reviews',
        href: '#',
        icon: IconGeneralPlaceholder,
      },
      {
        text: 'Branches',
        href: '#',
        icon: IconGeneralPlaceholder,
      },
      {
        text: 'Insights',
        icon: IconGeneralPlaceholder,
        items: [
          {
            text: 'Run status',
            href: '#',
            active: true,
          },
          {
            text: 'Run duration',
            href: '#',
          },
          {
            text: 'Test suite size',
            href: '#',
          },
          {
            text: 'Top failures',
            href: '#',
          },
          {
            text: 'Slowest tests',
            href: '#',
          },
          {
            text: 'Most common errors',
            href: '#',
          },
          {
            text: 'Flaky tests',
            href: '#',
          },
        ],
      },
      {
        text: 'Settings',
        href: '#',
        icon: IconGeneralPlaceholder,
      },
    ]} />
</DemoWrapper>

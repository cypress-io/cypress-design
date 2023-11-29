<script lang="ts" setup>
import DocMenu from '@cypress-design/vue-docmenu'
</script>

# DocMenu

<DemoWrapper>
	<DocMenu :items="[
    {
      label: 'Page',
      href: '#',
    },
    {
      label: 'Overview',
      items: [
        {
          label: 'Overview Item 1',
          href: '#',
          active: true,
        },
        {
          label: 'Overview Item 2',
          href: '#',
        },
      ],
    }]" />
</DemoWrapper>

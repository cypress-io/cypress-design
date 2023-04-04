<script lang="ts" setup>
import DocMenu from '@cypress-design/vue-docmenu'
</script>

# DocMenu

<DemoWrapper>
	<DocMenu :items="[
    {
      text: 'Page',
      href: '#',
    },
    {
      text: 'Overview',
      items: [
        {
          text: 'Overview Item 1',
          href: '#',
          active: true,
        },
        {
          text: 'Overview Item 2',
          href: '#',
        },
      ],
    }]" />
</DemoWrapper>

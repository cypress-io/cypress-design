---
to: components/<%= h.inflection.camelize(name, false) %>/ReadMe.md
---
<script lang="ts" setup>
import <%= h.inflection.camelize(name, false) %> from '@cypress-design/vue-<%= name.toLowerCase() %>'
</script>

# <%= h.inflection.camelize(name, false) %>

<DemoWrapper>
	<div>Demo Here</div>
</DemoWrapper>


Describe your component here.

[figma::<%= h.inflection.camelize(name, false) %> (to be updated)](https://www.figma.com/file/...)
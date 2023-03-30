<script lang="ts" setup>
import Tabs from './vue/Tabs.vue'
</script>

# Tabs

<DemoWrapper>
  <p>default</p>
	<Tabs :tabs="[
    { id: 'ov', label: 'Overview', active:true },
    { id: 'cl', label: 'Command Log' },
    { id: 'err', label: 'Errors' },
    { id: 'reco', label: 'Recommendations' },
  ]"/>
  <div class="h-[24px]"/>
  <p>underline-small</p>
  <Tabs type="underline-small" :tabs="[
    { id: 'ov', label: 'Overview', active:true },
    { id: 'cl', label: 'Command Log' },
    { id: 'err', label: 'Errors' },
    { id: 'reco', label: 'Recommendations' },
  ]"/>
</DemoWrapper>

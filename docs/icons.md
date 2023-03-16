---
title: Icons
---

<script lang="ts" setup>
import {ref} from 'vue';
import { iconsMetadata } from '@cypress-design/icon-registry';
import Icon from '@cypress-design/vue-icon';

const colors = ['<default>', 'blue', 'jade', 'red', 'indigo', 'purple', 'gray'];
const strokeColor = ref({label:'teal', value:'teal'});
const fillColor = ref({label:'jade', value:'jade'});
const secondaryStrokeColor = ref({label:'indigo', value:'indigo'});
const secondaryFillColor = ref({label:'indigo', value:'indigo'});
</script>

You will find here the list all icons available to cypress developers.
Most of them can be colored using the `strokeColor` and `fillColor` props.

To know what colors you can customize, look for the letters near the icons.

- `s` means strokeColor is available
- `f` means fillColor is available
- `f+` means secondaryFillColor is available
- `s+` means secondaryStrokeColor is available

For more info, check-out the Icon component documentation on the framework you are using.

<ul>
  <li><a href="/docs/react_icon--icon">React</a></li>
  <li><a href="/docs/vue_icon--icon">Vue</a></li>
</ul>

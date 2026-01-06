<script lang="ts" setup>
import Button from '@cypress-design/vue-button'
import { IconActionPlayLarge } from '@cypress-design/vue-icon'
</script>

# Button

<DemoWrapper>
  <div class="flex items-center gap-4">
    <Button>
      Submit Form
    </Button>
    <Button square>
      <IconActionPlayLarge fill-color="indigo-400" alt="Play"/>
  	</Button>
  </div>
</DemoWrapper>

A user clicking on the "Button" component triggers an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.

It also can be render as an anchor, to navigate between pages, when you use the `href` prop.

[figma::Button](https://www.figma.com/design/YmbG6FTZ4tYlRbfTmNvwe3/Component---Buttons--v1.0----latest?node-id=901-2172)

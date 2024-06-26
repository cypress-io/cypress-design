<script lang="ts" setup>
import Button from '@cypress-design/vue-button'
import { IconActionPlayLarge } from '@cypress-design/vue-icon'
</script>

# Button

<DemoWrapper>
  <div class="flex gap-4 items-center">
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

[figma::Button](https://www.figma.com/file/1WJ3GVQyMV5e7xVxPg3yID/Design-System%2C-v1.x---%40latest?type=design&node-id=852-0&t=31Ux0Tiv1c3LsT2Q-11)

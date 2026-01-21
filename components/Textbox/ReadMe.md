<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'
</script>

# Textbox

<DemoWrapper>
  <div class="flex flex-col gap-4">
    <Textbox
      :divider="true"
      size="32"
      label-left="Label left"
      label-right="Label right"
      value="Size 32"
      :icon-left="IconShapeLightningBolt"
      :icon-right="IconShapeLightningBolt"
    />
    <Textbox
      :divider="true"
      size="40"
      label-left="Label left"
      label-right="Label right"
      value="Size 40"
      :icon-left="IconShapeLightningBolt"
      :icon-right="IconShapeLightningBolt"
    />
    <Textbox
      :divider="true"
      size="48"
      label-left="Label left"
      label-right="Label right"
      value="Size 48"
      :icon-left="IconShapeLightningBolt"
      :icon-right="IconShapeLightningBolt"
    />
    <Textbox
      :divider="true"
      variant="valid"
      size="48"
      label-left="Label left"
      label-right="Label right"
      value="Size 48"
      :icon-left="IconShapeLightningBolt"
      :icon-right="IconShapeLightningBolt"
    />
    <Textbox
      :divider="true"
      variant="invalid"
      size="48"
      label-left="Label left"
      label-right="Label right"
      value="Size 48"
      :icon-left="IconShapeLightningBolt"
      :icon-right="IconShapeLightningBolt"
    />
    <Textbox
      :divider="true"
      variant="warning"
      size="48"
      label-left="Label left"
      label-right="Label right"
      value="Size 48"
      :icon-left="IconShapeLightningBolt"
      :icon-right="IconShapeLightningBolt"
    />
  </div>
</DemoWrapper>

Future consideration:

- Css can't differentiate between focus and focus visible states for the Textbox. To make this possible we will probably need to use JS
- Icon color's currently can't be customized by the developer. They are applied via css

[figma::Tag](https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=911-826&t=aU2glMF0Jlp2jNYC-4)

import Checkbox from './Checkbox.vue';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

export const Sample = () => (
  <div class="p-4">
    <Checkbox label="Sample" id="sample" modelValue={true} />
  </div>
);

Sample.storyName = "Checkbox"
Sample.parameters = {
  controls: { hideNoControlsWarning: true },
  design: {
    type: "figma",
    url: 'https://www.figma.com/file/1WJ3GVQyMV5e7xVxPg3yID/Design-System?node-id=1027%3A9825',
  }
}

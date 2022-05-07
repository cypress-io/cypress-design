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

Sample.story = { name: "Checkbox" }
Sample.parameters = {
  controls: { hideNoControlsWarning: true },
}

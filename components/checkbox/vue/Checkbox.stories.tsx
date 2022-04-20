import Checkbox from "./Checkbox.vue";

export default {
  title: "Vue/Checkbox",
  component: Checkbox,
};

export const Sample = (args: any) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Checkbox },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { ...args };
  },
  // Then, the spread values can be accessed directly in the template
  render() {
    return <Checkbox id="sample" modelValue={true} />;
  },
});

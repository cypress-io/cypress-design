import CyRadio from './Radio.vue';

export default {
  title: 'Example/Radio',
  component: CyRadio,
};


export const Sample = () => ({
  components: { CyRadio },
  template: `<cy-radio 
    name="Sample" 
    label="Sample" 
    variant="Sample" 
    :options="[ 
      { 
        label: 'option 1', 
        value: 'val1' 
      },
      { 
        label: 'option 2', 
        value: 'val2' 
      },
    ]"/>`,
})
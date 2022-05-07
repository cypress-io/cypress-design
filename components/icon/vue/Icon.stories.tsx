import Icon from './Icon'

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    name: {
      control: { type: 'select' },
    },
    size: {
      control: { type: 'select' },
    },
    strokeColor: {
      control: { type: 'select' },
    },
    fillColor: {
      control: { type: 'select' },
    },
    secondaryStrokeColor: {
      control: { type: 'select' },
    },
    secondaryFillColor: {
      control: { type: 'select' },
    }
  }
};

export const Sample = (args: any) => {
  if(args.name === undefined) {
    args.name = 'placeholder'
  }
  return <Icon {...args} />
}

Sample.story = { name: "Icon" }
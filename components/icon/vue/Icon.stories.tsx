import { iconsMetadata } from '@cypress-design/icon-registry';
import Icon from './Icon'

const colors = ['jade', 'teal', 'red', 'indigo', 'blue', 'purple', 'gray'];

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    name: {
      options: Object.keys(iconsMetadata),
      control: { type: 'select' },
    },
    size: {
      options: ['8', '16', '32', '48', '120'],
      control: { type: 'select' },
    },
    strokeColor: {
      options: colors.map(color => `${color}-500`),
      control: { type: 'select' },
    },
    fillColor: {
      options: colors.map(color => `${color}-100`),
      control: { type: 'select' },
    },
    secondaryStrokeColor: {
      options: colors.map(color => `${color}-500`),
      control: { type: 'select' },
    },
    secondaryFillColor: {
      options: colors.map(color => `${color}-100`),
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
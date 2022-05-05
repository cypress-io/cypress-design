import { type Icon, compileIcon } from '@cypress-design/icon-registry';
import { h, type SVGAttributes } from 'vue';

export default (props: Icon & SVGAttributes) => {
  return h('svg', compileVueIconProperties(compileIcon(props)));
};

export const compileVueIconProperties = ({
  body,
  compiledClasses,
  size,
  ...attributes
}: SVGAttributes & {
  body: string;
  compiledClasses: string[];
  size: string;
}) => {
  const componentProps: any = {
    width: size,
    height: size,
    fill: 'none',
    innerHTML: body,
    ...attributes, // add all standard attributes back to the svg tag
  };
  if (attributes.class) {
    compiledClasses.push(attributes.class);
  }
  if (compiledClasses.length) {
    componentProps.class = compiledClasses.join(' ');
  }
  return componentProps;
};

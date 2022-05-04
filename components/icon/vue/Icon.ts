import { type Icon, compileIcon } from '@cypress-design/icon-registry';
import { h, type SVGAttributes } from 'vue';

export default (props: Icon & SVGAttributes) => {
  const {
    // all these constants are going to be dumped
    iconId,
    size: _s,
    darkColor,
    lightColor,
    secondaryDarkColor,
    secondaryLightColor,
    class: className,
    ...attributes // we want to extract all standard SVG attributes separately
  } = props as any;
  const { size, compiledClasses, body } = compileIcon(props);
  const componentProps: any = {
    width: size,
    height: size,
    fill: 'none',
    innerHTML: body,
    ...attributes, // add all standard attributes back to the svg tag
  };
  if (className) {
    compiledClasses.push(className);
  }
  if (compiledClasses.length) {
    componentProps.class = compiledClasses.join(' ');
  }
  return h('svg', componentProps);
};

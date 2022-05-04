import { type Icon, compileIcon } from '@cypress-design/icon-registry';
import { h } from 'vue';

export default (props: Icon) => {
  const { size, compiledClasses, iconData } = compileIcon(props);
  const componentProps: any = {
    width: size,
    height: size,
    fill: 'none',
    innerHTML: iconData.data,
  };
  if (compiledClasses.length) {
    componentProps.class = compiledClasses.join(' ');
  }
  return h('svg', componentProps);
};

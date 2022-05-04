import * as React from 'react';
import { type Icon as IconProps, compileIcon } from '@cypress-design/icon-registry';
import type { FunctionComponent } from 'react';

const styles: Record<string, string> = {};


export const Icon: FunctionComponent<IconProps> = (props) => {
  const { size, compiledClasses, iconData } = compileIcon(props);
  const componentProps: any = {
    height: size,
    width: size,
    fill: 'none',
    dangerouslySetInnerHTML: {
      __html: iconData.data
    }
  }
  if(compiledClasses.length){
    componentProps.className = compiledClasses.join(' ');
  }
  return React.createElement('svg', componentProps);
};

export default Icon;

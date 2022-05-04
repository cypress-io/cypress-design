import * as React from 'react';
import {
  type Icon as IconProps,
  compileIcon,
} from '@cypress-design/icon-registry';
import type { FunctionComponent } from 'react';

export const Icon: FunctionComponent<
  IconProps & React.SVGProps<SVGSVGElement>
> = (props) => {
  const {
    // all these constants are going to be dumped
    iconId,
    size: _s,
    darkColor,
    lightColor,
    secondaryDarkColor,
    secondaryLightColor,
    className,
    ...attributes // we want to extract all standard SVG attributes separately
  } = props as any;
  const { size, compiledClasses, iconData } = compileIcon(props);
  const componentProps: any = {
    height: size,
    width: size,
    fill: 'none',
    ...attributes,
    dangerouslySetInnerHTML: {
      __html: iconData.data,
    },
  };
  if (className) {
    compiledClasses.push(className);
  }
  if (compiledClasses.length) {
    componentProps.className = compiledClasses.join(' ');
  }
  return React.createElement('svg', componentProps);
};

export default Icon;

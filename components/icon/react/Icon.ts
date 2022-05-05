import * as React from 'react';
import { type IconProps, compileIcon } from '@cypress-design/icon-registry';
import type { FunctionComponent } from 'react';

export const Icon: FunctionComponent<
  IconProps & React.SVGProps<SVGSVGElement>
> = (props) => {
  return React.createElement(
    'svg',
    compileReactIconProperties(compileIcon(props))
  );
};

export const compileReactIconProperties = ({
  body,
  compiledClasses,
  size,
  strokeColor,
  fillColor,
  secondaryStrokeColor,
  secondaryFillColor,
  ...attributes
}: {
  body: string;
  compiledClasses: string[];
  size: string;
  strokeColor?;
  fillColor?;
  secondaryStrokeColor?;
  secondaryFillColor?;
} & React.SVGProps<SVGSVGElement>) => {
  const componentProps: any = {
    width: size,
    height: size,
    fill: 'none',
    dangerouslySetInnerHTML: {
      __html: body,
    },
    ...attributes, // add all standard attributes back to the svg tag
  };
  if (attributes.className) {
    compiledClasses.push(attributes.className);
  }
  if (compiledClasses.length) {
    componentProps.className = compiledClasses.join(' ');
  }
  return componentProps;
};

export default Icon;

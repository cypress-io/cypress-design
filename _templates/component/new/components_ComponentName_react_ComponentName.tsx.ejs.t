---
to: components/<%= h.inflection.camelize(name, false) %>/react/<%= h.inflection.camelize(name, false) %>.tsx
---
import cs from 'clsx';
import * as React from 'react';
import type { FunctionComponent } from 'react';

const styles: Record<string, string> = {};

export interface <%= h.inflection.camelize(name, false) %>Props {
  id: string;
  label?: string;
}

export const <%= h.inflection.camelize(name, false) %>: FunctionComponent<<%= h.inflection.camelize(name, false) %>Props> = ({
  id,
  label,
}) => {
  return (
    <div id={id} >
      <label>{ label }</label>
      Render Function for <%= h.inflection.camelize(name, false) %>
    </div>
  );
};

export default <%= h.inflection.camelize(name, false) %>;

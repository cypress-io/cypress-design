---
to: components/<%= h.capitalize(name) %>/react/<%= h.capitalize(name) %>.tsx
---
import cs from 'clsx';
import * as React from 'react';
import type { FunctionComponent } from 'react';

const styles: Record<string, string> = {};

export interface <%= h.capitalize(name) %>Props {
  id: string;
  label?: string;
}

export const <%= h.capitalize(name) %>: FunctionComponent<<%= h.capitalize(name) %>Props> = ({
  id,
  label,
}) => {
  return (
    <div id={id} >
      <label>{ label }</label>
      Render Function for <%= h.capitalize(name) %>
    </div>
  );
};

export default <%= h.capitalize(name) %>;

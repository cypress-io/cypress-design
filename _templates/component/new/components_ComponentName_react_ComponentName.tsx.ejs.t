---
to: components/<%= h.inflection.camelize(name, false) %>/react/<%= h.inflection.camelize(name, false) %>.tsx
---
import * as React from 'react'
import clsx from 'clsx'

const styles: Record<string, string> = {}

export interface <%= h.inflection.camelize(name, false) %>Props {
  id: string
  label?: string
  className?: string
}

export const <%= h.inflection.camelize(name, false) %>: React.FC<
  <%= h.inflection.camelize(name, false) %>Props & React.HTMLProps<HTMLDivElement>
> = ({ id, label, className, ...rest }) => {
  return (
    <div {...rest} id={id} className={clsx('bg-jade-100', className)}>
      <label>{label}</label>
      Render Function for <%= h.inflection.camelize(name, false) %>
    </div>
  )
}

export default <%= h.inflection.camelize(name, false) %>

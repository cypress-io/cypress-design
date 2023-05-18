import * as React from 'react'
import Input from './Input'

export default (options: { id?: string }) => {
  const { id = 'foo', ...rest } = options
  return <Input id={id} {...rest} />
}

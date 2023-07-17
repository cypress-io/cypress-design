import * as React from 'react'
import NavigationSide from './NavigationSide'

export default (options: { id?: string }) => {
  const { id = 'foo', ...rest } = options
  return <NavigationSide id={id} {...rest} />
}

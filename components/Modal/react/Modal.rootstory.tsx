import * as React from 'react'
import Modal from './Modal'

export default (options: { id?: string }) => {
  const { id = 'foo', ...rest } = options
  return <Modal id={id} {...rest} />
}

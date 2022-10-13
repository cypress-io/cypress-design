import * as React from 'react'
import Carousel from './Carousel'

export default (options: { id?: string }) => {
  const { ...rest } = options
  return (
    <Carousel {...rest}>
      <img src="http://placekitten.com/g/400/300" alt="kitten" />
      <img src="http://placekitten.com/g/500/200" alt="kitten" />
      <img src="http://placekitten.com/g/600/500" alt="kitten" />
      <img src="http://placekitten.com/g/300/100" alt="kitten" />
      <img src="http://placekitten.com/g/200/400" alt="kitten" />
      <img src="http://placekitten.com/g/400/600" alt="kitten" />
      <img src="http://placekitten.com/g/500/200" alt="kitten" />
      <img src="http://placekitten.com/g/300/300" alt="kitten" />
      <img src="http://placekitten.com/g/200/500" alt="kitten" />
    </Carousel>
  )
}

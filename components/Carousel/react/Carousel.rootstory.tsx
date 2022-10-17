import * as React from 'react'
import Carousel from './Carousel'

export default (options: { id?: string }) => {
  const { ...rest } = options
  return (
    <>
      <Carousel {...rest}>
        <img src="http://placekitten.com/g/400/300" alt="kitten" />
        <div className="h-200px w-300px bg-gray-900" />
        <img src="http://placekitten.com/g/500/200" alt="kitten" />
        <div className="h-400px w-600px bg-gray-900 text-red-200">hello</div>
        <img src="http://placekitten.com/g/600/500" alt="kitten" />
        <img src="http://placekitten.com/g/300/100" alt="kitten" />
        <img src="http://placekitten.com/g/200/400" alt="kitten" />
        <img src="http://placekitten.com/g/400/600" alt="kitten" />
        <img src="http://placekitten.com/g/500/200" alt="kitten" />
        <img src="http://placekitten.com/g/300/300" alt="kitten" />
        <img src="http://placekitten.com/g/200/500" alt="kitten" />
      </Carousel>
      <Carousel {...rest}>
        <img src="http://placekitten.com/g/400/300" alt="kitten" />
        <div className="h-200px w-300px bg-gray-900" />
      </Carousel>
    </>
  )
}

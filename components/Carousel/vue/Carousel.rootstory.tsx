import Carousel from './Carousel.vue'

export default (options: { id?: string }) => {
  const { id = 'foo', ...rest } = options
  return <Carousel id={id} {...rest} />
}

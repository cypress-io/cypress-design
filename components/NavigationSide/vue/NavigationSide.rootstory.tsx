import NavigationSide from './NavigationSide.vue'

export default (options: { id?: string }) => {
  const { id = 'foo', ...rest } = options
  return <NavigationSide id={id} {...rest} />
}

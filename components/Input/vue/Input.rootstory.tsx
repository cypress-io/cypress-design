import Input from './Input.vue'

export default (options: { id?: string }) => {
  const { id = 'foo', ...rest } = options
  return <Input id={id} {...rest} />
}

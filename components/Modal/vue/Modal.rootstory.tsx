import Modal from './Modal.vue'

export default (options: { id?: string }) => {
  const { id = 'foo', ...rest } = options
  return <Modal id={id} {...rest} />
}

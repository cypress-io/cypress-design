import Checkbox from './Checkbox.vue'

export default (options: {
  color?: 'jade' | 'indigo' | 'red'
  checked?: boolean
}) => {
  const { checked = true, color } = options
  return <Checkbox checked={checked} label="Checked" color={color} />
}

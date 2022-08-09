import { IconActionQuestionMarkCircle } from '@cypress-design/vue-icon'
import Accordion from './Accordion.vue'

export default (
  options: {
    title?: string
    description?: string
    icon?: any
    separator?: boolean
    open?: boolean
  } = {}
) => {
  const {
    title = 'Accordion Title',
    description = 'Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla.',
    icon = IconActionQuestionMarkCircle,
    separator = true,
    open = false,
  } = options

  return (
    <>
      <Accordion
        title={title}
        separator={separator}
        description={description}
        icon={icon}
        open={open}
      >
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio dolore
          omnis nemo minus, sapiente magni laudantium eligendi modi deserunt ea
          non iure consequatur sed id quidem! Ad.
        </p>
      </Accordion>
    </>
  )
}

import { IconActionQuestionMarkCircle } from '@cypress-design/vue-icon'
import Accordion from './Accordion.vue'

export default (
  options: {
    title?: string
    description?: string
    icon?: any
  } = {}
) => {
  const {
    title = 'Accordion Title',
    description = 'Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla.',
    icon = IconActionQuestionMarkCircle,
  } = options

  return (
    <>
      <Accordion title={title} separator description={description} icon={icon}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio dolore
          omnis nemo minus, sapiente magni laudantium eligendi modi deserunt ea
          non iure consequatur sed id quidem! Ad.
        </p>
      </Accordion>
      <hr className="my-16px" />
      <Accordion title={title} icon={icon}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio dolore
          omnis nemo minus, sapiente magni laudantium eligendi modi deserunt ea
          non iure consequatur sed id quidem reprehenderit natus voluptate! Ad.
        </p>
      </Accordion>
    </>
  )
}

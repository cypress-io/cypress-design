import { IconActionQuestionMarkCircle } from '@cypress-design/vue-icon'
import type { AccordionStoryOptions } from '../assertions'
import Accordion from './Accordion.vue'

export default (options: AccordionStoryOptions = {}) => {
  const {
    title = 'Accordion Title',
    description = 'Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla.',
    icon = IconActionQuestionMarkCircle,
    iconEl,
    separator = true,
    open = false,
    fullWidthContent = false,
    headingClassName,
    titleClassName,
    descriptionClassName,
    locked = false,
    onClickSummary,
    onToggle,
    onToggleBlocked,
  } = options

  return (
    <div class="m-[16px]">
      <Accordion
        title={title}
        separator={separator}
        description={description}
        icon={icon}
        open={open}
        fullWidthContent={fullWidthContent}
        headingClassName={headingClassName}
        titleClassName={titleClassName}
        descriptionClassName={descriptionClassName}
        locked={locked}
        onClickSummary={onClickSummary}
        onToggle={onToggle}
        onToggleBlocked={onToggleBlocked}
      >
        {{
          default: () => (
            <p data-cy="content">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
              dolore omnis nemo minus, sapiente magni laudantium eligendi modi
              deserunt ea non iure consequatur sed id quidem! Ad.
            </p>
          ),
          iconEl: iconEl
            ? () => (
                <IconActionQuestionMarkCircle
                  strokeColor="red-600"
                  fillColor="red-50"
                />
              )
            : null,
        }}
      </Accordion>
    </div>
  )
}

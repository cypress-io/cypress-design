import * as React from 'react'
import { IconActionQuestionMarkCircle } from '@cypress-design/react-icon'
import { AccordionStoryOptions } from '../assertions'
import Accordion from './Accordion'

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
    ...rest
  } = options
  return (
    <div className="m-[16px]">
      <Accordion
        title={title}
        description={description}
        icon={iconEl ? null : icon}
        iconEl={iconEl}
        separator={separator}
        open={open}
        fullWidthContent={fullWidthContent}
        headingClassName={headingClassName}
        titleClassName={titleClassName}
        descriptionClassName={descriptionClassName}
        locked={locked}
        onClickSummary={onClickSummary}
        onToggle={onToggle}
        onToggleBlocked={onToggleBlocked}
        {...rest}
      >
        <p data-cy="content">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio dolore
          omnis nemo minus, sapiente magni laudantium eligendi modi deserunt ea
          non iure consequatur sed id quidem! Ad.
        </p>
      </Accordion>
    </div>
  )
}

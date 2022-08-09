import * as React from 'react'
import clsx from 'clsx'
import { CssClasses } from '../constants'
import { AccordionAnimation } from '../accordion-animation'
import { IconChevronDownSmall } from '@cypress-design/react-icon'

export interface AccordionProps {
  title: string
  description?: string
  /**
   * Icon on the left of the heading
   */
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  separator?: boolean
  titleClassName?: string
  descriptionClassName?: string
}

export const Accordion: React.FC<
  AccordionProps & React.HTMLProps<HTMLDetailsElement>
> = ({
  title,
  description,
  icon: Icon,
  separator = false,
  children,
  titleClassName,
  descriptionClassName,
  ...rest
}) => {
  const details = React.useRef(null)
  const content = React.useRef(null)
  React.useEffect(() => {
    if (details.current && content.current) {
      new AccordionAnimation(details.current, content.current)
    }
  }, [])
  return (
    <details {...rest} className={clsx(rest.className)} ref={details}>
      <summary className={clsx('flex items-center', CssClasses.summary)}>
        {Icon && <Icon className={CssClasses.icon} />}
        {separator && <div className={CssClasses.separator} />}
        <div className="flex-grow pr-16px">
          <div
            className={clsx(
              titleClassName ? titleClassName : CssClasses.summaryTitleColor,
              CssClasses.summaryTitle
            )}
          >
            {title}
          </div>
          {description && (
            <div
              className={clsx(
                descriptionClassName
                  ? descriptionClassName
                  : CssClasses.summaryDescriptionColor,
                CssClasses.summaryDescription
              )}
            >
              {description}
            </div>
          )}
        </div>
        <IconChevronDownSmall
          strokeColor="gray-300"
          className={clsx('open:icon-dark-gray-500', CssClasses.chevron)}
        />
      </summary>
      <div ref={content} className={CssClasses.contentWrapper}>
        <div className={CssClasses.content}>{children}</div>
      </div>
    </details>
  )
}

export default Accordion

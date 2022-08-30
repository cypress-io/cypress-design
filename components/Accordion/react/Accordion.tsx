import * as React from 'react'
import clsx from 'clsx'
import { CssClasses } from '../constants'
import type { AccordionProps } from '../constants'
import { DetailsAnimation } from '@cypress-design/details-animation'
import { IconChevronDownSmall } from '@cypress-design/react-icon'

export interface AccordionPropsReact extends AccordionProps {
  /**
   * Icon to be displayed on the left of the the heading. Overridden by the iconEl prop, if both are provided.
   */
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  /**
   * Element to be displayed on the left of the the heading. Overrides the icon prop, if both are provided.
   */
  iconEl?: React.ReactNode
}

export const Accordion: React.FC<
  AccordionPropsReact & React.HTMLProps<HTMLDetailsElement>
> = ({
  title,
  description,
  icon: Icon,
  iconEl,
  separator = false,
  children,
  headingClassName,
  titleClassName,
  descriptionClassName,
  fullWidthContent,
  ...rest
}) => {
  const details = React.useRef(null)
  const content = React.useRef(null)
  React.useEffect(() => {
    if (details.current && content.current) {
      new DetailsAnimation(details.current, content.current)
    }
  }, [])
  return (
    <details {...rest} className={clsx(rest.className)} ref={details}>
      <summary
        className={clsx(
          'flex items-center',
          CssClasses.summary,
          headingClassName ?? CssClasses.summaryColor
        )}
      >
        {Boolean(iconEl) && <span className={CssClasses.icon}>{iconEl}</span>}

        {Icon && !iconEl && <Icon className={CssClasses.icon} />}

        {(Icon || iconEl) && separator && (
          <hr className={CssClasses.separator} />
        )}
        <div className="flex-grow pr-16px">
          <div
            className={clsx(
              titleClassName ?? CssClasses.summaryTitleColor,
              CssClasses.summaryTitle
            )}
          >
            {title}
          </div>
          {description && (
            <div
              className={clsx(
                CssClasses.summaryDescription,
                descriptionClassName ?? CssClasses.summaryDescriptionColor
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
        {fullWidthContent ? (
          <>{children}</>
        ) : (
          <div className={CssClasses.content}>{children}</div>
        )}
      </div>
    </details>
  )
}

export default Accordion

import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { CssClasses } from '@cypress-design/constants-accordion'
import { DetailsAnimation } from '@cypress-design/details-animation'
import { IconChevronDownSmall } from '@cypress-design/react-icon'

export interface AccordionProps {
  /**
   * Main indigo title.
   * [NOTE] Its color and font can be customized using `titleClassName`.
   */
  title: string
  /**
   * Second line in the heading.
   */
  description?: string | React.ReactNode
  /**
   * Icon to be displayed on the left of the the heading. Overridden by the iconEl prop, if both are provided.
   */
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  /**
   * Element to be displayed on the left of the the heading. Overrides the icon prop, if both are provided.
   */
  iconEl?: React.ReactNode
  /**
   * Should we add a vertical separator between the icon and the text.
   */
  separator?: boolean
  /**
   * Change the font and color of the heading title
   */
  titleClassName?: string
  /**
   * Change the font and color of the heading description
   */
  descriptionClassName?: string
  /**
   * Additional classes to add to the header of the accordion
   * > [NOTE] useful to change the background color of the header
   */
  headingClassName?: string
  /**
   * When using content that needs ti be edge to edge,
   * removes the content wrapper from the content.
   */
  fullWidthContent?: boolean
  /**
   * If true, prevents the accordion from toggling open or closed.
   */
  locked?: boolean
  /**
   * Provides access to the onClick event of the summary element.
   * Allows for custom handling or cancellation of the default behavior.
   */
  onClickSummary?: (event: MouseEvent) => boolean | undefined
  /**
   * Callback triggered when the accordion toggles open or closed.
   * @param open - The new open state of the accordion.
   */
  onToggle?: (open: boolean) => void
  /**
   * Callback triggered when a toggle attempt is blocked because the accordion is locked.
   */
  onToggleBlocked?: () => void
}

export const Accordion: React.FC<
  AccordionProps & React.HTMLProps<HTMLDetailsElement>
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
  open,
  locked = false,
  onClickSummary,
  onToggle = () => {},
  onToggleBlocked = () => {},
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(open)
  const details = React.useRef<HTMLDetailsElement>(null)
  const summary = React.useRef<HTMLDivElement>(null)
  const content = React.useRef<HTMLDivElement>(null)

  // Synchronize internal state with the `open` prop
  useEffect(() => {
    setIsOpen(open)
  }, [open])

  React.useEffect(() => {
    if (details.current && content.current) {
      new DetailsAnimation(details.current, content.current)
    }
  }, [])

  useEffect(() => {
    const summaryElement = summary?.current

    if (summaryElement) {
      const handleSummaryClick = (event: MouseEvent) => {
        // Stop the native event
        event.preventDefault()
        event.stopPropagation()

        let onClickRet: boolean | undefined = true
        if (onClickSummary) {
          onClickRet = onClickSummary(event)
        }

        // TODO: Clone the original event then check propagation.
        // If the callback returns false, don't continue.
        if (onClickRet === false) {
          return
        }

        if (locked) {
          onToggleBlocked()
        } else {
          const newIsOpen = !isOpen
          setIsOpen(newIsOpen)

          onToggle(newIsOpen)
        }
      }

      summaryElement.addEventListener('click', handleSummaryClick, {
        capture: true,
      })

      return () => {
        if (summaryElement) {
          summaryElement.removeEventListener('click', handleSummaryClick, {
            capture: true,
          })
        }
      }
    }

    return
  }, [isOpen, locked, onClickSummary, onToggle, onToggleBlocked])

  return (
    <details
      className={clsx(rest.className)}
      ref={details}
      open={isOpen}
      {...rest}
    >
      <summary
        className={clsx(
          CssClasses.summary,
          headingClassName ?? CssClasses.summaryColor,
        )}
        ref={summary}
      >
        <span className={CssClasses.summaryDiv}>
          {Boolean(iconEl) && <span className={CssClasses.icon}>{iconEl}</span>}

          {Icon && !iconEl && <Icon className={CssClasses.icon} />}

          {(Icon || iconEl) && separator && (
            <span className={CssClasses.separator} role="separator" />
          )}
          <span className="flex-grow grow pr-[16px]">
            <span
              className={clsx(
                titleClassName ?? CssClasses.summaryTitleColor,
                CssClasses.summaryTitle,
              )}
            >
              {title}
            </span>
            {description && (
              <span
                className={clsx(
                  CssClasses.summaryDescription,
                  descriptionClassName ?? CssClasses.summaryDescriptionColor,
                )}
              >
                {description}
              </span>
            )}
          </span>
          <IconChevronDownSmall
            strokeColor="gray-300"
            className={clsx(
              'chevron',
              'open:icon-dark-gray-500',
              CssClasses.chevron,
            )}
          />
        </span>
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

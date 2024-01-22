import * as React from 'react'
import classNames from 'classnames'
import Button from '@cypress-design/react-button'
import { CSS } from '@cypress-design/constants-testresult'
import StatusIcon from '@cypress-design/react-statusicon'
import {
  IconChevronDownSmall,
  IconChevronRightSmall,
  IconStatusFlaky,
  IconDocumentModifiedSquareDot,
  IconDocumentAddedSquarePlus,
} from '@cypress-design/react-icon'

export interface TestResultProps {
  status:
    | 'running'
    | 'failing'
    | 'passed'
    | 'failed'
    | 'unclaimed'
    | 'placeholder'
    | 'cancelled'
    | 'noTests'
    | 'errored'
    | 'timedOut'
    | 'overLimit'
    | 'skipped'
    | 'pending'
    | undefined
  names: string[]
  id?: string
  label?: string
  className?: string
  flaky?: boolean
  modified?: boolean
  added?: boolean
  hasGroups?: boolean
}

export const TestResult: React.FC<
  TestResultProps & React.HTMLProps<HTMLDivElement>
> = ({ status, flaky, modified, added, hasGroups, names, children }) => {
  return (
    <div data-cy="cd-tr-container" className={CSS.container}>
      <div data-cy="cd-tr-row" className={CSS.row}>
        <div data-cy="cd-tr-list" className={CSS.list}>
          <div data-cy="cd-tr-icon" className={CSS.icon}>
            <StatusIcon
              size="16"
              variant="solid"
              status={status}
              className={CSS.status_icon}
            />
          </div>
          <div
            data-cy="cd-tr-name-container-column"
            className={CSS.name.container.column}
          >
            {names.slice(0, -1).length > 0 && (
              <div
                data-cy="cd-tr-name-container-describes"
                className={CSS.name.container.describes}
              >
                {names.slice(0, -1).map((name, index) => (
                  <React.Fragment key={index}>
                    <div
                      data-cy="cd-tr-name-item"
                      className={classNames({
                        [CSS.name.item.base]: true,
                        [CSS.name.item.first]: names.length >= 2 && index === 0,
                        [CSS.name.item.middle]:
                          names.length >= 2 &&
                          index > 0 &&
                          index < names.length - 1,
                      })}
                    >
                      <span
                        data-cy="cd-tr-name-item-text"
                        className={CSS.name.item.text.base}
                      >
                        {name}
                      </span>
                    </div>
                    {index < names.length - 1 && (
                      <div
                        data-cy="cd-tr-chevron"
                        className={CSS.chevron.container}
                      >
                        <IconChevronRightSmall
                          strokeColor="gray-200"
                          className="align-top relative bottom-[-1px]"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            <div
              data-cy="cd-tr-name-container-it"
              className={CSS.name.container.it}
            >
              <span
                data-cy="cd-tr-name-item-text"
                className={[
                  CSS.name.item.text.base,
                  CSS.name.item.text.it,
                ].join(' ')}
              >
                {names.at(-1)}
              </span>
              {(flaky || modified || added) && (
                <div
                  data-cy="cd-tr-attributes"
                  className={CSS.attribute.container}
                >
                  {flaky && <IconStatusFlaky data-cy="cd-tr-flaky" />}
                  {modified && (
                    <IconDocumentModifiedSquareDot data-cy="cd-tr-modified" />
                  )}
                  {added && (
                    <IconDocumentAddedSquarePlus data-cy="cd-tr-added" />
                  )}
                </div>
              )}
            </div>
          </div>
          <div data-cy="cd-tr-actions" className={CSS.button.container}>
            {children}
            <Button
              variant="outline-light"
              size="32"
              className={CSS.button.chevron}
            >
              {!hasGroups && <IconChevronRightSmall strokeColor="gray-500" />}
              {hasGroups && <IconChevronDownSmall strokeColor="gray-500" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestResult

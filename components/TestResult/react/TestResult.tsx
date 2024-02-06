import * as React from 'react'
import clsx from 'clsx'
import {
  classes,
  type TestResultData,
} from '@cypress-design/constants-testresult'
import StatusIcon from '@cypress-design/react-statusicon'
import {
  IconChevronRightSmall,
  IconStatusFlaky,
  IconDocumentModifiedSquareDot,
  IconDocumentAddedSquarePlus,
} from '@cypress-design/react-icon'

export interface TestResultProps extends TestResultData {
  className?: string
  groups?: React.ReactNode
}

export const TestResult: React.FC<
  TestResultProps & React.HTMLProps<HTMLDivElement>
> = ({
  status,
  names,
  flaky,
  modified,
  added,
  className,
  groups,
  children,
  ...rest
}) => {
  return (
    <div
      data-cy="cd-tr-container"
      {...rest}
      className={clsx(classes.container, className)}
    >
      <div data-cy="cd-tr-row" className={classes.row}>
        <div data-cy="cd-tr-list" className={classes.list}>
          <div data-cy="cd-tr-icon" className={classes.icon}>
            <StatusIcon
              size="16"
              variant="solid"
              status={status}
              className={classes.status_icon}
            />
          </div>
          <div
            data-cy="cd-tr-name-container-column"
            className={classes.name.container.column}
          >
            {names.slice(0, -1).length > 0 && (
              <div
                data-cy="cd-tr-name-container-describes"
                className={classes.name.container.describes}
              >
                {names.slice(0, -1).map((name, index) => (
                  <React.Fragment key={index}>
                    <div
                      data-cy="cd-tr-name-item"
                      className={clsx({
                        [classes.name.item.base]: true,
                        [classes.name.item.first]:
                          names.length >= 2 && index === 0,
                        [classes.name.item.middle]:
                          names.length >= 2 &&
                          index > 0 &&
                          index < names.length - 1,
                      })}
                    >
                      <span
                        data-cy="cd-tr-name-item-text"
                        className={classes.name.item.text.base}
                      >
                        {name}
                      </span>
                    </div>
                    {index < names.length - 1 && (
                      <div
                        data-cy="cd-tr-chevron"
                        className={classes.chevron.container}
                      >
                        <IconChevronRightSmall
                          strokeColor="gray-200"
                          className="mt-[2px]"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            <div
              data-cy="cd-tr-name-container-it"
              className={classes.name.container.it}
            >
              <span
                data-cy="cd-tr-name-item-text"
                className={[
                  classes.name.item.text.base,
                  classes.name.item.text.it,
                ].join(' ')}
              >
                {names.at(-1)}
              </span>
              {(flaky || modified || added) && (
                <div
                  data-cy="cd-tr-attributes"
                  className={classes.attribute.container}
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
          {children ? (
            <div data-cy="cd-tr-actions" className={classes.button.container}>
              {children}
            </div>
          ) : null}
        </div>
        {groups ? (
          <div
            data-cy="cd-tr-group-container"
            className={classes.group.container}
          >
            {groups}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TestResult

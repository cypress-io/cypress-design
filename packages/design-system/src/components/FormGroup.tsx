import cs from 'clsx'
import React, { FunctionComponent } from 'react'
import { ControlLabel, FormGroup as BootstrapFormGroup } from 'react-bootstrap'

// prettier-ignore
export interface FormGroupProps {
  className?: string;
  /**
   The main text in the group
   */
  label: string;
  /**
   The secondary text in the group
   */
  description?: React.ReactNode;
  /** Shorthand for errorState="danger" */
  error?: boolean;
  errorState?: 'valid' | 'disabled' | 'warning' | 'danger';
  errorMessage?: React.ReactNode;
  errorIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const FormGroup: FunctionComponent<FormGroupProps> = ({
  label,
  description,
  error,
  errorState,
  errorMessage,
  errorIcon,
  children,
  className,
  ...other
}) => {
  const currentErrorState = errorState || (error === true ? 'danger' : 'valid')
  return (
    <div className={cs('input-form-group-container', className)} {...other}>
      <BootstrapFormGroup
        className={`input-form-group input-group ${currentErrorState}`}
      >
        <div className="left-column">
          <ControlLabel className="label">{label}</ControlLabel>

          <div className="text-muted description">{description}</div>
        </div>

        <div className="input-form-group-contents">
          {children}
          {errorMessage && (
            <div className="error-message">
              {errorIcon === undefined ? (
                <i className="fa fa-warning" />
              ) : (
                errorIcon
              )}{' '}
              {errorMessage}
            </div>
          )}
        </div>
      </BootstrapFormGroup>
    </div>
  )
}

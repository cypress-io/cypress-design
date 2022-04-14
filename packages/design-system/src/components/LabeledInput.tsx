import { CustomIcon } from '@frontend/design-system/src'
import React, { FunctionComponent } from 'react'
import styles from './module.LabeledInput.scss'

interface LabeledInputProps {
  icon?: JSX.Element
  label?: string
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  resetSearchHandler?: () => void
  value?: string
  id?: string
}

export const LabeledInput: FunctionComponent<LabeledInputProps> = ({
  icon,
  label,
  onChangeHandler,
  placeholder,
  resetSearchHandler,
  value,
  id,
}) => {
  return (
    <div className={styles.labeledInputContainer}>
      {icon ?? <CustomIcon name="input-icon" data-cy="input-icon" />}
      <div className={styles.labelContainer} data-cy="input-label-container">
        {value && value.length > 0 && resetSearchHandler ? (
          <div
            className={styles.iconHolder}
            onClick={() => resetSearchHandler()}
            data-cy="input-clear-icon"
          >
            <CustomIcon
              name="action-delete-xlarge"
              size="x16"
              className={styles.inputClearSearchIcon}
            />
          </div>
        ) : undefined}
        {label && (
          <>
            <div className={styles.divider} />
            <div className={styles.labelText} data-cy="labeled-input-label">
              {label}
            </div>
          </>
        )}
      </div>
      <input
        id={id}
        placeholder={placeholder}
        className="form-control"
        data-cy="labeled-input"
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  )
}

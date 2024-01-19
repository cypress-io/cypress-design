import * as React from 'react'
import clsx from 'clsx'

export interface TestResultProps {
  id: string
  label?: string
  className?: string
}

export const TestResult: React.FC<
  TestResultProps & React.HTMLProps<HTMLDivElement>
> = ({ id, label, className, ...rest }) => {
  return (
    <div {...rest} id={id} className={clsx('bg-jade-100', className)}>
      <label>{label}</label>
      Render Function for TestResult
    </div>
  )
}

export default TestResult

import React from 'react'
import { CustomIcon } from '..'
import styles from './module.CopyText.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button } from 'react-bootstrap'
import Tooltip from 'rc-tooltip'

interface CopyTextProps {
  label: string | React.ReactNode
  copyText: string
  mask?: boolean
}

export const CopyText: React.FunctionComponent<CopyTextProps> = ({
  label,
  copyText,
  mask = false,
}) => {
  const [copyState, setCopyState] = React.useState({
    copied: false,
    copyText: `Copy`,
  })
  const onCopy = () => {
    setCopyState({
      copied: true,
      copyText: 'Copied!',
    })
  }
  const resetText = () =>
    setTimeout(() => {
      setCopyState({
        ...copyState,
        copyText: `Copy`,
      })
    }, 250)
  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div className={styles.copyTextHolder}>
        <div className={styles.copyText}>
          <CustomIcon
            className={`${styles.icon} code-icon`}
            name="technology-terminal"
            size="x16"
          />
          {mask ? `(...)` : copyText}
        </div>
        <Tooltip placement="bottom" overlay={copyState.copyText}>
          <CopyToClipboard onCopy={onCopy} text={copyText}>
            <div className={styles.copyButtonHolder} onMouseOut={resetText}>
              <Button className={styles.copyButton}>
                <CustomIcon
                  className="copy-icon"
                  name="general-clipboard"
                  size="x16"
                />{' '}
                <div>Copy</div>
              </Button>
            </div>
          </CopyToClipboard>
        </Tooltip>
      </div>
    </div>
  )
}

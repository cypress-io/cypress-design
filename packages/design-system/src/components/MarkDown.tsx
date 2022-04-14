/// <reference types="@frontend/design-system/typings" />
import React, { FunctionComponent } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkDisableTokenizers from 'remark-disable-tokenizers'

interface MarkDownProps {
  message: string
}

export const MarkDown: FunctionComponent<MarkDownProps> = ({ message }) => (
  <ReactMarkdown
    className="code-markdown"
    source={message}
    linkTarget="_blank"
    plugins={[[remarkDisableTokenizers, { block: ['blockquote'] }]]}
    renderers={{
      linkReference: (reference) => {
        if (!reference.href) {
          return <React.Fragment>[{reference.children}]</React.Fragment>
        }
        return <a href={reference.$ref}>{reference.children}</a>
      },
    }}
  />
)

import * as React from 'react'
import clsx from 'clsx'
import { CircleTranslate, PathMorpher } from './_Morphers'

const DURATION = 300

const IconGeneralChatBubble: React.FC<
  React.SVGProps<SVGSVGElement> & { animated: boolean }
> = ({ className, animated, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={clsx(className)}
      {...rest}
    >
      <PathMorpher
        className="icon-dark stroke-0"
        fill="#1B1E2E"
        d="M14 18 h-1 a3 3 0 0 1-3-3 v-1 h4 a3 3 0 0 0 3-3 V8 h2 a3 3 0 0 1 3 3 v4 a3 3 0 0 1-3 3 h0 v1.3 c0 .5-.6 1-1 .7Z"
        dAnimated="M15 19 h-2 a3 3 0 0 1-3-3 v-1 h3 a5 5 0 0 0 5-5 V6 h3 a3 3 0 0 1 3 3 v7 a3 3 0 0 1-3 3 h-1 v1.7 c0 .6-.6 1-1.1.6Z"
        dur={DURATION}
        animated={animated}
      />
      <PathMorpher
        className="icon-light stroke-0"
        fill="#1B1E2E"
        d="M17 7a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3v1.3c0 .5.6 1 1 .7l4-2h4a3 3 0 0 0 3-3V7Z"
        dAnimated="M16 4a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3v1.8c0 .5.6 1 1 .7L9 13h4a3 3 0 0 0 3-3V4Z"
        dur={DURATION}
        animated={animated}
      />

      <CircleTranslate
        dur={DURATION}
        animated={animated}
        cx="6"
        cy="9"
        r="1"
        fill="#1B1E2E"
        className={clsx('icon-dark')}
        transform1="0 0"
        transform2="-1.5 -2"
      />
      <CircleTranslate
        dur={DURATION}
        animated={animated}
        cx="9.5"
        cy="9"
        r="1"
        fill="#1B1E2E"
        className={clsx('icon-dark')}
        transform1="0 0"
        transform2="-1.5 -2"
      />
      <CircleTranslate
        dur={DURATION}
        animated={animated}
        cx="13"
        cy="9"
        r="1"
        fill="#1B1E2E"
        className={clsx('icon-dark')}
        transform1="0 0"
        transform2="-1.5 -2"
      />
    </svg>
  )
}

export default IconGeneralChatBubble

import * as React from 'react'
import { PathMorpher } from './_Morphers'

const IconViewChart: React.FC<
  React.SVGProps<SVGSVGElement> & { animated: boolean }
> = ({ animated, ...rest }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <PathMorpher
        d="M12.4,21.6a9,9,0,0,0,9,-8.3c0,-0.4,-0.3,-0.7,-0.8,-0.7h-7.8a1,1,0,0,0,-0.7,0.3l-5.5,5.5c-0.3,0.3,-0.3,0.8,0,1a9,9,0,0,0,5.8,2.2z"
        dAnimated="M12,21a9,9,0,0,0,9,-8.3c0,-0.4,-0.3,-0.7,-0.8,-0.7h-7.8a1,1,0,0,0,-0.7,0.3l-5.5,5.5c-0.3,0.3,-0.3,0.8,0,1a9,9,0,0,0,5.8,2.2z"
        dur={300}
        fill="#AFB3C7"
        className="icon-light"
        animated={animated}
      />
      <PathMorpher
        d="M10.9,2.6a9,9,0,0,0,-6.3,14.8c0.3,0.3,0.8,0.3,1,0l5.6,-5.5c0.2,-0.2,0.3,-0.4,0.3,-0.7v-7.8c0,-0.5,-0.3,-0.8,-0.7,-0.8z"
        dAnimated="M11.4,3a9,9,0,0,0,-6.3,14.8c0.3,0.3,0.8,0.3,1,0l5.6,-5.5c0.2,-0.2,0.3,-0.4,0.3,-0.7v-7.8c0,-0.5,-0.3,-0.8,-0.7,-0.8z"
        dur={300}
        fill="#747994"
        className="icon-light-secondary"
        animated={animated}
      />
      <PathMorpher
        d="M 23 10.22 C 22.63 5.29 18.71 1.37 13.78 1 C 13.33 1 13 1.33 13 1.89 L 13 10.22 C 13 10.67 13.33 11 13.89 11 L 22.11 11 C 22.67 11 23 10.67 23 10.22 Z"
        dAnimated="M 21 11.3 C 20.67 6.86 17.14 3.33 12.7 3 C 12.3 3 12 3.3 12 3.8 L 12 11.3 C 12 11.7 12.3 12 12.8 12 L 20.2 12 C 20.7 12 21 11.7 21 11.3 Z"
        dur={300}
        fill="#1B1E2E"
        className="icon-dark-secondary"
        animated={animated}
      />
    </svg>
  )
}

export default IconViewChart

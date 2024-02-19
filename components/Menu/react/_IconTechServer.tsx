import * as React from 'react'

const IconTechServer: React.FC<
  React.SVGProps<SVGSVGElement> & { animated: boolean }
> = ({ animated, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g
        strokeLinecap="round"
        clipRule="evenodd"
        className="icon-dark-stroke icon-light-fill stroke-2 group-hover:stroke-0 transition-all duration-300 ease-in-out"
        stroke="currentColor"
        fill="transparent"
      >
        <g
          transform={animated ? `translate(0 -2)` : undefined}
          className="transition-transform duration-300 ease-in-out"
        >
          <path d="M2 5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Z" />
          <path d="M8 6 L16 6" strokeWidth="2" />
          <path d="M5 6Z" strokeWidth="2" />
        </g>
        <g
          className="transition-transform duration-300 ease-in-out"
          transform={animated ? `scale(1.2)` : undefined}
          transform-origin="50% 50%"
        >
          <path
            className="fill-gray-500/30"
            fillRule="evenodd"
            d="M2 11c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2Z"
          />
          <path d="M8 12 L19 12" strokeWidth="2" />
          <path d="M5 12Z" strokeWidth="2" />
        </g>
        <g
          transform={animated ? `translate(0 2)` : undefined}
          className="transition-transform duration-300 ease-in-out"
        >
          <path d="M2 17c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2Z" />
          <path d="M8 18L12 18" strokeWidth="2" />
          <path d="M5 18Z" strokeWidth="2" />
        </g>
      </g>
    </svg>
  )
}

export default IconTechServer

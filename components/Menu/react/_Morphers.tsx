import React from 'react'

interface PathMorpherProps extends React.SVGProps<SVGPathElement> {
  d: string
  dAnimated: string
  dur: number
  animated: boolean
}

export const PathMorpher: React.FC<PathMorpherProps> = ({
  d,
  dAnimated,
  dur,
  animated,
  ...props
}) => {
  const [prevAnimated, setPrevAnimated] = React.useState(animated)
  const animateRef = React.useRef<SVGAnimateElement>(null)

  React.useEffect(() => {
    if (prevAnimated === animated) {
      animateRef.current?.endElement()
    } else {
      animateRef.current?.beginElement()
      setTimeout(() => {
        setPrevAnimated(animated)
      }, dur - 15)
    }
  })

  return (
    <path d={prevAnimated ? d : dAnimated} {...props}>
      <animate
        ref={animateRef}
        attributeName="d"
        dur={`${dur}ms`}
        repeatCount="1"
        values={
          prevAnimated ? [d, dAnimated].join(';') : [dAnimated, d].join(';')
        }
        restart="always"
      />
    </path>
  )
}

interface CircleTranslateProps extends React.SVGProps<SVGCircleElement> {
  transform1: string
  transform2: string
  animated: boolean
  dur: number
}

export const CircleTranslate: React.FC<CircleTranslateProps> = ({
  transform1,
  transform2,
  animated,
  dur,
  ...props
}) => {
  const [prevAnimated, setPrevAnimated] = React.useState(animated)
  const animateRef = React.useRef<SVGAnimateTransformElement>(null)
  React.useEffect(() => {
    if (prevAnimated === animated) {
      animateRef.current?.endElement()
    } else {
      animateRef.current?.beginElement()
      setTimeout(() => {
        setPrevAnimated(animated)
      }, dur - 15)
    }
  })
  return (
    <circle
      {...props}
      transform={
        prevAnimated ? `translate(${transform1})` : `translate(${transform2})`
      }
    >
      <animateTransform
        ref={animateRef}
        attributeName="transform"
        attributeType="XML"
        type="translate"
        dur={`${dur}ms`}
        repeatCount={2}
        from={prevAnimated ? transform1 : transform2}
        to={prevAnimated ? transform2 : transform1}
        restart="always"
      />
    </circle>
  )
}

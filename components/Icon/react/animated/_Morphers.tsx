import React from 'react'

interface PathMorpherProps extends React.SVGProps<SVGPathElement> {
  d: string
  dAnimated: string
  dur?: number
  animated?: boolean
}

function useAnimatedEffect(animated: boolean, dur: number) {
  const [prevAnimated, setPrevAnimated] = React.useState(animated)
  const animateRef = React.useRef<SVGAnimateTransformElement>(null)
  React.useEffect(() => {
    if (prevAnimated === animated) {
      animateRef.current?.endElement()
    } else {
      animateRef.current?.beginElement()
      setTimeout(() => {
        setPrevAnimated(animated)
      }, dur - 10)
    }
  })
  return { prevAnimated, animateRef }
}

export const PathMorpher: React.FC<PathMorpherProps> = ({
  d,
  dAnimated,
  dur = 150,
  animated = false,
  ...props
}) => {
  const { prevAnimated, animateRef } = useAnimatedEffect(animated, dur)

  return (
    <path d={prevAnimated ? dAnimated : d} {...props}>
      {prevAnimated !== animated ? (
        <animate
          ref={animateRef}
          attributeName="d"
          dur={`${dur}ms`}
          repeatCount="1"
          values={
            prevAnimated ? [dAnimated, d].join(';') : [d, dAnimated].join(';')
          }
          restart="always"
        />
      ) : null}
    </path>
  )
}

interface CircleTranslateProps extends React.SVGProps<SVGCircleElement> {
  transform1: string
  transform2: string
  animated?: boolean
  dur?: number
}

export const CircleTranslate: React.FC<CircleTranslateProps> = ({
  transform1,
  transform2,
  animated = false,
  dur = 150,
  ...props
}) => {
  const { prevAnimated, animateRef } = useAnimatedEffect(animated, dur)

  return (
    <circle
      {...props}
      transform={
        prevAnimated ? `translate(${transform2})` : `translate(${transform1})`
      }
    >
      {prevAnimated !== animated ? (
        <animateTransform
          ref={animateRef}
          attributeName="transform"
          attributeType="XML"
          type="translate"
          dur={`${dur}ms`}
          repeatCount={2}
          from={prevAnimated ? transform2 : transform1}
          to={prevAnimated ? transform1 : transform2}
          restart="always"
        />
      ) : null}
    </circle>
  )
}

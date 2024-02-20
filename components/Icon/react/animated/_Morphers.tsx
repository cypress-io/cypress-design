import React from 'react'

interface PathMorpherProps extends React.SVGProps<SVGPathElement> {
  d: string
  dAnimated: string
  dur?: number
  animated?: boolean
  children?: React.ReactNode
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
      }, dur - 15)
    }
  })
  return { prevAnimated, animateRef }
}

export const PathMorpher: React.FC<PathMorpherProps> = ({
  d,
  dAnimated,
  dur = 150,
  animated = false,
  children,
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
      {children}
    </path>
  )
}

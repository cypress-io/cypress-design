import debounce from 'lodash/debounce'
import { useState, useMemo, useEffect } from 'react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  // avoid inducing too many rerenders.
  // wait half a second before state updates.
  const resizeHandler = useMemo(() => {
    return debounce(() => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }, 500)
  }, [setWindowSize])

  // set event listeners.
  // avoid memory leaks.
  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  })

  return windowSize
}

import { createContext } from 'react'

export const MarkerIsMovingContext = createContext<{
  setMarkerIsMoving: (markerIsMoving: boolean) => void
  markerIsMoving: boolean
}>({
  setMarkerIsMoving: () => {},
  markerIsMoving: false,
})

import { createContext } from 'react'

export const MarkerIsMovingContext = createContext<{
  setMarkerIsMoving: (markerIsMoving: boolean) => void
  markerIsMoving: boolean
  collapsible: boolean
  activePath: string
  hideMarker: () => void
}>({
  setMarkerIsMoving: () => {},
  hideMarker: () => {},
  markerIsMoving: false,
  collapsible: false,
  activePath: '',
})

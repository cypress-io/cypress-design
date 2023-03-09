import { createElement } from 'react'
import { LiveContext, LivePreview } from 'react-live-runner'
export { createRoot } from 'react-dom/client'

export const ReactPreview = ({ code }) => {
  return createElement(LiveContext, { code }, ({ scope }) => {
    return createElement(LivePreview, { scope })
  })
}

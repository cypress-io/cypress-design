export default function throttle(callback: () => void, limit: number) {
  let waiting = false // Initially, we're not waiting
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function () {
    // We return a throttled function
    if (!waiting) {
      // If we're not waiting
      callback() // Execute users function
      waiting = true // Prevent future invocations
      setTimeout(function () {
        // After a period of time
        waiting = false // And allow future invocations
      }, limit)
    }
  }
}

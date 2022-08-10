function getHiddenHeight(el: HTMLElement, width: number): number | null {
  if (!el?.cloneNode) {
    return null
  }

  const clone = el.cloneNode(true) as HTMLElement

  Object.assign(clone.style, {
    overflow: 'visible',
    height: 'auto',
    maxHeight: 'none',
    opacity: '0',
    visibility: 'hidden',
    display: 'block',
    width: `${width}px`,
  })

  el.after(clone)
  const height = clone.offsetHeight

  clone.remove()

  return height
}

/**
 * Thank you Louis Hoebregts
 * https://css-tricks.com/how-to-animate-the-details-element-using-waapi/
 */
export class DetailsAnimation {
  el: HTMLDetailsElement
  summary: HTMLElement | null
  content: HTMLElement
  animation: Animation | null
  duration: number = 200
  isClosing: boolean
  isExpanding: boolean
  constructor(el: HTMLDetailsElement, content: HTMLElement, duration?: number) {
    // Store the <details> element
    this.el = el
    // Store the <summary> element
    this.summary = el.querySelector('summary')
    // Store the <div class="content"> element
    this.content = content

    // Store the animation object (so we can cancel it if needed)
    this.animation = null
    // Store if the element is closing
    this.isClosing = false
    // Store if the element is expanding
    this.isExpanding = false
    this.duration = duration ?? this.duration
    // Detect user clicks on the summary element
    this.summary?.addEventListener('click', (e) => this.onClick(e))
  }

  onClick(e: Event) {
    // Stop default behavior from the browser
    e.preventDefault()
    // Add an overflow on the <details> to avoid content overflowing
    this.content.style.overflow = 'hidden'
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.el.open) {
      this.open()
      // Check if the element is being opened or is already open
    } else if (this.isExpanding || this.el.open) {
      this.shrink()
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true

    // Store the current height of the element
    const startHeight = `${this.content.offsetHeight}px`
    // Calculate the height of the summary
    const endHeight = `0`

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel()
    }

    // Start a WAAPI animation
    this.animation = this.content.animate(
      {
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight],
      },
      {
        duration: this.duration,
        easing: 'ease-out',
      }
    )

    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false)
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => (this.isClosing = false)
  }

  open() {
    // Apply a fixed height on the element
    this.content.style.height = `${this.content.offsetHeight}px`
    // Force the [open] attribute on the details element
    this.el.open = true
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand())
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true
    // Get the current fixed height of the element
    const startHeight = `0`
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${
      getHiddenHeight(this.content, this.el.offsetWidth ?? 0) ?? 0
    }px`

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel()
    }

    // Start a WAAPI animation
    this.animation = this.content.animate(
      {
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight],
      },
      {
        duration: this.duration,
        easing: 'ease-out',
      }
    )
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true)
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => (this.isExpanding = false)
  }

  onAnimationFinish(open: boolean) {
    // Set the open attribute based on the parameter
    this.el.open = open
    // Clear the stored animation
    this.animation = null
    // Reset isClosing & isExpanding
    this.isClosing = false
    this.isExpanding = false
    // Remove the overflow hidden and the fixed height
    this.content
      ? (this.content.style.height = this.content.style.overflow = '')
      : null
  }
}

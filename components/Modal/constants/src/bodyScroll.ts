const ATTR_DATA_MODAL_SCROLL_TOP = 'data-modal-scroll-top'
const CY_MODAL_CLASS = 'cy-modal-overflow-hidden'

export function disableBodyScroll() {
  document.body.setAttribute(ATTR_DATA_MODAL_SCROLL_TOP, `${window.scrollY}`)
  if (document.documentElement.clientWidth > window.innerWidth) {
    document.documentElement.classList.add('cy-modal-overflow-scroll-x')
  }
  if (document.documentElement.clientHeight > window.innerHeight) {
    document.documentElement.classList.add('cy-modal-overflow-scroll-y')
  }
  document.body.classList.add(CY_MODAL_CLASS)
}

export function freeBodyScroll() {
  const scrollY = parseInt(
    document.body.getAttribute(ATTR_DATA_MODAL_SCROLL_TOP) || '0'
  )
  document.body.classList.remove(CY_MODAL_CLASS)
  document.documentElement.classList.remove('cy-modal-overflow-scroll-x')
  document.documentElement.classList.remove('cy-modal-overflow-scroll-y')
  window.scrollTo({ top: scrollY })
}

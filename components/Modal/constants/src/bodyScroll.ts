export function disableBodyScroll() {
  document.body.style.top = `-${window.scrollY}px`
  document.body.classList.add('cy-modal-overflow-hidden')
  document.documentElement.classList.add('cy-modal-overflow-scroll-x')
  document.documentElement.classList.add('cy-modal-overflow-scroll-y')
}

export function freeBodyScroll() {
  const scrollY = parseInt(document.body.style.top || '0')
  document.body.style.top = ''
  document.body.classList.remove('cy-modal-overflow-hidden')
  document.documentElement.classList.remove('cy-modal-overflow-scroll')
  window.scrollTo({ top: -scrollY })
}

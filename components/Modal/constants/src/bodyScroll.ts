export function disableBodyScroll() {
  document.body.style.top = `-${window.scrollY}px`
  if (document.documentElement.clientWidth > window.innerWidth) {
    document.documentElement.classList.add('cy-modal-overflow-scroll-x')
  }
  if (document.documentElement.clientHeight > window.innerHeight) {
    document.documentElement.classList.add('cy-modal-overflow-scroll-y')
  }
  document.body.classList.add('cy-modal-overflow-hidden')
}

export function freeBodyScroll() {
  const scrollY = parseInt(document.body.style.top || '0')
  document.body.style.top = ''
  document.body.classList.remove('cy-modal-overflow-hidden')
  document.documentElement.classList.remove('cy-modal-overflow-scroll-x')
  document.documentElement.classList.remove('cy-modal-overflow-scroll-y')
  window.scrollTo({ top: -scrollY })
}

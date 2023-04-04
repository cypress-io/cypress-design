import { Ref } from 'vue'
import * as VitePress from 'vitepress'

export const APPEARANCE_KEY = 'cypress-design-system-appearance'

export function useAppearance(checked: Ref<boolean>) {
  if (!VitePress.useData) return () => {}
  const { site, isDark: mainIsDark } = VitePress.useData()

  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const classList = document.documentElement.classList
  let userPreference = localStorage.getItem(APPEARANCE_KEY)
  let isDark =
    (site.value.appearance === 'dark' && userPreference == null) ||
    (userPreference === 'auto' || userPreference == null
      ? query.matches
      : userPreference === 'dark')
  query.onchange = (e) => {
    if (userPreference === 'auto') {
      setClass((isDark = e.matches))
    }
  }

  // set switch value from local storage
  mainIsDark.value = isDark

  function toggle() {
    setClass((isDark = !isDark))
    userPreference = isDark
      ? query.matches
        ? 'auto'
        : 'dark'
      : query.matches
      ? 'light'
      : 'auto'
    localStorage.setItem(APPEARANCE_KEY, userPreference)
    mainIsDark.value = isDark
  }

  function setClass(dark: boolean): void {
    const css = document.createElement('style')
    css.type = 'text/css'
    css.appendChild(
      document.createTextNode(
        `:not(.VPSwitchAppearance):not(.VPSwitchAppearance *) {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}`
      )
    )
    document.head.appendChild(css)
    checked.value = dark
    classList[dark ? 'add' : 'remove']('dark')
    const _ = window.getComputedStyle(css).opacity
    document.head.removeChild(css)
  }

  return toggle
}

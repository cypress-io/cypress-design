import { ref } from 'vue'
import * as VitePress from 'vitepress'

export const APPEARANCE_KEY = 'cypress-design-system-appearance'

export function useDarkMode() {
  const checked = ref(false)
  if (!VitePress.useData || typeof window === 'undefined')
    return { toggle: () => {}, checked }
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
  checked.value = isDark

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
    checked.value = dark
    classList[dark ? 'add' : 'remove']('dark')
  }

  return { toggle, checked }
}

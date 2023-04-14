import { Ref, ref } from 'vue'
import * as VitePress from 'vitepress'

export const APPEARANCE_KEY = 'vitepress-theme-appearance'

export function useDarkMode(): { toggle: () => void; isDark: Ref<boolean> } {
  const isDark = ref(false)
  if (!VitePress.useData || typeof window === 'undefined')
    return { toggle: () => {}, isDark }
  const { site, isDark: mainIsDark } = VitePress.useData()

  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const classList = document.documentElement.classList
  let userPreference = localStorage.getItem(APPEARANCE_KEY)
  let _isDark =
    (site.value.appearance === 'dark' && userPreference == null) ||
    (userPreference === 'auto' || userPreference == null
      ? query.matches
      : userPreference === 'dark')

  query.onchange = (e) => {
    if (userPreference === 'auto') {
      setClass((_isDark = e.matches))
    }
  }

  // set switch value from local storage
  isDark.value = _isDark

  function toggle() {
    setClass((_isDark = !_isDark))
    userPreference = _isDark
      ? query.matches
        ? 'auto'
        : 'dark'
      : query.matches
      ? 'light'
      : 'auto'
    localStorage.setItem(APPEARANCE_KEY, userPreference)
    mainIsDark.value = _isDark
  }

  function setClass(dark: boolean): void {
    isDark.value = dark
    classList[dark ? 'add' : 'remove']('dark')
  }

  return { toggle, isDark }
}

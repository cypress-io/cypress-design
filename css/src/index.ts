/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UserOptions } from 'vite-plugin-windicss'
import VitePlugin from 'vite-plugin-windicss'
import WebpackPlugin from 'windicss-webpack-plugin'
import { getConfig } from './get-config'

export const CyCSSVitePlugin = (options: UserOptions = {}) => {
  const VitePluginCJS = VitePlugin as any
  if (typeof VitePluginCJS.default === 'function') {
    return VitePluginCJS.default(getConfig(options))
  }
  return VitePlugin(getConfig(options))
}

export const CyCSSWebpackPlugin = (options: UserOptions) => {
  const WebpackPluginCJS = WebpackPlugin as any
  if (typeof WebpackPluginCJS.default === 'function') {
    return WebpackPluginCJS.default(getConfig(options))
  }
  return new WebpackPluginCJS(getConfig(options))
}

export * from './colors'

export {
  ICON_ATTRIBUTE_NAMES_TO_CLASS_GENERATOR,
  ADDITIONAL_COLORS,
} from './icon-extractor-tools'

export { default as WindKeepRollupPlugin } from './windi-keep-rollup-plugin'
export { default as TailwindConfig } from './tailwind.config'
export { IconExtractor as TailwindIconExtractor } from './tw-icon-extractor'
export { IconExtractor as WindiIconExtractor } from './wc-icon-extractor'
export { default as WindiConfig } from './windi.config'

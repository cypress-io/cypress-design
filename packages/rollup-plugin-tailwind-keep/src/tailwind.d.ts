/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'tailwindcss/lib/Context' {
  export interface Context {
    config: any
  }
}

declare module 'tailwindcss/lib/lib/setupContextUtils.js' {
  import type { Context } from 'tailwindcss/lib/Context'
  function createContext(config: any): Context
  export { createContext }
}

declare module 'tailwindcss/lib/public/resolve-config.js' {
  function resolveConfig(config: any): any
  export { createContext as default }
}

declare module 'tailwindcss/lib/lib/generateRules.js' {
  import type { Context } from 'tailwindcss/lib/Context'
  function* resolveMatches(candidates: string, context: Context): string[][]
  export { resolveMatches }
}

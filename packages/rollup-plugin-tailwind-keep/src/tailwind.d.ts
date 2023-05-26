declare module 'tailwindcss/lib/lib/setupContextUtils.js' {
  function createContext(config: any): any
  export { createContext }
}

declare module 'tailwindcss/lib/public/resolve-config.js' {
  function resolveConfig(config: any): any
  export { createContext as default }
}

declare module 'tailwindcss/lib/lib/generateRules.js' {
  function* resolveMatches(candidates: string, context: any): string[][]
  export { resolveMatches }
}

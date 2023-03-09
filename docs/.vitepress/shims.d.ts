declare module 'parse-static-imports' {
  export interface NamedImport {
    alias: string
    name: string
  }
  export interface ImportClause {
    defaultImport: string
    moduleName: string
    namedImports: NamedImport[]
    sideEffectOnly: false
    starImport: string
  }
  export default function parseImports(code: string): ImportClause[]
}

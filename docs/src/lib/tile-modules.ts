/**
 * Modules a tile can import while it's being edited on the page.
 *
 * The on-page editor (tile-editor.ts) runs edited code in the browser, so
 * it can't resolve bare imports on its own. Each entry maps an import
 * specifier to the same module the docs site already bundles, which means
 * edited tiles use this repo's current build of each component.
 *
 * Add a line here when a new component package ships.
 */
export const tileModules: Record<string, () => Promise<unknown>> = {
  vue: () => import('vue'),
  react: () => import('react'),
  'react/jsx-runtime': () => import('react/jsx-runtime'),
  '@cypress-design/react-accordion': () =>
    import('@cypress-design/react-accordion'),
  '@cypress-design/react-alert': () => import('@cypress-design/react-alert'),
  '@cypress-design/react-button': () => import('@cypress-design/react-button'),
  '@cypress-design/react-checkbox': () =>
    import('@cypress-design/react-checkbox'),
  '@cypress-design/react-docmenu': () =>
    import('@cypress-design/react-docmenu'),
  '@cypress-design/react-favicon': () =>
    import('@cypress-design/react-favicon'),
  '@cypress-design/react-icon': () => import('@cypress-design/react-icon'),
  '@cypress-design/react-logo': () => import('@cypress-design/react-logo'),
  '@cypress-design/react-menu': () => import('@cypress-design/react-menu'),
  '@cypress-design/react-modal': () => import('@cypress-design/react-modal'),
  '@cypress-design/react-runresults': () =>
    import('@cypress-design/react-runresults'),
  '@cypress-design/react-select': () => import('@cypress-design/react-select'),
  '@cypress-design/react-spec-results': () =>
    import('@cypress-design/react-spec-results'),
  '@cypress-design/react-spinner': () =>
    import('@cypress-design/react-spinner'),
  '@cypress-design/react-statusicon': () =>
    import('@cypress-design/react-statusicon'),
  '@cypress-design/react-tabs': () => import('@cypress-design/react-tabs'),
  '@cypress-design/react-tag': () => import('@cypress-design/react-tag'),
  '@cypress-design/react-testresult': () =>
    import('@cypress-design/react-testresult'),
  '@cypress-design/react-textbox': () =>
    import('@cypress-design/react-textbox'),
  '@cypress-design/react-tooltip': () =>
    import('@cypress-design/react-tooltip'),
  '@cypress-design/vue-accordion': () =>
    import('@cypress-design/vue-accordion'),
  '@cypress-design/vue-alert': () => import('@cypress-design/vue-alert'),
  '@cypress-design/vue-button': () => import('@cypress-design/vue-button'),
  '@cypress-design/vue-checkbox': () => import('@cypress-design/vue-checkbox'),
  '@cypress-design/vue-docmenu': () => import('@cypress-design/vue-docmenu'),
  '@cypress-design/vue-favicon': () => import('@cypress-design/vue-favicon'),
  '@cypress-design/vue-icon': () => import('@cypress-design/vue-icon'),
  '@cypress-design/vue-logo': () => import('@cypress-design/vue-logo'),
  '@cypress-design/vue-menu': () => import('@cypress-design/vue-menu'),
  '@cypress-design/vue-modal': () => import('@cypress-design/vue-modal'),
  '@cypress-design/vue-runresults': () =>
    import('@cypress-design/vue-runresults'),
  '@cypress-design/vue-select': () => import('@cypress-design/vue-select'),
  '@cypress-design/vue-spinner': () => import('@cypress-design/vue-spinner'),
  '@cypress-design/vue-spinner/sfc': () =>
    import('@cypress-design/vue-spinner/sfc'),
  '@cypress-design/vue-statusicon': () =>
    import('@cypress-design/vue-statusicon'),
  '@cypress-design/vue-tabs': () => import('@cypress-design/vue-tabs'),
  '@cypress-design/vue-tag': () => import('@cypress-design/vue-tag'),
  '@cypress-design/vue-testresult': () =>
    import('@cypress-design/vue-testresult'),
  '@cypress-design/vue-textbox': () => import('@cypress-design/vue-textbox'),
  '@cypress-design/vue-tooltip': () => import('@cypress-design/vue-tooltip'),
}

<script lang="ts">
import { defineComponent, h, type PropType, type VNode } from 'vue'
import { StatusIcon } from '@cypress-design/vue-statusicon'
import {
  IconStatusFlaky,
  IconGeneralSparkleSingle,
  IconTechnologyBranchH,
} from '@cypress-design/vue-icon'
import Tooltip from '@cypress-design/vue-tooltip'

// RunResults-only tooltip overrides.
//
// The shared Tooltip hardcodes 16px / 24px / 160px-min on its inner text
// container and gray-900 / white text color on the colored wrapper. The
// popper slot only lets us inject content *inside* the inner container, so
// font and color could be set via a child wrapper, but min-width on a
// parent cannot be overridden from a child.
//
// We tag the popper slot content with a marker class
// (`cy-runresults-tooltip-${color}` — e.g. `cy-runresults-tooltip-dark` or
// `cy-runresults-tooltip-light` — applied in the popper slot below) and use
// `:has()` to target the tooltip ancestors only when our marker is present.
// The CSS lives here as a JS-injected <style> tag so consumers of
// @cypress-design/vue-runresults get the overrides without needing to import
// a separate CSS file. SFC <style> blocks would emit a separate
// dist/style.css that the JS bundle doesn't reference under Vite library
// mode — so we inject at runtime.
//
// Color values are hard-coded so the rules work outside the docs site,
// where the --cy-* CSS custom properties may not be loaded:
//   gray-300 (#bfc2d4) for dark tooltips (on light RunResults)
//   gray-700 (#5a5f7a) for light tooltips (on dark RunResults)
const RUN_RESULTS_TOOLTIP_STYLE_ID = 'cy-runresults-tooltip-style'
if (typeof document !== 'undefined') {
  if (!document.getElementById(RUN_RESULTS_TOOLTIP_STYLE_ID)) {
    const style = document.createElement('style')
    style.id = RUN_RESULTS_TOOLTIP_STYLE_ID
    // gray-300 (#BFC2D4) for dark tooltips (on light RunResults)
    // gray-700 (#5A5F7A) for light tooltips (on dark RunResults)
    const sizeRules =
      ' font-size: 14px; line-height: 20px; min-width: 0; white-space: nowrap; '
    style.textContent =
      "[role='tooltip']:has(.cy-runresults-tooltip-dark) > div { color: #bfc2d4; }" +
      "[role='tooltip']:has(.cy-runresults-tooltip-dark) > div > div:last-child {" +
      sizeRules +
      '}' +
      "[role='tooltip']:has(.cy-runresults-tooltip-light) > div { color: #5a5f7a; }" +
      "[role='tooltip']:has(.cy-runresults-tooltip-light) > div > div:last-child {" +
      sizeRules +
      '}'
    document.head.appendChild(style)
  }
}
import {
  CssClasses,
  CssTheme,
  TooltipColorForTheme,
  RUN_STATUS_VARIANTS,
  RUN_STATUS_TEXT_CLASSES,
  RUN_STATUS_BORDER_CLASSES,
  RUN_STATUS_LABELS,
  type RunResultsProps,
  type RunResultsTheme,
  type RunStatusConfig,
  type StatKey,
  getSeparatorAfterKey,
  getTooltipLabel,
  getTooltipPlacement,
  getFlakyTooltipText,
  hasAnyStat,
  showRegularStat,
  statKeyToKebab,
  statValue,
} from '@cypress-design/constants-runresults'
import { twMerge } from 'tailwind-merge'

export type {
  RunResultsProps,
  RunStatusConfig,
  RunStatusKey,
} from '@cypress-design/constants-runresults'

// Rendered via a render function rather than <template> because the
// `renderLink` callback prop returns a VNode — template ergonomics don't
// compose cleanly around a caller-provided VNode.
export default defineComponent({
  name: 'RunResults',
  inheritAttrs: false,
  props: {
    // Run-status pill — rendered when provided. See RunStatusConfig.
    runStatus: {
      type: Object as PropType<RunStatusConfig>,
      default: undefined,
    },
    // Number-or-null props use the [Number, null] array form so Vue's
    // runtime validator accepts `null` without emitting a dev-mode type
    // warning. The bare `Number` constructor only matches numbers; the
    // PropType cast is TypeScript-only.
    // All four counts are optional (default null = 0) so callers can render
    // only the run-status pill.
    passed: { type: [Number, null] as PropType<number | null>, default: null },
    failed: { type: [Number, null] as PropType<number | null>, default: null },
    skipped: {
      type: [Number, null] as PropType<number | null>,
      default: null,
    },
    pending: {
      type: [Number, null] as PropType<number | null>,
      default: null,
    },
    flaky: { type: [Number, null] as PropType<number | null>, default: null },
    selfHealed: {
      type: [Number, null] as PropType<number | null>,
      default: null,
    },
    showSelfHealed: { type: Boolean, default: false },
    theme: { type: String as PropType<RunResultsTheme>, default: 'light' },
    expanded: { type: Boolean, default: false },
    links: {
      type: Object as PropType<RunResultsProps['links']>,
      default: () => ({}),
    },
    renderLink: {
      type: Function as PropType<RunResultsProps['renderLink']>,
      default: null,
    },
    showTooltip: { type: Boolean, default: true },
    className: { type: String, default: undefined },
    pillClassName: { type: String, default: undefined },
  },
  setup(props, { attrs }) {
    function joinClasses(...parts: (string | false | undefined)[]): string {
      return parts.filter(Boolean).join(' ')
    }

    function renderIcon(statKey: StatKey): VNode {
      const kebab = statKeyToKebab(statKey)
      if (statKey === 'flaky') {
        return h(IconStatusFlaky, {
          size: '12',
          'data-cy': 'status-icon-flaky',
          class: CssClasses.iconFlaky,
        })
      }
      if (statKey === 'selfHealed') {
        return h(IconGeneralSparkleSingle, {
          size: '12',
          strokeColor: 'jade-400',
          fillColor: 'jade-50',
          'data-cy': 'status-icon-self-healed',
          class: CssClasses.iconSelfHealed,
        })
      }
      return h(StatusIcon, {
        size: '12',
        status: statKey,
        'data-cy': `status-icon-${kebab}`,
        class: CssClasses.icon,
      })
    }

    function renderStat(
      statKey: StatKey,
      count: number,
      link: string | undefined,
      applySeparator: boolean,
    ): VNode {
      const kebab = statKeyToKebab(statKey)
      const isLinked = !!link
      const label = getTooltipLabel(statKey, count, isLinked)
      const inner: VNode[] = [renderIcon(statKey), h('span', String(count))]

      let content: VNode
      if (link) {
        const linkClasses = joinClasses(
          CssClasses.link,
          CssTheme[props.theme].link,
        )
        if (props.renderLink) {
          content = props.renderLink(link, inner, linkClasses) as VNode
        } else {
          content = h(
            'a',
            {
              href: link,
              'aria-label': label,
              'data-cy': `link-${kebab}`,
              class: linkClasses,
            },
            inner,
          )
        }
      } else {
        content = h('span', { class: CssClasses.unlinked }, inner)
      }

      if (props.showTooltip) {
        const tooltipText =
          statKey === 'flaky' ? getFlakyTooltipText(count) : label
        const tooltipTarget = content
        content = h(
          Tooltip,
          {
            placement: getTooltipPlacement(statKey),
            color: TooltipColorForTheme[props.theme],
          },
          {
            default: () => tooltipTarget,
            // Marker class — picked up by the injected <style> above to apply
            // RunResults-only tooltip overrides per tooltip color variant.
            popper: () =>
              h(
                'span',
                {
                  class: `cy-runresults-tooltip-${TooltipColorForTheme[props.theme]}`,
                },
                tooltipText,
              ),
          },
        )
      }

      return h(
        'li',
        {
          'data-cy': `total-${kebab}`,
          class: joinClasses(
            CssClasses.item,
            applySeparator && CssClasses.separatorAfter,
            applySeparator && CssTheme[props.theme].separator,
          ),
        },
        [content],
      )
    }

    function renderRunStatusSegment(
      kind: 'build-number' | 'branch',
      icon: VNode,
      label: VNode,
      href: string | undefined,
      ariaLabel: string,
      applyDivider: boolean,
    ): VNode {
      const segmentBase = joinClasses(
        CssClasses.runStatusSegment,
        applyDivider && CssClasses.runStatusDivider,
        applyDivider && CssTheme[props.theme].runStatusDivider,
        applyDivider && CssClasses.runStatusSegmentDividerAdjacent,
      )
      const inner: VNode[] = [icon, label]

      if (href) {
        const linkClasses = joinClasses(
          segmentBase,
          CssClasses.runStatusLink,
          CssTheme[props.theme].runStatusLink,
        )
        if (props.renderLink) {
          return props.renderLink(href, inner, linkClasses) as VNode
        }
        return h(
          'a',
          {
            href,
            'aria-label': ariaLabel,
            'data-cy': `run-status-${kind}`,
            class: linkClasses,
          },
          inner,
        )
      }
      return h(
        'span',
        {
          'data-cy': `run-status-${kind}`,
          class: segmentBase,
        },
        inner,
      )
    }

    function renderRunStatusPill(config: RunStatusConfig): VNode | null {
      const {
        buildNumber,
        status,
        branch,
        variant = 'base',
        href,
        pillClassName,
      } = config

      // Runtime guard: if `status` isn't in the union (e.g. mid-load data or
      // an un-mapped domain enum), the destructure below would throw and take
      // the whole RunResults tree with it. Skip the pill instead — the
      // test-counts pill still renders — and warn in dev.
      const iconConfig = RUN_STATUS_VARIANTS[status]
      if (!iconConfig) {
        if (
          typeof process !== 'undefined' &&
          process.env?.NODE_ENV !== 'production'
        ) {
          console.warn(
            `[RunResults] runStatus.status="${status}" is not a valid RunStatusKey; skipping the run-status pill. Valid values: ${Object.keys(RUN_STATUS_VARIANTS).join(', ')}.`,
          )
        }
        return null
      }
      const { variant: iconVariant, size: iconSize } = iconConfig
      const isLink = variant === 'link'

      const pillClasses = twMerge(
        CssClasses.runStatusPill,
        CssTheme[props.theme].runStatusPill,
        isLink ? RUN_STATUS_BORDER_CLASSES[status] : '',
        pillClassName,
      )

      const buildNumberIcon = h(StatusIcon, {
        size: iconSize,
        status,
        variant: iconVariant,
        'data-cy': 'run-status-icon',
        class: CssClasses.runStatusIcon,
      })
      const buildNumberLabel = h(
        'span',
        { class: RUN_STATUS_TEXT_CLASSES[status] },
        `#${buildNumber}`,
      )

      const hasBranch = !!branch
      const segments: VNode[] = [
        renderRunStatusSegment(
          'build-number',
          buildNumberIcon,
          buildNumberLabel,
          href,
          `View run #${buildNumber}`,
          hasBranch,
        ),
      ]
      if (hasBranch) {
        const branchIcon = h(IconTechnologyBranchH, {
          size: '16',
          strokeColor: 'gray-500',
          'data-cy': 'run-status-branch-icon',
          class: CssClasses.runStatusIcon,
        })
        const branchLabel = h(
          'span',
          {
            class: joinClasses(
              CssClasses.runStatusBranchText,
              CssTheme[props.theme].runStatusBranchText,
            ),
          },
          branch,
        )
        segments.push(
          renderRunStatusSegment(
            'branch',
            branchIcon,
            branchLabel,
            undefined,
            '',
            false,
          ),
        )
      }

      return h(
        'span',
        {
          'data-cy': 'run-status',
          title: RUN_STATUS_LABELS[status],
          class: pillClasses,
        },
        segments,
      )
    }

    return () => {
      const summaryProps = {
        passed: props.passed,
        failed: props.failed,
        skipped: props.skipped,
        pending: props.pending,
        flaky: props.flaky,
        selfHealed: props.selfHealed,
        showSelfHealed: props.showSelfHealed,
        expanded: props.expanded,
      }

      const showTestCounts = hasAnyStat(summaryProps)
      // The pill only actually renders when `status` is a valid `RunStatusKey`
      // (see the runtime guard in renderRunStatusPill). Gate `showRunStatus`
      // on the same check so a `runStatus` with an invalid status doesn't
      // produce an empty root wrapper when the test-counts pill is also empty.
      const showRunStatus =
        !!props.runStatus && !!RUN_STATUS_VARIANTS[props.runStatus.status]

      // Both pills empty → render nothing.
      if (!showRunStatus && !showTestCounts) return null

      const separatorAfterKey = getSeparatorAfterKey(summaryProps)
      const showFlaky = statValue(props.flaky) > 0
      // Self-healed renders whenever the flag is true; the count (0 included)
      // is shown verbatim. See instructions.md / architecture.md for rationale.
      const showSelfHealedStat = !!props.showSelfHealed

      const items: VNode[] = []
      if (showFlaky) {
        items.push(
          renderStat(
            'flaky',
            statValue(props.flaky),
            props.links?.flaky,
            separatorAfterKey === 'flaky',
          ),
        )
      }
      if (showSelfHealedStat) {
        items.push(
          renderStat(
            'selfHealed',
            statValue(props.selfHealed),
            props.links?.selfHealed,
            separatorAfterKey === 'selfHealed',
          ),
        )
      }
      if (showRegularStat(props.skipped, props.expanded)) {
        items.push(
          renderStat(
            'skipped',
            statValue(props.skipped),
            props.links?.skipped,
            false,
          ),
        )
      }
      if (showRegularStat(props.pending, props.expanded)) {
        items.push(
          renderStat(
            'pending',
            statValue(props.pending),
            props.links?.pending,
            false,
          ),
        )
      }
      if (showRegularStat(props.passed, props.expanded)) {
        items.push(
          renderStat(
            'passed',
            statValue(props.passed),
            props.links?.passed,
            false,
          ),
        )
      }
      if (showRegularStat(props.failed, props.expanded)) {
        items.push(
          renderStat(
            'failed',
            statValue(props.failed),
            props.links?.failed,
            false,
          ),
        )
      }

      // The wrapper <div> is the root. Holds up to two pills:
      //   1. run-status pill (rendered when `runStatus` is set)
      //   2. test-counts pill (rendered when `hasAnyStat` is true)
      // `className` + fallthrough `attrs.class` land here. `pillClassName`
      // lands on the test-counts <ul>; `runStatus.pillClassName` lands on the
      // run-status <span>. Both merged via `tailwind-merge` so a consumer
      // override wins the Tailwind source-order conflict.
      const children: VNode[] = []
      if (showRunStatus) {
        const pill = renderRunStatusPill(props.runStatus as RunStatusConfig)
        if (pill) children.push(pill)
      }
      if (showTestCounts) {
        children.push(
          h(
            'ul',
            {
              class: twMerge(
                CssClasses.list,
                CssTheme[props.theme].list,
                props.pillClassName,
              ),
            },
            items,
          ),
        )
      }
      return h(
        'div',
        {
          ...attrs,
          'data-cy': 'run-results',
          // Array form lets Vue normalize a string/array/object fallthrough
          // `attrs.class` without manual flattening.
          class: [CssClasses.container, props.className, attrs.class],
        },
        children,
      )
    }
  },
})
</script>

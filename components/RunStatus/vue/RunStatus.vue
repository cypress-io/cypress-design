<script lang="ts">
import { defineComponent, h, type PropType, type VNode } from 'vue'
import { StatusIcon } from '@cypress-design/vue-statusicon'
import {
  IconStatusFlaky,
  IconGeneralSparkleSingleSmall,
} from '@cypress-design/vue-icon'
import Tooltip from '@cypress-design/vue-tooltip'

// RunStatus-only tooltip overrides.
//
// The shared Tooltip hardcodes 16px / 24px / 160px-min on its inner text
// container and gray-900 / white text color on the colored wrapper. The
// popper slot only lets us inject content *inside* the inner container, so
// font and color could be set via a child wrapper, but min-width on a
// parent cannot be overridden from a child.
//
// We tag the popper slot content with a marker class (see
// `cy-runstatus-tooltip-label` below) and use `:has()` to target the
// tooltip ancestors only when our marker is present. The CSS lives here as
// a JS-injected <style> tag so consumers of @cypress-design/vue-runstatus
// get the overrides without needing to import a separate CSS file. SFC
// <style> blocks would emit a separate dist/style.css that the JS bundle
// doesn't reference under Vite library mode — so we inject at runtime.
//
// Color value (#afb3c7) is the gray-400 design token, hard-coded so the
// rule works outside the docs site where --cy-gray-400 may not be loaded.
const RUN_STATUS_TOOLTIP_STYLE_ID = 'cy-runstatus-tooltip-style'
if (typeof document !== 'undefined') {
  if (!document.getElementById(RUN_STATUS_TOOLTIP_STYLE_ID)) {
    const style = document.createElement('style')
    style.id = RUN_STATUS_TOOLTIP_STYLE_ID
    // gray-300 (#BFC2D4) for dark tooltips (on light RunStatus)
    // gray-700 (#5A5F7A) for light tooltips (on dark RunStatus)
    const sizeRules =
      ' font-size: 14px; line-height: 20px; min-width: 0; white-space: nowrap; '
    style.textContent =
      "[role='tooltip']:has(.cy-runstatus-tooltip-dark) > div { color: #bfc2d4; }" +
      "[role='tooltip']:has(.cy-runstatus-tooltip-dark) > div > div:last-child {" +
      sizeRules +
      '}' +
      "[role='tooltip']:has(.cy-runstatus-tooltip-light) > div { color: #5a5f7a; }" +
      "[role='tooltip']:has(.cy-runstatus-tooltip-light) > div > div:last-child {" +
      sizeRules +
      '}'
    document.head.appendChild(style)
  }
}
import {
  CssClasses,
  CssTheme,
  TooltipColorForTheme,
  type RunStatusProps,
  type RunStatusTheme,
  type StatKey,
  getSeparatorAfterKey,
  getTooltipLabel,
  getTooltipPlacement,
  getFlakyTooltipText,
  hasAnyStat,
  showRegularStat,
  statKeyToKebab,
  statValue,
} from '@cypress-design/constants-runstatus'

// Rendered via a render function rather than <template> because the
// `renderLink` callback prop returns a VNode — template ergonomics don't
// compose cleanly around a caller-provided VNode.
export default defineComponent({
  name: 'RunStatus',
  inheritAttrs: false,
  props: {
    passed: { type: Number as PropType<number | null>, required: true },
    failed: { type: Number as PropType<number | null>, required: true },
    skipped: { type: Number as PropType<number | null>, required: true },
    pending: { type: Number as PropType<number | null>, required: true },
    flaky: { type: Number as PropType<number | null>, default: null },
    selfHealed: { type: Number as PropType<number | null>, default: null },
    showSelfHealed: { type: Boolean, default: false },
    theme: { type: String as PropType<RunStatusTheme>, default: 'light' },
    expanded: { type: Boolean, default: false },
    fullWidth: { type: Boolean, default: false },
    links: {
      type: Object as PropType<RunStatusProps['links']>,
      default: () => ({}),
    },
    renderLink: {
      type: Function as PropType<RunStatusProps['renderLink']>,
      default: null,
    },
    showTooltip: { type: Boolean, default: true },
    className: { type: String, default: undefined },
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
        return h(IconGeneralSparkleSingleSmall, {
          strokeColor: 'jade-400',
          fillColor: 'jade-50',
          'data-cy': 'status-icon-self-healed',
          class: CssClasses.icon,
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
        if (props.renderLink) {
          content = props.renderLink(link, inner) as VNode
        } else {
          content = h(
            'a',
            {
              href: link,
              'aria-label': label,
              'data-cy': `link-${kebab}`,
              class: joinClasses(CssClasses.link, CssTheme[props.theme].link),
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
            // RunStatus-only tooltip overrides per tooltip color variant.
            popper: () =>
              h(
                'span',
                {
                  class: `cy-runstatus-tooltip-${TooltipColorForTheme[props.theme]}`,
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

      if (!hasAnyStat(summaryProps)) return null

      const separatorAfterKey = getSeparatorAfterKey(summaryProps)
      const showFlaky = statValue(props.flaky) > 0
      const showSelfHealedStat =
        props.showSelfHealed && statValue(props.selfHealed) > 0

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

      return h(
        'div',
        {
          ...attrs,
          'data-cy': 'run-stats',
          class: joinClasses(
            CssClasses.container,
            props.fullWidth && CssClasses.fullWidth,
            props.className,
            attrs.class as string | undefined,
          ),
        },
        [
          h(
            'ul',
            {
              class: joinClasses(
                CssClasses.list,
                CssTheme[props.theme].list,
                props.fullWidth && CssClasses.fullWidth,
              ),
            },
            items,
          ),
        ],
      )
    }
  },
})
</script>

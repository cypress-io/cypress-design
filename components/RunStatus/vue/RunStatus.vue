<script lang="ts">
import { defineComponent, h, type PropType, type VNode } from 'vue'
import { StatusIcon } from '@cypress-design/vue-statusicon'
import {
  IconStatusFlaky,
  IconGeneralSparkleSingleSmall,
} from '@cypress-design/vue-icon'
import Tooltip from '@cypress-design/vue-tooltip'
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
  },
  setup(props) {
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

      const li = h(
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

      if (!props.showTooltip) return li

      return h(
        Tooltip,
        {
          placement: getTooltipPlacement(statKey),
          color: TooltipColorForTheme[props.theme],
        },
        {
          default: () => li,
          popper: () => label,
        },
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
          'data-cy': 'run-stats',
          class: joinClasses(
            CssClasses.container,
            props.fullWidth && CssClasses.fullWidth,
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

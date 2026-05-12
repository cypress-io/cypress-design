<script lang="ts" setup>
import { ref, computed } from 'vue'
import Button from '@cypress-design/vue-button'
import {
  IconUserGeneralOutline,
  IconActionTestReplay,
  IconCheckmark,
} from '@cypress-design/vue-icon'

type BillingCycle = 'monthly' | 'annual'
type PlanId = 'starter' | 'team' | 'business' | 'enterprise'
type PlanColor = 'teal' | 'indigo' | 'purple' | 'gray'

interface Feature {
  heading: string
}

interface Plan {
  id: PlanId
  color: PlanColor
  name: string
  description: string
  monthlyPrice: number | null
  annualPriceYearly: number | null
  annualSavings: number | null
  users: string
  testResultsMonthly: number
  features: Feature[]
  featuresHeading: string
  previousPlan?: string
}

const colorMap: Record<
  PlanColor,
  {
    topBorder: string
    bannerBg: string
    ring: string
    text: string
    iconFill: string
    iconStroke: string
    checkColor: string
    pillBg: string
    pillText: string
    btnFilled: string
    btnOutline: string
  }
> = {
  teal: {
    topBorder: 'bg-teal-400',
    bannerBg: 'bg-teal-500',
    ring: 'ring-teal-300',
    text: 'text-teal-500',
    iconFill: 'teal-50',
    iconStroke: 'teal-500',
    checkColor: 'teal-400',
    pillBg: 'bg-teal-50',
    pillText: 'text-teal-700',
    btnFilled: 'teal-dark',
    btnOutline: 'outline-teal-dark',
  },
  indigo: {
    topBorder: 'bg-indigo-400',
    bannerBg: 'bg-indigo-500',
    ring: 'ring-indigo-300',
    text: 'text-indigo-500',
    iconFill: 'indigo-50',
    iconStroke: 'indigo-500',
    checkColor: 'indigo-400',
    pillBg: 'bg-indigo-50',
    pillText: 'text-indigo-700',
    btnFilled: 'indigo-dark',
    btnOutline: 'outline-indigo',
  },
  purple: {
    topBorder: 'bg-purple-400',
    bannerBg: 'bg-purple-500',
    ring: 'ring-purple-300',
    text: 'text-purple-500',
    iconFill: 'purple-50',
    iconStroke: 'purple-500',
    checkColor: 'purple-400',
    pillBg: 'bg-purple-50',
    pillText: 'text-purple-700',
    btnFilled: 'purple-dark',
    btnOutline: 'outline-purple',
  },
  gray: {
    topBorder: 'bg-gray-1000',
    bannerBg: 'bg-gray-1000',
    ring: 'ring-gray-400',
    text: 'text-gray-1000',
    iconFill: 'gray-100',
    iconStroke: 'gray-700',
    checkColor: 'gray-700',
    pillBg: 'bg-gray-100',
    pillText: 'text-gray-800',
    btnFilled: 'gray-darkest',
    btnOutline: 'outline-gray-dark',
  },
}

const plans: Plan[] = [
  {
    id: 'starter',
    color: 'teal',
    name: 'Starter',
    description: 'For teams experienced in testing with Cypress App',
    monthlyPrice: null,
    annualPriceYearly: null,
    annualSavings: null,
    users: '50',
    testResultsMonthly: 500,
    features: [
      { heading: 'Parallelization' },
      { heading: 'Test Replay' },
      { heading: 'Project Analytics' },
      { heading: 'Cloud MCP' },
    ],
    featuresHeading: "What's included",
  },
  {
    id: 'team',
    color: 'indigo',
    name: 'Team',
    description: 'For growing teams optimizing their test suite quality',
    monthlyPrice: 75,
    annualPriceYearly: 799,
    annualSavings: 101,
    users: '50',
    testResultsMonthly: 10000,
    features: [
      { heading: 'Flake Detection' },
      { heading: 'Flaky Test Analytics' },
      { heading: 'Jira Integration' },
      { heading: 'Email Support' },
    ],
    featuresHeading: 'Everything in Starter',
    previousPlan: 'Starter',
  },
  {
    id: 'business',
    color: 'purple',
    name: 'Business',
    description:
      'For businesses improving their quality and efficiency at scale',
    monthlyPrice: 300,
    annualPriceYearly: 3199,
    annualSavings: 401,
    users: '50',
    testResultsMonthly: 10000,
    features: [
      { heading: 'Spec Prioritization' },
      { heading: 'Auto Cancellation' },
      { heading: 'GitHub Enterprise' },
      { heading: 'GitLab Enterprise' },
      { heading: 'SSO' },
    ],
    featuresHeading: 'Everything in Team',
    previousPlan: 'Team',
  },
  {
    id: 'enterprise',
    color: 'gray',
    name: 'Enterprise',
    description: 'For organizations with custom needs at an enterprise scale',
    monthlyPrice: null,
    annualPriceYearly: null,
    annualSavings: null,
    users: 'Unlimited',
    testResultsMonthly: 150000,
    features: [
      { heading: 'Enterprise Reporting' },
      { heading: 'Data Extract API' },
      { heading: 'Premium Support' },
      { heading: 'Roadmap Portal' },
      { heading: 'Technical Consultant' },
    ],
    featuresHeading: 'Everything in Business',
    previousPlan: 'Business',
  },
]

const billingCycle = ref<BillingCycle>('monthly')
const currentPlan = ref<PlanId>('starter')

const currentPlanIndex = computed(() =>
  plans.findIndex((p) => p.id === currentPlan.value),
)

function isCurrent(plan: Plan) {
  return plan.id === currentPlan.value
}

function getRelation(index: number): 'current' | 'upgrade' | 'downgrade' {
  if (index === currentPlanIndex.value) return 'current'
  return index > currentPlanIndex.value ? 'upgrade' : 'downgrade'
}

function displayPrice(plan: Plan): string {
  if (plan.id === 'enterprise') return "Let's chat"
  if (plan.monthlyPrice === null) return 'Free'
  if (billingCycle.value === 'monthly') return `$${plan.monthlyPrice}`
  return `$${Math.round(plan.annualPriceYearly! / 12)}`
}

function priceInfo(plan: Plan): string {
  if (plan.id === 'starter') return 'No credit card required'
  if (plan.id === 'enterprise') return 'Custom pricing'
  if (billingCycle.value === 'annual')
    return `Billed annually at $${plan.annualPriceYearly!.toLocaleString()}`
  return `*Save $${plan.annualSavings}/year on annual plan`
}

function testResultsDisplay(plan: Plan): string {
  let value = plan.testResultsMonthly
  if (billingCycle.value === 'annual' && plan.id !== 'starter')
    value = value * 12
  if (value >= 1_000_000)
    return (value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1) + 'M'
  if (value >= 1000)
    return (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + 'k'
  return value.toString()
}

function testResultsPeriod(plan: Plan): string {
  if (plan.id === 'starter' || billingCycle.value === 'monthly')
    return '/ month'
  return '/ year'
}

function primaryBtnLabel(plan: Plan, index: number): string {
  const rel = getRelation(index)
  if (rel === 'current') return 'Current plan'
  if (plan.id === 'enterprise') return 'Schedule a demo'
  if (rel === 'upgrade') return 'Upgrade'
  return 'Downgrade'
}

function primaryBtnVariant(plan: Plan, index: number): string {
  const rel = getRelation(index)
  if (rel === 'current') return 'disabled'
  if (rel === 'upgrade') return colorMap[plan.color].btnFilled
  return colorMap[plan.color].btnOutline
}
</script>

<template>
  <div class="w-full">
    <!-- Back link -->
    <a
      href="#"
      class="inline-flex items-center gap-1.5 text-sm text-indigo-500 hover:text-indigo-700 mb-8 group transition-colors"
    >
      <svg
        class="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M10 12L6 8l4-4" />
      </svg>
      Back to Billing &amp; Usage
    </a>

    <!-- Page header -->
    <div class="text-center mb-10">
      <h1 class="text-[32px] font-bold text-gray-900 mb-2">Choose your plan</h1>
      <p class="text-gray-700 text-base">
        Plans designed to scale with your team.
      </p>

      <!-- Billing toggle -->
      <div class="inline-flex bg-gray-100 rounded-full p-1 mt-6 gap-0.5">
        <button
          :class="[
            'rounded-full px-5 py-2 text-sm transition-all',
            billingCycle === 'monthly'
              ? 'bg-white shadow-sm text-gray-900 font-medium'
              : 'text-gray-500 hover:text-gray-700',
          ]"
          @click="billingCycle = 'monthly'"
        >
          Monthly
        </button>
        <button
          :class="[
            'rounded-full px-5 py-2 text-sm transition-all flex items-center gap-2',
            billingCycle === 'annual'
              ? 'bg-white shadow-sm text-gray-900 font-medium'
              : 'text-gray-500 hover:text-gray-700',
          ]"
          @click="billingCycle = 'annual'"
        >
          Annually
          <span
            class="text-xs font-medium bg-jade-50 text-jade-600 border border-jade-200 px-2 py-0.5 rounded-full"
          >
            Save 11%
          </span>
        </button>
      </div>

      <!-- Dev plan selector -->
      <div
        class="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400"
      >
        <span
          class="font-mono bg-gray-100 border border-gray-200 text-gray-400 px-1.5 py-0.5 rounded"
          >DEV</span
        >
        Simulating current plan:
        <select
          v-model="currentPlan"
          class="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 bg-white"
        >
          <option value="starter">Starter</option>
          <option value="team">Team</option>
          <option value="business">Business</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>
    </div>

    <!-- Plan cards -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch"
    >
      <div
        v-for="(plan, i) in plans"
        :key="plan.id"
        :class="[
          'relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm',
          isCurrent(plan)
            ? `ring-2 ${colorMap[plan.color].ring} ring-offset-0`
            : '',
        ]"
      >
        <!-- 4px colored top bar -->
        <div class="h-[4px] shrink-0" :class="colorMap[plan.color].topBorder" />

        <!-- Title section: name + pill + description -->
        <div class="px-6 pt-6 pb-5 min-h-[172px]">
          <div class="flex items-center gap-2 mb-2 h-[32px]">
            <h2
              class="text-[22px] font-semibold leading-[32px]"
              :class="colorMap[plan.color].text"
            >
              {{ plan.name }}
            </h2>
            <span
              v-if="isCurrent(plan)"
              class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              :class="[
                colorMap[plan.color].pillBg,
                colorMap[plan.color].pillText,
              ]"
            >
              Current
            </span>
          </div>
          <p class="text-[14px] font-normal leading-[22px] text-gray-700">
            {{ plan.description }}
          </p>
        </div>

        <!-- Price section -->
        <div
          class="border-t border-gray-100 px-6 py-6 min-h-[200px] flex flex-col"
        >
          <p v-if="plan.monthlyPrice !== null" class="text-sm text-gray-500">
            Starting at
          </p>
          <p
            v-else
            class="text-sm text-gray-200 select-none"
            aria-hidden="true"
          >
            &nbsp;
          </p>

          <div class="flex w-full items-end gap-1 mt-0.5">
            <h3 class="text-[30px] font-bold leading-[40px] text-gray-1000">
              {{ displayPrice(plan) }}
            </h3>
            <p
              v-if="plan.monthlyPrice !== null"
              class="mb-1 text-sm text-gray-700"
            >
              / month
            </p>
          </div>

          <p class="mt-1 text-[13px] leading-[20px] text-gray-500 min-h-[40px]">
            {{ priceInfo(plan) }}
          </p>

          <Button
            :variant="primaryBtnVariant(plan, i)"
            size="40"
            :disabled="isCurrent(plan)"
            class="mt-auto w-full justify-center"
          >
            {{ primaryBtnLabel(plan, i) }}
          </Button>
        </div>

        <!-- Includes + features -->
        <div class="border-t border-gray-100 px-6 py-6 flex-1 flex flex-col">
          <p
            class="mb-4 text-sm font-semibold text-gray-800 uppercase tracking-wide"
          >
            Includes:
          </p>
          <ul class="flex flex-col gap-3 mb-5">
            <!-- Users -->
            <li
              class="flex h-[24px] flex-row items-center gap-2 text-[14px] text-gray-700"
            >
              <IconUserGeneralOutline
                :fill-color="colorMap[plan.color].iconFill"
                :stroke-color="colorMap[plan.color].iconStroke"
              />
              {{ plan.users }} users
            </li>

            <!-- Test results -->
            <li
              class="flex h-[24px] flex-row items-center gap-2 text-[14px] text-gray-700"
            >
              <IconActionTestReplay
                :fill-color="colorMap[plan.color].iconFill"
                :stroke-color="colorMap[plan.color].iconStroke"
              />
              {{ testResultsDisplay(plan) }} test results
              {{ testResultsPeriod(plan) }}
            </li>
          </ul>

          <!-- Feature list -->
          <div class="pt-4 border-t border-gray-100 flex-1">
            <p class="text-sm font-medium text-gray-800 mb-3">
              <template v-if="plan.previousPlan">
                Everything in
                <span :class="colorMap[plan.color].text">{{
                  plan.previousPlan
                }}</span
                >, plus:
              </template>
              <template v-else>{{ plan.featuresHeading }}:</template>
            </p>
            <ul class="space-y-2.5">
              <li
                v-for="feature in plan.features"
                :key="feature.heading"
                class="flex items-center gap-2"
              >
                <IconCheckmark
                  class="shrink-0"
                  size="16"
                  :stroke-color="colorMap[plan.color].checkColor"
                />
                <span class="text-[14px] text-gray-700">{{
                  feature.heading
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-10 text-center space-y-2 pb-8">
      <p class="text-xs text-gray-400">
        * Additional test results will be billed at the end of each billing
        period.
      </p>
      <p class="text-sm text-gray-500">
        Want to compare all features in detail?
        <a
          href="https://www.cypress.io/pricing"
          target="_blank"
          rel="noopener noreferrer"
          class="text-indigo-500 hover:text-indigo-700 underline"
        >
          View full pricing →
        </a>
      </p>
    </div>
  </div>
</template>

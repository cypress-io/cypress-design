import React from 'react'
import { SpecResults } from '@cypress-design/react-spec-results'
import type { SpecResultsProps } from '@cypress-design/react-spec-results'

// Same island-boundary constraint as SpecResultsCancelable.tsx: a ReactNode
// or function prop passed in from .astro frontmatter can't survive
// client:only's JSON serialization, so `description` and the callbacks are
// built here, inside the hydrated component, keyed off a plain string prop
// the .astro file *can* pass across the boundary.
type Variant =
  | 'timedout'
  | 'errored'
  | 'cancelled-manual'
  | 'cancelled-auto'
  | 'no-tests'

const Heading = ({ children }: { children: React.ReactNode }) => (
  <p className="font-semibold text-[16px] text-gray-900 mb-[4px]">{children}</p>
)

const DESCRIPTIONS: Record<Variant, React.ReactNode> = {
  timedout: (
    <>
      <Heading>Run timed out</Heading>
      <p>
        The run started, but never completed. This can happen when the run is
        cancelled from CI or when Cypress crashes during running tests. Check
        your CI logs for more information.
      </p>
    </>
  ),
  errored: (
    <>
      <Heading>Run errored</Heading>
      <p>
        We detected that the Chrome Renderer process just crashed. We have
        failed the current spec but will continue running the next spec.
      </p>
    </>
  ),
  'cancelled-manual': (
    <>
      <Heading>Run manually cancelled</Heading>
      <p className="flex items-center gap-[6px]">
        <img
          src="https://i.pravatar.cc/32"
          alt=""
          className="h-[16px] w-[16px] rounded-full"
        />
        <span>
          <b>Eric Koston</b> manually cancelled this run{' '}
          <span className="font-medium" title="Sep 3, 2026, 9:42 AM">
            2m ago
          </span>
          .
        </span>
      </p>
    </>
  ),
  'cancelled-auto': (
    <>
      <Heading>Run automatically cancelled</Heading>
      <p className="leading-snug">
        Cypress automatically cancelled this run when{' '}
        <code className="font-mono font-semibold">
          example/actions-0.spec.js
        </code>{' '}
        failed. You can manage this behavior in Project Settings.
      </p>
    </>
  ),
  'no-tests': (
    <>
      <Heading>No tests found</Heading>
      <p>This run has no tests.</p>
    </>
  ),
}

export default function SpecResultsWithDescription(
  props: Omit<SpecResultsProps, 'onCancel' | 'onArchive' | 'description'> & {
    variant: Variant
  },
) {
  const { variant, ...rest } = props
  return (
    <SpecResults
      {...rest}
      description={DESCRIPTIONS[variant]}
      onArchive={() => {}}
    />
  )
}

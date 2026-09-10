import React from 'react'
import { SpecResults } from '@cypress-design/react-spec-results'
import type { SpecResultsProps } from '@cypress-design/react-spec-results'
import { IconShapeLightningBolt } from '@cypress-design/react-icon'

// The whole demo is a single `client:only="react"` island (see
// SpecResults.astro). Astro serializes island props to JSON, which drops
// functions and React nodes, so `onCancel` / `onArchive` / `description`
// have to be created on this side of the boundary rather than passed in
// from the .astro file.
const noop = () => {}

const Heading = ({ children }: { children: React.ReactNode }) => (
  // Demo content renders inside the docs page's `.markdown` wrapper, whose
  // `.markdown p` rule outranks a plain `mt-0`/`mb-0` utility on specificity
  // -- force it with Tailwind's `!` modifier instead.
  <p className="!mt-0 font-semibold text-[16px] !leading-4 text-gray-900 !mb-[4px]">
    {children}
  </p>
)

const TIMED_OUT = (
  <>
    <Heading>Run timed out</Heading>
    <p className="!mb-0 !leading-6">
      The run started, but never completed. This can happen when the run is
      cancelled from CI or when Cypress crashes during running tests. Check your
      CI logs for more information.
    </p>
  </>
)

const ERRORED = (
  <>
    <Heading>Run errored</Heading>
    <p className="!mb-0 !leading-6">
      We detected that the Chrome Renderer process just crashed. We have failed
      the current spec but will continue running the next spec.
    </p>
  </>
)

const CANCELLED_MANUAL = (
  <>
    <Heading>Run manually cancelled</Heading>
    <p className="!mb-0 flex items-center gap-[6px]">
      <span
        aria-hidden="true"
        className="inline-block h-[16px] w-[16px] rounded-full bg-gray-200"
      />
      <span>
        <b>Eric Koston</b> manually cancelled this run{' '}
        <span className="font-medium" title="Sep 3, 2026, 9:42 AM">
          2m ago.
        </span>
      </span>
    </p>
  </>
)

const CANCELLED_AUTO = (
  <>
    <div className="!mb-[12px] flex items-center gap-[6px]">
      <IconShapeLightningBolt
        size="16"
        fillColor="purple-200"
        strokeColor="purple-500"
        className="shrink-0"
      />
      <p className="!m-0 text-[16px] font-semibold !leading-none text-gray-900">
        Automatically cancelled by Smart Orchestration
      </p>
    </div>
    <p className="!mb-0 !leading-[20px]">
      To save CI time and surface failures faster, Cypress automatically
      cancelled this run after <b>1 test failed</b>. You can adjust this
      threshold in <a href="#">Project Settings</a>.
    </p>
  </>
)

const NO_TESTS = (
  <>
    <Heading>No tests found</Heading>
    <p className="!mb-0">This run has no tests.</p>
  </>
)

const Example = ({
  title,
  ...props
}: SpecResultsProps & { title: React.ReactNode }) => (
  <div>
    <div className="text-sm leading-5 font-medium text-gray-900 mb-3">
      {title}
    </div>
    <SpecResults {...props} />
  </div>
)

export default function SpecResultsDemo() {
  return (
    <div className="flex flex-col gap-8">
      <Example
        title="Running :: spec count not yet known"
        results={{}}
        onCancel={noop}
      />
      <Example
        title="Running :: nothing finished yet"
        results={{ running: 4, queued: 20 }}
        onCancel={noop}
      />
      <Example
        title="Running :: partial results"
        results={{ failed: 1, passed: 18, skipped: 1, running: 2, queued: 3 }}
        onCancel={noop}
      />
      <Example
        title="Running :: all passing so far"
        results={{ passed: 22, running: 2 }}
        onCancel={noop}
      />
      <Example
        title="Running :: scheduled to complete"
        results={{ failed: 1, passed: 28, skipped: 1, cancelled: 1 }}
        scheduledToComplete="60s"
      />
      <Example
        title="Completed :: all specs passed"
        results={{ passed: 31 }}
        onArchive={noop}
      />
      <Example
        title="Completed :: with failed specs"
        results={{ failed: 1, passed: 28, skipped: 1, cancelled: 1 }}
        onArchive={noop}
      />
      <Example
        title="Completed :: with errored specs"
        results={{ failed: 2, errored: 3, passed: 15, skipped: 1 }}
        onArchive={noop}
      />
      <Example
        title="Timed out"
        results={{ passed: 3, errored: 2, queued: 20 }}
        description={TIMED_OUT}
        isComplete
        onArchive={noop}
      />
      <Example
        title="Errored"
        results={{ passed: 473, failed: 1, errored: 2 }}
        description={ERRORED}
        onArchive={noop}
      />
      <Example
        title="Manually cancelled"
        results={{ passed: 76, cancelled: 361, cancelledReason: 'manual' }}
        description={CANCELLED_MANUAL}
        onArchive={noop}
      />
      <Example
        title="Automatically cancelled"
        results={{
          passed: 10,
          failed: 1,
          cancelled: 3,
          cancelledReason: 'auto',
        }}
        description={CANCELLED_AUTO}
        onArchive={noop}
      />
      <Example
        title="Run has no tests"
        results={{ skipped: 3 }}
        description={NO_TESTS}
        onArchive={noop}
      />
      <Example
        title={
          <>
            Removed specs label with{' '}
            <code className="font-mono text-sm bg-white px-1.5 py-0.5 rounded border border-gray-100">
              label=""
            </code>
          </>
        }
        results={{ failed: 1, passed: 28, skipped: 1, cancelled: 1 }}
        label=""
        onArchive={noop}
      />
    </div>
  )
}

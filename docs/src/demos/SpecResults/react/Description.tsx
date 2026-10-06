import { SpecResults } from '@cypress-design/react-spec-results'

// A timed-out run still carries queued specs, so `isComplete` marks it done.
// The `!` modifiers only beat the docs page's `.markdown p` margins.
export default function Description() {
  return (
    <SpecResults
      results={{ passed: 3, errored: 2, queued: 20 }}
      isComplete
      onArchive={() => {}}
      description={
        <>
          <p className="!mt-0 !mb-[4px] text-[16px] font-semibold !leading-4 text-gray-900">
            Run timed out
          </p>
          <p className="!mb-0 !leading-[20px]">
            The run started, but never completed. This can happen when the run
            is cancelled from CI or when Cypress crashes during running tests.
            Check your CI logs for more information.
          </p>
        </>
      }
    />
  )
}

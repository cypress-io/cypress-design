import RunResults from '@cypress-design/react-runresults'

// `showSelfHealed` gates the stat; its count renders even when 0.
export default function SelfHealed() {
  return (
    <RunResults
      passed={22}
      failed={4}
      skipped={0}
      pending={1}
      selfHealed={2}
      showSelfHealed
    />
  )
}

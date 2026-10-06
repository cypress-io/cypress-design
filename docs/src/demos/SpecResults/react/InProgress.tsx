import { SpecResults } from '@cypress-design/react-spec-results'

// Every count at zero reads as "Testing in progress" until specs are known.
export default function InProgress() {
  return <SpecResults results={{}} onCancel={() => {}} />
}

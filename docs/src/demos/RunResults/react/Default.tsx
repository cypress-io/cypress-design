import RunResults from '@cypress-design/react-runresults'

// Stats with a count of 0 are hidden.
export default function Default() {
  return <RunResults passed={22} failed={4} skipped={0} pending={1} />
}

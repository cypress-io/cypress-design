import RunResults from '@cypress-design/react-runresults'

// Flaky renders as a leading stat whenever its count is above 0.
export default function Flaky() {
  return <RunResults passed={22} failed={4} skipped={0} pending={1} flaky={3} />
}

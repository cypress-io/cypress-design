import RunResults from '@cypress-design/react-runresults'

// `expanded` shows all four regular stats, even when a count is 0.
export default function Expanded() {
  return <RunResults passed={22} failed={4} skipped={0} pending={0} expanded />
}

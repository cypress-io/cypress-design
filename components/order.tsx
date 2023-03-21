export default ({}: { disabled?: boolean; href?: string } = {}) => (
  <div className="flex flex-row flex-wrap justify-center gap-3">
    <div className="border rounded rounded-[4px] flex font-medium items-center transition duration-150 enabled:hocus:shadow-ring disabled:cursor-not-allowed focus:ring-1 focus-visible:ring-offset-0 focus-visible:outline-none" />
  </div>
)

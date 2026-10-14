import Tag from '@cypress-design/react-tag'

export default function OutlineAndDark() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tag size="24" color="jade">
        jade
      </Tag>
      <Tag size="24" color="jade" outline>
        jade outline
      </Tag>
      <Tag size="24" color="jade" dark>
        jade dark
      </Tag>
      <Tag size="24" color="jade" dark outline>
        jade dark outline
      </Tag>
    </div>
  )
}

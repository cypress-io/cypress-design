/**
 * Read the `description` from a markdown file's YAML frontmatter.
 *
 * Only single-line values are supported (plain, 'single-quoted', or
 * "double-quoted"), which covers every `.agents/` file. Block scalars throw
 * rather than silently dropping the description from llms.txt.
 */
export function frontmatterDescription(markdown) {
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1]
  if (!frontmatter) return undefined

  const value = frontmatter.match(/^description:[ \t]*(.*)$/m)?.[1].trim()
  if (value === undefined) return undefined

  if (value === '' || value.startsWith('>') || value.startsWith('|')) {
    throw new Error(
      'Frontmatter `description` must be a single-line value so llms.txt can list it',
    )
  }
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replaceAll("''", "'")
  }
  if (value.startsWith('"') && value.endsWith('"')) {
    return JSON.parse(value)
  }
  return value
}

import { execaCommand } from 'execa'
import { promises } from 'fs'
import { join } from 'path'

import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))

;(async function () {
  const { stdout } = await execaCommand('yarn workspaces info')
  const startJson = stdout.indexOf('{')
  const endJson = stdout.lastIndexOf('}')
  const workspaces = JSON.parse(stdout.slice(startJson, endJson + 1))
  const projects = Object.entries(workspaces).reduce(
    (acc, [name, { location }]) => {
      acc.push({ name, location })
      return acc
    },
    []
  )
  const file = `projects:
${projects
  .map(({ name, location }) => {
    return ` ${name
      .replace(/^@cypress-design/, '')
      .replace(/[^a-zA-Z0-9-]/g, '')}: '${location}'`
  })
  .join('\n')}`
  // write the contents to a ./automated-projects.yml file using the fs library
  await promises.writeFile(join(__dirname, './automated-projects.yml'), file)
})()
1

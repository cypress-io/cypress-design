/**
 * Build every public package in the directory `components`
 * This script needs to run before we can publish components
 */

const path = require('path')

async function build() {
  const [node, script, ...args] = process.argv
  const { execaCommand } = await import('execa')
  const { stdout: workspacesInfo } = await execaCommand(`yarn workspaces info`)
  const beginJson = workspacesInfo.indexOf('{')
  const endJson = workspacesInfo.lastIndexOf('}')
  const workspaces = JSON.parse(
    workspacesInfo.substring(beginJson, endJson + 1)
  )
  const packages = Object.keys(workspaces)
  packages
    .filter((p) => workspaces[p].location.startsWith('components'))
    .map(async (p) => {
      const packageJson = require(`../${workspaces[p].location}/package.json`)
      // if the package is private, do not build
      if (packageJson.private) return

      const command = `yarn workspace ${p} build ${args.join(' ')}`
      const { stdout } = await execaCommand(command)
      console.log(command)
      console.log(stdout)
    })
}

build()

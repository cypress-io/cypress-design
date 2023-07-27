import { execa } from 'execa'
import { promises as fs } from 'fs'
import { join } from 'path'
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

async function getVersionNumber(dep) {
  // get dependency workspace location from yarn
  const { stdout } = await execa('yarn', ['info', dep, '--json'])

  // remove first and last line from stdout
  const pkg = JSON.parse(stdout)
  return pkg.data.version
}

async function run() {
  // get workspaces packages from yarn
  const { stdout } = await execa('yarn', ['workspaces', 'info'])
  // remove first and last line from stdout
  const packages = JSON.parse(stdout.split('\n').slice(1, -1).join(''))
  const versions = await Object.entries(packages).reduce(
    async (acc, [name, { location }]) => {
      acc = await acc
      // get package.json from each package
      const pkg = JSON.parse(
        await fs.readFile(join(__dirname, '..', location, 'package.json')),
      )
      acc[name] = pkg.version
      return acc
    },
    {},
  )

  Object.values(packages).forEach(async ({ location }) => {
    // set each dependency version that has a * to the version of the package
    // extracted above
    const pkg = JSON.parse(
      await fs.readFile(join(__dirname, '..', location, 'package.json')),
    )
    if (pkg.dependencies) {
      const depsUpdated = []
      await Promise.all(
        Object.entries(pkg.dependencies).map(async ([dep, version]) => {
          if (version === '*') {
            if (versions[dep]) {
              pkg.dependencies[dep] = `^${versions[dep]}`
            } else {
              const version = await getVersionNumber(dep)
              pkg.dependencies[dep] = `^${version}`
            }
            depsUpdated.push(dep)
          }
        }),
      )

      if (depsUpdated.length === 0) return
      // write package.json to file
      await fs.writeFile(
        `${location}/package.json`,
        JSON.stringify(pkg, null, 2),
      )

      console.log()
      console.log(location.replace(/^components\//, ''))
      console.log(
        depsUpdated.reduce((acc, dep) => {
          acc[dep] = pkg?.dependencies[dep]
          return acc
        }, {}),
      )
    }
  })
}
run()

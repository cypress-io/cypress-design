const path = require('path');

async function build() {
  const [node, script, ...args] = process.argv;
  const { execaCommand } = await import('execa');
  const { stdout: workspacesInfo } = await execaCommand(`yarn workspaces info`);
  const beginJson = workspacesInfo.indexOf('{');
  const endJson = workspacesInfo.lastIndexOf('}');
  const workspaces = JSON.parse(
    workspacesInfo.substring(beginJson, endJson + 1)
  );
  const packages = Object.keys(workspaces);
  packages
    .filter((p) => workspaces[p].location.startsWith('components'))
    .map(async (p) => {
      const command = `yarn workspace ${p} build ${args.join(' ')}`;
      const { stdout } = await execaCommand(command);
      console.log(command);
      console.log(stdout);
    });
}

build();

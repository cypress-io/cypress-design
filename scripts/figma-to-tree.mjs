import https from 'https'

// Figma to Tree
//
// Goal: Export a figma component to a plaintext tree representation for developer handoff
// Usage:
//  1. Create a new Figma file with only the component you want to use, share it and get the file key from the url.
//  2. Set your access key: `export FIGMA_PERSONAL_ACCESS_TOKEN=<your access key>`
//  3. Run the script: `node scripts/figma-to-tree.mjs <file key>`

const FILE_KEY = process.argv[2] // Get file key from command line arguments
const FIGMA_PERSONAL_ACCESS_TOKEN = process.env.FIGMA_PERSONAL_ACCESS_TOKEN // Get token from environment variables

function getComponentTree() {
  const options = {
    hostname: 'api.figma.com',
    path: `/v1/files/${FILE_KEY}`,
    method: 'GET',
    headers: {
      'X-Figma-Token': FIGMA_PERSONAL_ACCESS_TOKEN,
    },
  }

  const req = https.request(options, (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      const document = JSON.parse(data).document
      printNode(document)
    })
  })

  req.on('error', (error) => {
    console.error(error)
  })

  req.end()
}

function printNode(node, indent = '') {
  console.log(`${indent}${node.name} (${node.type})`)

  if (node.children) {
    for (let child of node.children) {
      printNode(child, indent + '  ')
    }
  }
}

getComponentTree()

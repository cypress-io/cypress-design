import https from 'https'

// Figma to Tree
//
// Goal: Export a figma component to a plaintext tree representation for developer handoff
// Usage:
//  1. Create a new Figma file with only the component you want to use, share it and get the file key from the url.
//  2. Set your access key: `export FIGMA_FIGMA_FIGMA_PERSONAL_ACCESS_TOKEN=<your access key>`
//  3. Run the script: `node scripts/figma-to-tree.mjs <file key> <starting node id> <max depth> > tree.txt`

// Example:
// node ./scripts/figma-to-tree.mjs 2j2j0co3xaCHHmhACZs722 'I1:7761;1:1519' 999 > navigationSide.txt

const FILE_KEY = process.argv[2] // Get file key from command line arguments
const STARTING_NODE_ID = process.argv[3] // Get starting node ID from command line arguments
const MAX_DEPTH = process.argv[4] // Get maximum depth from command line arguments
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
      const startingNode = findNode(document, STARTING_NODE_ID)
      if (startingNode) {
        printNode(startingNode, '', MAX_DEPTH)
      } else {
        console.log(`Node with ID ${STARTING_NODE_ID} not found.`)
      }
    })
  })

  req.on('error', (error) => {
    console.error(error)
  })

  req.end()
}

function findNode(node, id) {
  if (node.id === id) {
    return node
  } else if (node.children) {
    for (let child of node.children) {
      const foundNode = findNode(child, id)
      if (foundNode) {
        return foundNode
      }
    }
  }
  return null
}

function printNode(node, indent = '', depth) {
  if (depth < 0) return // Stop if maximum depth is reached

  console.log(`${indent}${node.name}`)

  if (node.children) {
    for (let child of node.children) {
      printNode(child, indent + '  ', depth - 1) // Decrease depth with each recursive call
    }
  }
}

getComponentTree()

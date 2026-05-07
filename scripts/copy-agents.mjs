import { cpSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dest = join(root, 'docs', 'public', 'agents')

mkdirSync(dest, { recursive: true })
cpSync(join(root, '.agents'), dest, { recursive: true })

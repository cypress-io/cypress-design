# A gathering of tips and tricks along the way

During the process if making this library, I encountered a series of new challenges that were both hard and fascinating.

This page is a log of each of those challenges and the solutions found to them.

## Run Cypress CT on React & Vue

In one single run?

- Use JSX to write tests both in vue & react
- What of the conflict between the two definitions
- Solution: Use Sucrase to transpile JSX for react instead of esbuild
- why is there a rootstory file and what will happen to it in the future?

## Building components

- turbo to build them in dependency order and cache the builds
- use vite to build Vue (why)
- use rollup to build react (why)
- `--watch` cant work in a monorepo with a dependency graph
- Solution: `scripts/watch-constants.mjs` runs esbuild when necessary

## The docs

- vitepress config
- theme layout
  - dark mode switch
  - SideBar links where the pages come from
  - ordering the sidebar links
  - page outline: how to make it live and wait for the content to load before running
- component pages generation
  - docgen-cli both for React and Vue
  - the `scripts/generate-docs.mjs` script to generate the non framework pages and why
- vue-live
  - React & Vue
  - md-plugin
  - DemoWrapper
  - some challenges around css leaking from markdown to the demo
- Figma links
  - layout
  - md-plugin
- Edit buttons
  - the vercel git environment
  - vscode magic protocol

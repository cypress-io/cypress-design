/**
 * By default, storybook does not respect storySort
 * in the stories.json file. This means that the order of stories
 * is wrong initially and will change as soon as we open one story.
 * This post build script fixes that order.
 */

const { promises: fs } = require('fs')
const path = require('path')

var storiesFile = process.argv[2]

async function fixStoriesOrder(storiesFile) {
  const storiesFileFullPath = path.join(__dirname, storiesFile)
  const stories = JSON.parse(await fs.readFile(storiesFileFullPath, 'utf8'))

  const storiesKeys = Object.keys(stories.stories)
  const indexPageKey = storiesKeys.find((key) => key.startsWith('index--'))

  const sortedStories = storiesKeys
    .filter((key) => !key.startsWith('index--'))
    .sort((key, key2) => {
      return key.localeCompare(key2)
    })
    .reduce((acc, key) => {
      acc[key] = stories.stories[key]
      return acc
    }, {})

  stories.stories = {
    [indexPageKey]: stories.stories[indexPageKey],
    ...sortedStories,
  }

  await fs.writeFile(storiesFileFullPath, JSON.stringify(stories), 'utf8')
}

fixStoriesOrder(storiesFile)

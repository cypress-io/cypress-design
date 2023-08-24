// cypress/plugins/index.js
/* eslint-disable no-console */
import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openaiKey = process.env.OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: openaiKey,
})

if (!openaiKey) {
  console.warn(
    'Warning: OPENAI_API_KEY is not set. Please create a .env file and set the OPENAI_API_KEY variable.',
  )
}

// Speculate
//
// A LLM integration that speculates about what to do next.
//
export const speculate = async function (testState) {
  const prompt = `
        ${JSON.stringify(testState)}
        Speculate in plain language help me understand what to do next. 
        Check for common spelling errors, paths, and similar issues.
    `

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4',
  })

  console.log('-----------------------------------')
  console.log(prompt)
  console.log('-----------------------------------')
  console.log(completion.choices[0].message.content)
  console.log('-----------------------------------')
  return completion.choices[0].message.content
}

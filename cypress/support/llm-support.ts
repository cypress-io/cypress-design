import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({
  apiKey: 'process.env.OPENAI_API_KEY,',
})

async function callOpenAI(text) {
  const completion = openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  })

  return (await completion).choices[0].message
}

Cypress.on('uncaught:exception', async (err) => {
  return await callOpenAI(err.toString())
})

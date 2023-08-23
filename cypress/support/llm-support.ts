import { Configuration, OpenAIApi } from 'openai'
import dotenv from 'dotenv'
dotenv.config()

export const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

export const openAi = new OpenAIApi(configuration)

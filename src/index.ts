import OpenAI from "openai";
import { getCurrentWeather, getLocation, functions } from "./tools"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

async function agent(query: string): Promise<string> {
  const messages = [
    { role: "system", content: `You are a helpful AI agent. Give highly specific answers based on the information you're provided. 
    Prefer to gather information with the tools provided to you rather than giving basic, generic answers.` },
    { role: "user", content: query }
  ]

  const runner = openai.beta.chat.completions.runFunctions({
    model: "gpt-3.5-turbo",
    messages,
    functions
  })

  return await runner.finalContent()
}

console.log(await agent("quel temps fait il aujourd'hui ?"));

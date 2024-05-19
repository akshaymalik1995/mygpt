import OpenAI from "openai"
import { GPT } from "../../app/types"

export default async (query: string, activeGpt : GPT, key : string) => {
    const client = new OpenAI({
            apiKey: key,
            dangerouslyAllowBrowser: true
        })
    try {
        const response = client.chat.completions.create(
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role : "system",
                        content   : activeGpt.systemPrompt
                    },
                    {
                        role: "user",
                        content: query

                    }
                ],
                stream : true
            }
        )
        return response
    } catch (e) {
        throw new Error(e instanceof Error ? e.message : String(e))
    }
}
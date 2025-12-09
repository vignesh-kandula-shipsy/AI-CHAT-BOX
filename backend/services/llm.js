import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const systemPrompt = fs.readFileSync("./prompts/system-prompt.txt", "utf8");

export async function askLLM(question, googleData) {
    const messages = [
        { role: "system", content: systemPrompt },
        {
            role: "user",
            content: `
User question: ${question}
Google Results: ${JSON.stringify(googleData, null, 2)}
Please summarize and answer clearly.`
        }
    ];

    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages
    });

    return completion.choices[0].message.content;
}

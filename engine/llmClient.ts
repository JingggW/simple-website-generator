/**
 * LLM Client for OpenRouter
 * Using Qwen 2.5 Coder 32B (Free)
 */
import "dotenv/config";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "qwen/qwen3-coder:free";

export async function callLLM(prompt: string, systemPrompt?: string) {
  if (!OPENROUTER_API_KEY) {
    throw new Error("Missing OPENROUTER_API_KEY environment variable.");
  }

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "stepfun/step-3.5-flash:free",
        messages: [
          ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        top_p: 1,
        repetition_penalty: 1,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("OpenRouter Error:", data);
    throw new Error(
      `OpenRouter API failed: ${data.error?.message || response.statusText}`,
    );
  }

  return data.choices[0].message.content;
}

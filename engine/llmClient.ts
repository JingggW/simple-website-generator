/**
 * LLM Client for OpenRouter
 * Using Qwen 2.5 Coder 32B (Free)
 */
import "dotenv/config";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const FREE_MODEL = "openrouter/free";
const MODEL = "deepseek/deepseek-v3.2";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function callLLM(
  prompt: string,
  systemPrompt?: string,
  maxRetries: number = 3,
) {
  if (!OPENROUTER_API_KEY) {
    throw new Error("Missing OPENROUTER_API_KEY environment variable.");
  }

  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
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
              ...(systemPrompt
                ? [{ role: "system", content: systemPrompt }]
                : []),
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
        const errorMsg = data.error?.message || response.statusText;
        console.error(`OpenRouter Error (Attempt ${i + 1}):`, errorMsg);
        lastError = new Error(`OpenRouter API failed: ${errorMsg}`);

        // Retry for rate limiting, server errors, OR transient provider errors
        const isTransient =
          response.status === 429 ||
          response.status >= 500 ||
          errorMsg.toLowerCase().includes("provider") ||
          errorMsg.toLowerCase().includes("model");

        if (isTransient && i < maxRetries - 1) {
          const delay = Math.pow(2, i) * 1500;
          console.warn(
            `⏳ Transient error detected. Retrying in ${delay}ms...`,
          );
          await sleep(delay);
          continue;
        }
        throw lastError;
      }

      if (!data.choices || data.choices.length === 0) {
        lastError = new Error("OpenRouter returned empty choices.");
        await sleep(Math.pow(2, i) * 1000);
        continue;
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.warn(`⚠️ LLM Call Attempt ${i + 1} failed:`, error);
      lastError = error;
      await sleep(Math.pow(2, i) * 1000);
    }
  }

  throw lastError || new Error("LLM call failed after retries.");
}

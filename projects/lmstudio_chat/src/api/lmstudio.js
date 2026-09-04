/**
 * LM Studio Native Chat API client
 *
 * Endpoint : http://localhost:1234/api/v1/chat
 * Schema   : { model, system_prompt, input }
 * Response : { response: string, ... }
 */

// Relative path — Vite proxies /api → http://localhost:1234 (avoids CORS)
const BASE_URL = '/api/v1';
const MODEL     = 'nvidia/nemotron-3-nano-4b:2';
const SYSTEM_PROMPT = 'You are a helpful, concise, and friendly AI assistant.';

/**
 * Formats conversation history + latest user message into a single `input`
 * string the native LM Studio API can consume.
 *
 * History entries older than the latest turn are embedded as plain text so
 * the model retains context across turns.
 *
 * @param {Array<{role: string, content: string}>} history  – prior messages
 * @param {string} latestUserMessage
 * @returns {string}
 */
function buildInput(history, latestUserMessage) {
  if (history.length === 0) return latestUserMessage;

  const lines = history
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');

  return `${lines}\nUser: ${latestUserMessage}`;
}

/**
 * Sends a message to LM Studio's native /api/v1/chat endpoint.
 * Returns the assistant's reply as a string.
 *
 * @param {Array<{role: string, content: string}>} history   – conversation so far (excluding latest)
 * @param {string}  userMessage  – the new user message
 * @param {AbortSignal} [signal]
 * @returns {Promise<string>}
 */
export async function sendChat(history, userMessage, signal) {
  const input = buildInput(history, userMessage);

  const response = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      system_prompt: SYSTEM_PROMPT,
      input,
    }),
    signal,
  });

  if (!response.ok) {
    let errorDetail = `HTTP ${response.status}`;
    try { errorDetail += `: ${(await response.json()).error ?? await response.text()}`; } catch { /* ignore */ }
    throw new Error(errorDetail);
  }

  const data = await response.json();
  console.log('[LM Studio API Response]:', data);

  // LM Studio native API returns { response: "..." }
  // We also check common keys just in case.
  let rawText =
    data.response ??
    data.output   ??
    data.choices?.[0]?.message?.content ??
    data.choices?.[0]?.text ??
    '';

  // Ensure it's a string, stringify if it's an object/array
  const text = typeof rawText === 'string' ? rawText : JSON.stringify(rawText);

  if (!text && !isLoading) {
    console.warn('Empty response extracted from:', data);
  }
  
  return text;
}

export { MODEL };

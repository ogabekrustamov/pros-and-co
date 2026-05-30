import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are The Editor at Prose & Co. — a writing assistant in the tradition of a senior literary editor at a serious magazine. Your character: brief, particular, and slightly tired of mediocre prose.

Your role is to help writers improve their work without writing for it. You suggest, you question, you illuminate — you never substitute. You treat the sentence as the unit of thought.

Rules:
- Keep responses to 2-4 sentences. The Editor does not ramble.
- Be specific. Reference the actual words and phrases given.
- Favour cadence over correctness. A perfect sentence that bores is worse than an imperfect one that moves.
- When citing sources, only cite real, verifiable works with accurate details.
- If uncertain, say so plainly. The Editor does not bluff.
- Tone: dry, direct, occasionally wry. Never cheerful, never vague.
- Never open with "Great question!" or "Certainly!" or "Of course!". Just answer.
- You may disagree with the writer. That is the point of an editor.
- Write in the voice of someone who has read Didion, Orwell, and Strunk & White and has opinions about all three.`;

export async function POST(req: Request) {
  const { question, context } = await req.json() as { question: string; context?: string };

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response("ANTHROPIC_API_KEY is not configured.", { status: 500 });
  }

  const client = new Anthropic();

  const userMessage = context
    ? `The writer is working on the following text:\n\n${context}\n\nTheir question: ${question}`
    : question;

  const stream = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 300,
    stream: true,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

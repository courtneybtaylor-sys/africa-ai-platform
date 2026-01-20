import { generateText } from "ai";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] ?? "anonymous";
    
    // Apply rate limiting: 20 requests per minute for chat
    const rateLimitResult = await rateLimit(`chat:${ip}`, 20, 60);
    
    if (!rateLimitResult.success) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: rateLimitHeaders(rateLimitResult)
        }
      );
    }

    const { message } = await req.json();
    
    if (!message || typeof message !== "string" || message.length > 1000) {
      return Response.json(
        { error: "Invalid message. Message must be a string under 1000 characters." },
        { status: 400 }
      );
    }

    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      system: `You are an expert Africa travel assistant for AfriTrek, a platform helping people explore and relocate to Africa. 

Your knowledge covers:
- All 54 African countries
- Visa requirements and processes
- Safety information and travel advisories
- Best times to visit different regions
- Cultural tips and etiquette
- Cost of living and budget travel
- Digital nomad hotspots
- Business opportunities
- Healthcare and vaccinations
- Transportation options

Guidelines:
- Be helpful, friendly, and concise
- Provide specific, actionable advice
- If unsure, recommend consulting official sources
- Highlight both opportunities and realistic challenges
- Keep responses under 150 words unless more detail is needed
- Use a warm, encouraging tone about Africa travel`,
      prompt: message,
    });

    return Response.json(
      { response: text },
      { headers: rateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}

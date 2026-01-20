import { generateText } from "ai";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] ?? "anonymous";
    
    // Apply rate limiting: 5 requests per minute
    const rateLimitResult = await rateLimit(`health-advice:${ip}`, 5, 60);
    
    if (!rateLimitResult.success) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: rateLimitHeaders(rateLimitResult)
        }
      );
    }

    const { country, concerns } = await req.json();
    
    if (!country || !concerns) {
      return Response.json(
        { error: "Country and concerns are required." },
        { status: 400 }
      );
    }

    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      system: `You are a knowledgeable travel health advisor specializing in Africa. Provide helpful, accurate health and safety advice for travelers and relocators.

IMPORTANT GUIDELINES:
- Always recommend consulting healthcare professionals for medical decisions
- Provide practical, actionable advice
- Be specific to the destination country when possible
- Include both preventive measures and what to do if problems occur
- Mention relevant vaccinations, medications, and precautions
- Address the user's specific concerns directly
- Be reassuring but honest about risks
- Format your response with clear sections using markdown`,
      prompt: `Provide personalized health and safety advice for someone traveling to or relocating to ${country}.

Their specific concerns and questions:
${concerns}

Please provide comprehensive advice addressing their concerns, including:
1. Specific health precautions for ${country}
2. Recommendations based on their stated concerns
3. Practical tips for staying healthy
4. What to do if they encounter health issues
5. Resources and contacts that might be helpful

Keep your response focused and practical.`,
      maxTokens: 1000,
    });

    return Response.json(
      { advice: text },
      { headers: rateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    console.error("Health advice API error:", error);
    return Response.json(
      { error: "Failed to generate health advice" },
      { status: 500 }
    );
  }
}

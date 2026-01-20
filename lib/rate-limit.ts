import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Rate limiter using Upstash Redis
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param limit - Maximum number of requests allowed
 * @param windowInSeconds - Time window in seconds
 */
export async function rateLimit(
  identifier: string,
  limit: number = 10,
  windowInSeconds: number = 60
): Promise<RateLimitResult> {
  const key = `rate_limit:${identifier}`;
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - windowInSeconds;

  try {
    // Use a sliding window approach with sorted sets
    const pipeline = redis.pipeline();
    
    // Remove old entries outside the window
    pipeline.zremrangebyscore(key, 0, windowStart);
    
    // Count current requests in window
    pipeline.zcard(key);
    
    // Add current request
    pipeline.zadd(key, { score: now, member: `${now}:${Math.random()}` });
    
    // Set expiry on the key
    pipeline.expire(key, windowInSeconds);
    
    const results = await pipeline.exec();
    const currentCount = (results[1] as number) || 0;
    
    const remaining = Math.max(0, limit - currentCount - 1);
    const reset = now + windowInSeconds;
    
    return {
      success: currentCount < limit,
      limit,
      remaining,
      reset,
    };
  } catch (error) {
    console.error("Rate limit error:", error);
    // Fail open - allow request if rate limiting fails
    return {
      success: true,
      limit,
      remaining: limit,
      reset: now + windowInSeconds,
    };
  }
}

/**
 * Simple rate limiter headers for API responses
 */
export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.reset.toString(),
  };
}

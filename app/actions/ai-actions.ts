"use server";

import { generateObject } from "ai";
import { z } from "zod";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";

// Helper to get client identifier for rate limiting
async function getClientIdentifier(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  return forwardedFor?.split(",")[0] ?? "anonymous";
}

// Rate limit check for AI actions (5 requests per minute)
async function checkRateLimit(action: string): Promise<void> {
  const ip = await getClientIdentifier();
  const result = await rateLimit(`ai:${action}:${ip}`, 5, 60);
  
  if (!result.success) {
    throw new Error("Too many requests. Please wait a moment before trying again.");
  }
}

// Schema for trip itinerary
const tripActivitySchema = z.object({
  time: z.string().describe("Time of day like 09:00, 12:00, etc"),
  activity: z.string().describe("Description of the activity"),
  cost: z.string().describe("Estimated cost like $25 or Free"),
  type: z
    .enum(["transport", "food", "activity", "accommodation", "culture"])
    .describe("Type of activity"),
});

const tripDaySchema = z.object({
  day: z.number().describe("Day number starting from 1"),
  title: z.string().describe("Title for this day like 'Arrival in Lagos'"),
  location: z.string().describe("Main location for this day"),
  activities: z
    .array(tripActivitySchema)
    .describe("List of 4-6 activities for the day"),
  accommodation: z
    .string()
    .describe("Type of accommodation for this night"),
  meals: z
    .array(z.string())
    .describe("List of meal recommendations"),
});

export const tripPlanSchema = z.object({
  title: z
    .string()
    .describe("Catchy title for the trip like '7-Day Safari Adventure in Kenya'"),
  summary: z
    .string()
    .describe("2-3 sentence overview of the trip experience"),
  duration: z.string().describe("Duration like '7 days'"),
  totalBudget: z
    .string()
    .describe("Estimated total budget like '$1,200'"),
  days: z
    .array(tripDaySchema)
    .describe("Detailed day-by-day itinerary"),
  tips: z
    .array(z.string())
    .describe("5-7 practical travel tips for this destination"),
  packingList: z
    .array(z.string())
    .describe("7-10 essential items to pack"),
});

export type TripPlan = z.infer<typeof tripPlanSchema>;

interface TripPlanRequest {
  destination: string;
  countryName: string;
  capital: string;
  tripType: "tourism" | "relocation" | "business" | "diaspora";
  duration: number;
  budget: "budget" | "moderate" | "luxury";
  travelers: number;
  interests: string;
}

export async function generateTripPlan(request: TripPlanRequest): Promise<TripPlan> {
  await checkRateLimit("trip-plan");
  
  const budgetRanges = {
    budget: "$50-100 per day",
    moderate: "$100-250 per day",
    luxury: "$250+ per day",
  };

  const tripTypeDescriptions = {
    tourism: "tourism and safari experience focusing on wildlife, beaches, and cultural attractions",
    relocation: "relocation scouting trip to explore neighborhoods, cost of living, and expat communities",
    business: "business trip with efficient scheduling for meetings, networking events, and professional venues",
    diaspora: "heritage and roots journey to reconnect with African culture, history, and ancestry",
  };

  const prompt = `Create a detailed ${request.duration}-day trip itinerary for ${request.countryName} (capital: ${request.capital}).

Trip Details:
- Type: ${tripTypeDescriptions[request.tripType]}
- Budget: ${budgetRanges[request.budget]}
- Number of travelers: ${request.travelers}
- Special interests: ${request.interests || "General exploration"}

Requirements:
1. Create a realistic day-by-day itinerary with actual locations and activities in ${request.countryName}
2. Include local restaurants, cultural sites, and authentic experiences
3. Adjust activities based on the budget level
4. For ${request.tripType} trips, emphasize relevant activities
5. Include practical tips specific to ${request.countryName}
6. Suggest appropriate packing items for the climate and activities
7. Make the total budget realistic for a ${request.budget} traveler

Make this feel like a real, actionable trip plan that someone could follow.`;

  const { object } = await generateObject({
    model: "anthropic/claude-sonnet-4-20250514",
    schema: tripPlanSchema,
    prompt,
    maxTokens: 4000,
  });

  return object;
}

// Schema for visa information
const visaInfoSchema = z.object({
  requirement: z
    .enum(["visa_free", "visa_on_arrival", "e_visa", "visa_required"])
    .describe("Type of visa requirement"),
  stayDuration: z
    .string()
    .describe("Maximum allowed stay duration like '90 days'"),
  processingTime: z
    .string()
    .describe("Typical processing time like '3-5 business days'"),
  cost: z.string().describe("Visa cost if applicable"),
  documents: z
    .array(z.string())
    .describe("List of required documents"),
  notes: z
    .array(z.string())
    .describe("Additional important notes and tips"),
  embassyInfo: z
    .string()
    .optional()
    .describe("Embassy or consulate information if applicable"),
});

export type VisaInfo = z.infer<typeof visaInfoSchema>;

interface VisaCheckRequest {
  passportCountry: string;
  destinationCountry: string;
}

// Schema for city information
const cityInfoSchema = z.object({
  name: z.string().describe("City name"),
  country: z.string().describe("Country name"),
  countryCode: z.string().describe("ISO country code like GH, KE, ZA"),
  region: z.enum(["West Africa", "East Africa", "North Africa", "Southern Africa", "Central Africa"]).describe("African region"),
  description: z.string().describe("2-3 sentence description of the city"),
  population: z.string().describe("Approximate population like '4.5 million'"),
  safetyRating: z.number().min(1).max(5).describe("Safety rating from 1-5"),
  digitalNomadScore: z.number().min(1).max(5).describe("Digital nomad friendliness from 1-5"),
  averageCost: z.string().describe("Daily budget range like '$50-80/day'"),
  internetSpeed: z.string().describe("Average internet speed like '25 Mbps'"),
  bestTimeToVisit: z.string().describe("Best months to visit"),
  highlights: z.array(z.string()).describe("5-7 city highlights"),
  neighborhoods: z.array(z.object({
    name: z.string(),
    description: z.string(),
    vibe: z.string().describe("One word vibe like 'Upscale', 'Trendy', 'Historic'"),
    priceRange: z.string().describe("Price range like '$$$' or '$$'"),
  })).describe("4-6 popular neighborhoods"),
  attractions: z.array(z.object({
    name: z.string(),
    type: z.string().describe("Type like 'Museum', 'Market', 'Beach'"),
    description: z.string(),
    entryFee: z.string().optional().describe("Entry fee if applicable"),
  })).describe("6-8 top attractions"),
  practicalInfo: z.object({
    currency: z.string(),
    language: z.array(z.string()),
    timezone: z.string(),
    electricity: z.string().describe("Plug type and voltage"),
    water: z.string().describe("Water safety info"),
    transportation: z.array(z.string()).describe("Common transport options"),
  }),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).describe("City coordinates for map"),
});

export type CityInfo = z.infer<typeof cityInfoSchema>;

export async function getCityInfo(cityName: string, countryName?: string): Promise<CityInfo> {
  await checkRateLimit("city-info");
  
  const prompt = `Provide comprehensive travel guide information for ${cityName}${countryName ? `, ${countryName}` : ''} in Africa.

Requirements:
1. Accurate geographic and demographic information
2. Realistic safety and digital nomad ratings based on known data
3. Real neighborhoods that exist in this city
4. Actual attractions and landmarks
5. Current practical travel information
6. Accurate coordinates for map display

Make this a useful, accurate city guide for travelers and potential relocators.`;

  const { object } = await generateObject({
    model: "anthropic/claude-sonnet-4-20250514",
    schema: cityInfoSchema,
    prompt,
    maxTokens: 3000,
  });

  return object;
}

// Schema for detailed country information (CIA Factbook style)
const countryFactsSchema = z.object({
  name: z.string().describe("Official country name"),
  officialName: z.string().describe("Full official name"),
  capital: z.string().describe("Capital city"),
  region: z.enum(["West Africa", "East Africa", "North Africa", "Southern Africa", "Central Africa"]).describe("African region"),
  geography: z.object({
    area: z.string().describe("Total area in sq km"),
    coastline: z.string().describe("Coastline length or 'landlocked'"),
    climate: z.string().describe("Climate description"),
    terrain: z.string().describe("Terrain description"),
    naturalResources: z.array(z.string()).describe("Key natural resources"),
    borders: z.array(z.string()).describe("Neighboring countries"),
  }),
  demographics: z.object({
    population: z.string().describe("Population estimate with year"),
    populationGrowthRate: z.string().describe("Annual growth rate"),
    urbanization: z.string().describe("Percentage urban population"),
    majorCities: z.array(z.object({
      name: z.string(),
      population: z.string(),
    })).describe("Major cities with populations"),
    ethnicGroups: z.array(z.string()).describe("Major ethnic groups"),
    religions: z.array(z.string()).describe("Major religions with percentages"),
    languages: z.array(z.string()).describe("Official and national languages"),
    literacyRate: z.string().describe("Adult literacy rate"),
    lifeExpectancy: z.string().describe("Average life expectancy"),
  }),
  economy: z.object({
    gdp: z.string().describe("GDP in USD"),
    gdpPerCapita: z.string().describe("GDP per capita in USD"),
    gdpGrowthRate: z.string().describe("GDP growth rate"),
    inflation: z.string().describe("Inflation rate"),
    unemployment: z.string().describe("Unemployment rate"),
    currency: z.string().describe("Currency name and code"),
    mainIndustries: z.array(z.string()).describe("Major industries"),
    exports: z.array(z.string()).describe("Major exports"),
    imports: z.array(z.string()).describe("Major imports"),
    tradingPartners: z.array(z.string()).describe("Major trading partners"),
  }),
  government: z.object({
    type: z.string().describe("Government type"),
    headOfState: z.string().describe("Current head of state"),
    independence: z.string().describe("Independence date and from whom"),
    constitution: z.string().describe("Constitution information"),
    legalSystem: z.string().describe("Legal system type"),
  }),
  infrastructure: z.object({
    airports: z.string().describe("Number of airports"),
    roadways: z.string().describe("Total roadway length"),
    railways: z.string().describe("Total railway length or 'none'"),
    ports: z.array(z.string()).describe("Major ports"),
    internetUsers: z.string().describe("Internet penetration percentage"),
    mobileSubscriptions: z.string().describe("Mobile subscriptions per 100 people"),
  }),
  travel: z.object({
    visaPolicy: z.string().describe("General visa policy summary"),
    bestTimeToVisit: z.string().describe("Best months to visit"),
    majorAttractions: z.array(z.string()).describe("Top tourist attractions"),
    safetyNotes: z.string().describe("Safety and travel advisory summary"),
    healthConsiderations: z.array(z.string()).describe("Health considerations and vaccinations"),
  }),
  funFacts: z.array(z.string()).describe("3-5 interesting facts about the country"),
});

export type CountryFacts = z.infer<typeof countryFactsSchema>;

export async function getCountryFacts(countryName: string): Promise<CountryFacts> {
  await checkRateLimit("country-facts");
  
  const prompt = `Provide comprehensive factbook-style information about ${countryName} in Africa.

Include accurate data similar to what you would find in the CIA World Factbook:
1. Official name and capital
2. Geography - area, climate, terrain, natural resources, borders
3. Demographics - population, growth rate, major cities, ethnic groups, religions, languages, literacy, life expectancy
4. Economy - GDP, per capita, growth, inflation, currency, industries, exports, imports
5. Government - type, leadership, independence history, legal system
6. Infrastructure - airports, roads, railways, ports, internet/mobile penetration
7. Travel - visa policy overview, best time to visit, attractions, safety, health
8. 3-5 interesting fun facts

Use the most recent available data (cite years where appropriate). Be accurate and comprehensive.`;

  const { object } = await generateObject({
    model: "anthropic/claude-sonnet-4-20250514",
    schema: countryFactsSchema,
    prompt,
    maxTokens: 4000,
  });

  return object;
}

// Schema for moving abroad checklist
const checklistItemSchema = z.object({
  task: z.string().describe("The task to complete"),
  description: z.string().describe("Brief description of what this involves"),
  timeline: z.string().describe("When to complete this (e.g., '3 months before', '1 week before')"),
  priority: z.enum(["critical", "important", "recommended"]).describe("Priority level"),
  category: z.string().describe("Category like 'Documents', 'Finance', 'Health', 'Housing'"),
  tips: z.array(z.string()).optional().describe("Helpful tips for this task"),
  estimatedCost: z.string().optional().describe("Estimated cost if applicable"),
  links: z.array(z.string()).optional().describe("Useful resource descriptions"),
});

const checklistSchema = z.object({
  clientType: z.enum(["traveler", "relocating-expat", "digital-nomad"]).describe("Type of client"),
  destination: z.string().describe("Destination country"),
  duration: z.string().describe("Trip/stay duration"),
  summary: z.string().describe("Brief summary of the move/trip"),
  phases: z.array(z.object({
    name: z.string().describe("Phase name like 'Pre-Departure', 'First Week', 'First Month'"),
    timeframe: z.string().describe("Timeframe for this phase"),
    items: z.array(checklistItemSchema),
  })).describe("Checklist organized by phases"),
  budgetEstimate: z.object({
    low: z.string().describe("Low-end budget estimate"),
    mid: z.string().describe("Mid-range budget estimate"),
    high: z.string().describe("High-end budget estimate"),
    breakdown: z.array(z.object({
      category: z.string(),
      amount: z.string(),
    })).describe("Budget breakdown by category"),
  }),
  importantContacts: z.array(z.object({
    type: z.string().describe("Type like 'Embassy', 'Emergency', 'Healthcare'"),
    name: z.string(),
    contact: z.string(),
  })).describe("Important contacts for the destination"),
  localTips: z.array(z.string()).describe("Local tips and cultural considerations"),
});

export type ChecklistItem = z.infer<typeof checklistItemSchema>;
export type MovingChecklist = z.infer<typeof checklistSchema>;

export type ClientType = "traveler" | "relocating-expat" | "digital-nomad";

interface ChecklistRequest {
  clientType: ClientType;
  destination: string;
  originCountry: string;
  duration: string;
  budget?: string;
  specificNeeds?: string;
}

export async function generateMovingChecklist(request: ChecklistRequest): Promise<MovingChecklist> {
  await checkRateLimit("moving-checklist");
  
  const clientDescriptions = {
    "traveler": "a tourist/traveler planning a vacation or extended trip",
    "relocating-expat": "someone permanently relocating or moving abroad for work/retirement",
    "digital-nomad": "a digital nomad planning to work remotely while living abroad",
  };

  const prompt = `Create a comprehensive moving/travel checklist for ${clientDescriptions[request.clientType]} going to ${request.destination} from ${request.originCountry}.

Details:
- Client type: ${request.clientType}
- Duration: ${request.duration}
- Budget level: ${request.budget || "moderate"}
${request.specificNeeds ? `- Specific needs: ${request.specificNeeds}` : ""}

Create a detailed, actionable checklist organized by phases (pre-departure, arrival, settling in) with:
1. Specific tasks with clear descriptions
2. Realistic timelines for each task
3. Priority levels (critical items that could prevent travel vs nice-to-haves)
4. Categories (Documents, Finance, Health, Housing, Work/Legal, Lifestyle)
5. Helpful tips and estimated costs where applicable
6. Budget estimates (low/mid/high) with breakdown
7. Important local contacts (embassy, emergency services, healthcare)
8. Cultural tips and local insights

Tailor the checklist specifically for ${request.destination} and the ${request.clientType} profile. Be practical and comprehensive.`;

  const { object } = await generateObject({
    model: "anthropic/claude-sonnet-4-20250514",
    schema: checklistSchema,
    prompt,
    maxTokens: 4000,
  });

  return object;
}

export async function checkVisaRequirements(request: VisaCheckRequest): Promise<VisaInfo> {
  await checkRateLimit("visa-check");
  
  const prompt = `Provide accurate visa requirements for a ${request.passportCountry} passport holder traveling to ${request.destinationCountry}.

Include:
1. The visa requirement type (visa-free, visa on arrival, e-visa, or visa required)
2. Maximum allowed stay duration
3. Processing time if visa is required
4. Cost of visa if applicable
5. List of required documents
6. Important notes about entry requirements, health requirements, or travel advisories
7. Embassy information if a visa application is needed

Be accurate and specific to this passport-destination combination. If you're not certain about specific details, indicate that the traveler should verify with the embassy.`;

  const { object } = await generateObject({
    model: "anthropic/claude-sonnet-4-20250514",
    schema: visaInfoSchema,
    prompt,
    maxTokens: 1500,
  });

  return object;
}

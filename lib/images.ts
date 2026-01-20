/**
 * Centralized Image Configuration
 * 
 * Replace these paths with your own curated images from:
 * - Iwaria.com (African-focused stock)
 * - Nappy.co (Black/African people)
 * - Unsplash.com (search "Africa", "African culture")
 * - Pexels.com (diverse travel photos)
 * 
 * Image Guidelines:
 * - Hero images: 1920x1080 or larger (16:9 ratio)
 * - Card images: 800x600 (4:3 ratio)
 * - Thumbnails: 400x300
 * - All images should be optimized for web (< 500KB)
 */

export const siteImages = {
  // Hero Section Images
  hero: {
    main: "/images/hero-travelers.jpg",
    travelers: "/images/hero-travelers.jpg",
    city: "/images/african-city.jpg",
    safari: "/images/safari-wildlife.jpg",
  },

  // Destination/City Images
  destinations: {
    lagos: "/images/african-city.jpg",
    nairobi: "/images/african-city.jpg",
    capetown: "/images/zanzibar-beach.jpg",
    accra: "/images/african-culture.jpg",
    marrakech: "/images/african-culture.jpg",
    zanzibar: "/images/zanzibar-beach.jpg",
    cairo: "/images/african-city.jpg",
    victoria: "/images/african-adventure.jpg",
  },

  // Feature Section Images
  features: {
    tripPlanning: "/images/african-family.jpg",
    visaChecker: "/images/african-business.jpg",
    cityGuides: "/images/african-city.jpg",
    localInsights: "/images/african-culture.jpg",
    safetyTips: "/images/african-adventure.jpg",
    community: "/images/hero-travelers.jpg",
  },

  // Category Images
  categories: {
    wildlife: "/images/safari-wildlife.jpg",
    beaches: "/images/zanzibar-beach.jpg",
    culture: "/images/african-culture.jpg",
    cities: "/images/african-city.jpg",
    adventure: "/images/african-adventure.jpg",
    food: "/images/african-cuisine.jpg",
    business: "/images/african-business.jpg",
    family: "/images/african-family.jpg",
  },

  // About/Company Images
  about: {
    team: "/images/african-business.jpg",
    mission: "/images/hero-travelers.jpg",
    community: "/images/african-culture.jpg",
  },

  // Blog/Content Images
  blog: {
    travel: "/images/african-adventure.jpg",
    culture: "/images/african-culture.jpg",
    food: "/images/african-cuisine.jpg",
    business: "/images/african-business.jpg",
  },

  // Placeholder for missing images
  placeholder: "/images/african-culture.jpg",
};

// City-specific image mapping
export const cityImages: Record<string, string> = {
  lagos: siteImages.destinations.lagos,
  nairobi: siteImages.destinations.nairobi,
  capetown: siteImages.destinations.capetown,
  accra: siteImages.destinations.accra,
  marrakech: siteImages.destinations.marrakech,
  zanzibar: siteImages.destinations.zanzibar,
  cairo: siteImages.destinations.cairo,
  // Add more cities as needed - default to placeholder
};

export function getCityImage(cityId: string): string {
  return cityImages[cityId.toLowerCase()] || siteImages.placeholder;
}

export function getCategoryImage(category: string): string {
  const key = category.toLowerCase() as keyof typeof siteImages.categories;
  return siteImages.categories[key] || siteImages.placeholder;
}

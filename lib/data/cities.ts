export interface CostOfLiving {
  index: number;
  rentOneBedroomCenter: number;
  rentOneBedroomOutside: number;
  utilities: number;
  mealInexpensive: number;
  mealMidRange: number;
}

export interface City {
  id: string;
  name: string;
  countryCode: string;
  country: string;
  region: string;
  population: string;
  description: string;
  highlights: string[];
  bestTimeToVisit: string;
  averageCost: string;
  safetyRating: number;
  internetSpeed: string;
  digitalNomadScore: number;
  neighborhoods: Neighborhood[];
  attractions: Attraction[];
  practicalInfo: PracticalInfo;
  costOfLiving: CostOfLiving;
  image?: string;
}

export interface Neighborhood {
  name: string;
  description: string;
  vibe: string;
  priceRange: string;
}

export interface Attraction {
  name: string;
  type: string;
  description: string;
  entryFee?: string;
}

export interface PracticalInfo {
  currency: string;
  language: string[];
  timezone: string;
  electricity: string;
  water: string;
  transportation: string[];
}

export const cities: City[] = [
  {
    id: "accra",
    name: "Accra",
    countryCode: "GH",
    country: "Ghana",
    region: "West Africa",
    population: "2.5 million",
    description: "Ghana's vibrant capital is a hub of African culture, history, and modern development. Known for its welcoming atmosphere and as a key destination for the African diaspora reconnecting with their roots.",
    highlights: [
      "Year of Return destination",
      "Vibrant arts and music scene",
      "Historic slave castles nearby",
      "Growing tech hub",
      "Excellent food scene"
    ],
    bestTimeToVisit: "November - March (dry season)",
    averageCost: "$50-80/day",
    safetyRating: 4.2,
    internetSpeed: "25 Mbps average",
    digitalNomadScore: 4.0,
    neighborhoods: [
      {
        name: "Osu",
        description: "The Oxford Street of Accra - bustling with restaurants, bars, and shops",
        vibe: "Lively & Commercial",
        priceRange: "$$-$$$"
      },
      {
        name: "Labone",
        description: "Upscale residential area with trendy cafes and expat community",
        vibe: "Upscale & Quiet",
        priceRange: "$$$"
      },
      {
        name: "East Legon",
        description: "Modern suburb with malls, international restaurants, and nightlife",
        vibe: "Modern & Hip",
        priceRange: "$$$"
      },
      {
        name: "Jamestown",
        description: "Historic fishing community with colonial architecture and local culture",
        vibe: "Authentic & Historic",
        priceRange: "$"
      }
    ],
    attractions: [
      {
        name: "Kwame Nkrumah Memorial Park",
        type: "Historical",
        description: "Memorial to Ghana's first president and pan-African hero",
        entryFee: "$5"
      },
      {
        name: "Makola Market",
        type: "Market",
        description: "Largest open-air market in Accra - overwhelming and authentic"
      },
      {
        name: "Labadi Beach",
        type: "Beach",
        description: "Popular beach with restaurants and weekend parties",
        entryFee: "$2-5"
      },
      {
        name: "National Museum of Ghana",
        type: "Museum",
        description: "Exhibits on Ghanaian history, culture, and art",
        entryFee: "$4"
      }
    ],
    practicalInfo: {
      currency: "Ghanaian Cedi (GHS)",
      language: ["English", "Twi", "Ga"],
      timezone: "GMT+0",
      electricity: "230V, Type D/G plugs",
      water: "Drink bottled water",
      transportation: ["Uber/Bolt", "Trotros (minibuses)", "Taxis"]
    },
    costOfLiving: {
      index: 32,
      rentOneBedroomCenter: 450,
      rentOneBedroomOutside: 250,
      utilities: 80,
      mealInexpensive: 5,
      mealMidRange: 25
    }
  },
  {
    id: "nairobi",
    name: "Nairobi",
    countryCode: "KE",
    country: "Kenya",
    region: "East Africa",
    population: "4.4 million",
    description: "East Africa's most dynamic city combines urban sophistication with wildlife adventures. A tech hub nicknamed 'Silicon Savannah' with national parks within city limits.",
    highlights: [
      "Safari gateway city",
      "Tech & startup hub",
      "Nairobi National Park",
      "Vibrant nightlife",
      "International cuisine"
    ],
    bestTimeToVisit: "July - October, January - February",
    averageCost: "$60-100/day",
    safetyRating: 3.5,
    internetSpeed: "30 Mbps average",
    digitalNomadScore: 4.3,
    neighborhoods: [
      {
        name: "Westlands",
        description: "Upscale area with malls, restaurants, and nightlife",
        vibe: "Modern & Cosmopolitan",
        priceRange: "$$$"
      },
      {
        name: "Kilimani",
        description: "Residential area popular with expats and young professionals",
        vibe: "Trendy & Residential",
        priceRange: "$$-$$$"
      },
      {
        name: "Karen",
        description: "Leafy suburb named after Karen Blixen, near Giraffe Centre",
        vibe: "Upscale & Green",
        priceRange: "$$$$"
      },
      {
        name: "CBD",
        description: "City center with historic buildings and bustling streets",
        vibe: "Busy & Commercial",
        priceRange: "$$"
      }
    ],
    attractions: [
      {
        name: "Nairobi National Park",
        type: "Wildlife",
        description: "See lions, rhinos, and giraffes with city skyline backdrop",
        entryFee: "$43"
      },
      {
        name: "Giraffe Centre",
        type: "Wildlife",
        description: "Feed endangered Rothschild giraffes up close",
        entryFee: "$15"
      },
      {
        name: "David Sheldrick Wildlife Trust",
        type: "Wildlife",
        description: "Orphaned elephant sanctuary - watch morning feeding",
        entryFee: "$15"
      },
      {
        name: "Maasai Market",
        type: "Market",
        description: "Rotating market for crafts, jewelry, and souvenirs"
      }
    ],
    practicalInfo: {
      currency: "Kenyan Shilling (KES)",
      language: ["English", "Swahili"],
      timezone: "GMT+3",
      electricity: "240V, Type G plugs",
      water: "Drink bottled water",
      transportation: ["Uber/Bolt", "Matatus", "Boda-bodas", "Taxis"]
    },
    costOfLiving: {
      index: 35,
      rentOneBedroomCenter: 500,
      rentOneBedroomOutside: 280,
      utilities: 70,
      mealInexpensive: 4,
      mealMidRange: 20
    }
  },
  {
    id: "cape-town",
    name: "Cape Town",
    countryCode: "ZA",
    country: "South Africa",
    region: "Southern Africa",
    population: "4.6 million",
    description: "One of the world's most beautiful cities, set between Table Mountain and two oceans. A melting pot of cultures with world-class wine, beaches, and outdoor adventures.",
    highlights: [
      "Table Mountain",
      "World-class wine regions",
      "Stunning beaches",
      "Diverse food scene",
      "Rich history"
    ],
    bestTimeToVisit: "October - April (summer)",
    averageCost: "$70-120/day",
    safetyRating: 3.8,
    internetSpeed: "40 Mbps average",
    digitalNomadScore: 4.5,
    neighborhoods: [
      {
        name: "Camps Bay",
        description: "Beachfront suburb with stunning views and upscale restaurants",
        vibe: "Beach & Luxury",
        priceRange: "$$$$"
      },
      {
        name: "Woodstock",
        description: "Hip, artsy neighborhood with street art and craft breweries",
        vibe: "Creative & Trendy",
        priceRange: "$$"
      },
      {
        name: "Bo-Kaap",
        description: "Historic Malay quarter with colorful houses and Cape Malay cuisine",
        vibe: "Cultural & Photogenic",
        priceRange: "$$"
      },
      {
        name: "Sea Point",
        description: "Coastal promenade with cafes, pools, and ocean views",
        vibe: "Active & Scenic",
        priceRange: "$$$"
      }
    ],
    attractions: [
      {
        name: "Table Mountain",
        type: "Nature",
        description: "Iconic flat-topped mountain with cable car or hiking trails",
        entryFee: "$15-30"
      },
      {
        name: "Robben Island",
        type: "Historical",
        description: "UNESCO site where Mandela was imprisoned",
        entryFee: "$25"
      },
      {
        name: "V&A Waterfront",
        type: "Entertainment",
        description: "Shopping, dining, and entertainment complex on the harbor"
      },
      {
        name: "Kirstenbosch Gardens",
        type: "Nature",
        description: "World-renowned botanical gardens on Table Mountain slopes",
        entryFee: "$8"
      }
    ],
    practicalInfo: {
      currency: "South African Rand (ZAR)",
      language: ["English", "Afrikaans", "Xhosa"],
      timezone: "GMT+2",
      electricity: "230V, Type M/N plugs",
      water: "Tap water safe",
      transportation: ["Uber", "MyCiTi Bus", "Metrorail", "Car rental"]
    },
    costOfLiving: {
      index: 45,
      rentOneBedroomCenter: 700,
      rentOneBedroomOutside: 450,
      utilities: 100,
      mealInexpensive: 8,
      mealMidRange: 35
    }
  },
  {
    id: "marrakech",
    name: "Marrakech",
    countryCode: "MA",
    country: "Morocco",
    region: "North Africa",
    population: "1.3 million",
    description: "The 'Red City' enchants with its ancient medina, stunning riads, and vibrant souks. A sensory overload of colors, sounds, and flavors at the crossroads of Africa and the Arab world.",
    highlights: [
      "Historic medina (UNESCO)",
      "Beautiful riads",
      "Vibrant souks",
      "Atlas Mountain gateway",
      "Incredible cuisine"
    ],
    bestTimeToVisit: "March - May, September - November",
    averageCost: "$40-70/day",
    safetyRating: 4.0,
    internetSpeed: "20 Mbps average",
    digitalNomadScore: 3.8,
    neighborhoods: [
      {
        name: "Medina",
        description: "Ancient walled city with souks, riads, and historic sites",
        vibe: "Historic & Bustling",
        priceRange: "$-$$$"
      },
      {
        name: "Gueliz",
        description: "Modern new town with European-style cafes and boutiques",
        vibe: "Modern & Relaxed",
        priceRange: "$$"
      },
      {
        name: "Kasbah",
        description: "Area around royal palace with quieter riads and gardens",
        vibe: "Tranquil & Regal",
        priceRange: "$$-$$$"
      },
      {
        name: "Mellah",
        description: "Historic Jewish quarter with unique architecture",
        vibe: "Historic & Authentic",
        priceRange: "$-$$"
      }
    ],
    attractions: [
      {
        name: "Jemaa el-Fnaa",
        type: "Plaza",
        description: "Famous central square with food stalls, performers, and snake charmers"
      },
      {
        name: "Bahia Palace",
        type: "Historical",
        description: "19th-century palace with stunning Islamic architecture",
        entryFee: "$7"
      },
      {
        name: "Majorelle Garden",
        type: "Garden",
        description: "Stunning blue garden once owned by Yves Saint Laurent",
        entryFee: "$14"
      },
      {
        name: "Souks of Marrakech",
        type: "Market",
        description: "Labyrinthine markets selling everything from spices to carpets"
      }
    ],
    practicalInfo: {
      currency: "Moroccan Dirham (MAD)",
      language: ["Arabic", "French", "Berber"],
      timezone: "GMT+1",
      electricity: "220V, Type C/E plugs",
      water: "Drink bottled water",
      transportation: ["Petit taxis", "Walking", "Horse carriages"]
    },
    costOfLiving: {
      index: 30,
      rentOneBedroomCenter: 400,
      rentOneBedroomOutside: 220,
      utilities: 60,
      mealInexpensive: 3,
      mealMidRange: 15
    }
  },
  {
    id: "lagos",
    name: "Lagos",
    countryCode: "NG",
    country: "Nigeria",
    region: "West Africa",
    population: "21 million",
    description: "Africa's largest city pulses with energy, creativity, and ambition. The entertainment capital of the continent with Afrobeats, Nollywood, and a booming tech scene.",
    highlights: [
      "Afrobeats capital",
      "Nollywood film industry",
      "Thriving tech scene",
      "Amazing nightlife",
      "Nigerian cuisine"
    ],
    bestTimeToVisit: "November - March (dry season)",
    averageCost: "$60-100/day",
    safetyRating: 3.2,
    internetSpeed: "20 Mbps average",
    digitalNomadScore: 3.5,
    neighborhoods: [
      {
        name: "Victoria Island",
        description: "Business district with upscale hotels, restaurants, and beaches",
        vibe: "Business & Upscale",
        priceRange: "$$$$"
      },
      {
        name: "Lekki",
        description: "Modern suburb with malls, restaurants, and expat community",
        vibe: "Modern & Growing",
        priceRange: "$$$"
      },
      {
        name: "Ikoyi",
        description: "Affluent residential area with tree-lined streets",
        vibe: "Quiet & Upscale",
        priceRange: "$$$$"
      },
      {
        name: "Lagos Island",
        description: "Historic center with markets and colonial architecture",
        vibe: "Historic & Busy",
        priceRange: "$$"
      }
    ],
    attractions: [
      {
        name: "Nike Art Gallery",
        type: "Art",
        description: "Five floors of Nigerian and African art"
      },
      {
        name: "Lekki Conservation Centre",
        type: "Nature",
        description: "Canopy walkway through mangrove forest",
        entryFee: "$5"
      },
      {
        name: "Terra Kulture",
        type: "Cultural",
        description: "Art gallery, theater, and Nigerian restaurant"
      },
      {
        name: "Freedom Park",
        type: "Historical",
        description: "Former colonial prison turned cultural center"
      }
    ],
    practicalInfo: {
      currency: "Nigerian Naira (NGN)",
      language: ["English", "Yoruba", "Igbo", "Hausa"],
      timezone: "GMT+1",
      electricity: "240V, Type D/G plugs",
      water: "Drink bottled water",
      transportation: ["Uber/Bolt", "Danfos", "BRT buses", "Keke napep"]
    },
    costOfLiving: {
      index: 38,
      rentOneBedroomCenter: 600,
      rentOneBedroomOutside: 350,
      utilities: 90,
      mealInexpensive: 5,
      mealMidRange: 25
    }
  },
  {
    id: "kigali",
    name: "Kigali",
    countryCode: "RW",
    country: "Rwanda",
    region: "East Africa",
    population: "1.2 million",
    description: "Africa's cleanest city is a model of urban development and reconciliation. Gateway to gorilla trekking with excellent infrastructure, safety, and a growing tech scene.",
    highlights: [
      "Cleanest city in Africa",
      "Gorilla trekking gateway",
      "Safe and walkable",
      "Growing tech hub",
      "Inspiring history"
    ],
    bestTimeToVisit: "June - September (dry season)",
    averageCost: "$50-80/day",
    safetyRating: 4.7,
    internetSpeed: "30 Mbps average",
    digitalNomadScore: 4.2,
    neighborhoods: [
      {
        name: "Kiyovu",
        description: "Central area with embassies and government buildings",
        vibe: "Central & Diplomatic",
        priceRange: "$$$"
      },
      {
        name: "Kimihurura",
        description: "Upscale neighborhood with restaurants and expat community",
        vibe: "Upscale & International",
        priceRange: "$$$"
      },
      {
        name: "Nyamirambo",
        description: "Vibrant local neighborhood with Muslim quarter and nightlife",
        vibe: "Local & Authentic",
        priceRange: "$"
      },
      {
        name: "Remera",
        description: "Modern area with malls and the national stadium",
        vibe: "Modern & Active",
        priceRange: "$$"
      }
    ],
    attractions: [
      {
        name: "Kigali Genocide Memorial",
        type: "Memorial",
        description: "Moving memorial to 1994 genocide - essential visit"
      },
      {
        name: "Inema Arts Center",
        type: "Art",
        description: "Contemporary African art gallery and cultural space"
      },
      {
        name: "Kimironko Market",
        type: "Market",
        description: "Largest local market for produce, crafts, and fabrics"
      },
      {
        name: "Nyamirambo Women's Center",
        type: "Cultural",
        description: "Walking tours led by local women"
      }
    ],
    practicalInfo: {
      currency: "Rwandan Franc (RWF)",
      language: ["Kinyarwanda", "English", "French"],
      timezone: "GMT+2",
      electricity: "230V, Type C/J plugs",
      water: "Tap water generally safe",
      transportation: ["Moto-taxis", "Buses", "Taxis", "Move (ride-share)"]
    }
  },
  {
    id: "dar-es-salaam",
    name: "Dar es Salaam",
    countryCode: "TZ",
    country: "Tanzania",
    region: "East Africa",
    population: "6.7 million",
    description: "Tanzania's largest city and economic hub offers a gateway to Zanzibar and the Serengeti. A blend of Swahili culture, Indian Ocean beaches, and bustling markets.",
    highlights: [
      "Gateway to Zanzibar",
      "Swahili culture",
      "Indian Ocean beaches",
      "Vibrant markets",
      "Safari access"
    ],
    bestTimeToVisit: "June - October (dry season)",
    averageCost: "$40-70/day",
    safetyRating: 3.8,
    internetSpeed: "15 Mbps average",
    digitalNomadScore: 3.3,
    neighborhoods: [
      {
        name: "Masaki",
        description: "Peninsula with upscale restaurants and ocean views",
        vibe: "Upscale & Scenic",
        priceRange: "$$$"
      },
      {
        name: "Oyster Bay",
        description: "Leafy residential area with embassies and cafes",
        vibe: "Quiet & Green",
        priceRange: "$$$"
      },
      {
        name: "Kariakoo",
        description: "Bustling market district with local energy",
        vibe: "Busy & Authentic",
        priceRange: "$"
      },
      {
        name: "Mikocheni",
        description: "Middle-class suburb with restaurants and shops",
        vibe: "Residential & Accessible",
        priceRange: "$$"
      }
    ],
    attractions: [
      {
        name: "National Museum",
        type: "Museum",
        description: "Exhibits on Tanzanian history and the Olduvai Gorge fossils",
        entryFee: "$6"
      },
      {
        name: "Kivukoni Fish Market",
        type: "Market",
        description: "Early morning fish auction and fresh seafood"
      },
      {
        name: "Village Museum",
        type: "Cultural",
        description: "Open-air museum with traditional Tanzanian houses",
        entryFee: "$5"
      },
      {
        name: "Coco Beach",
        type: "Beach",
        description: "Popular beach with restaurants and sunset views"
      }
    ],
    practicalInfo: {
      currency: "Tanzanian Shilling (TZS)",
      language: ["Swahili", "English"],
      timezone: "GMT+3",
      electricity: "230V, Type D/G plugs",
      water: "Drink bottled water",
      transportation: ["Bajaj (tuk-tuks)", "Dala-dalas", "Uber", "Ferries to Zanzibar"]
    }
  },
  {
    id: "addis-ababa",
    name: "Addis Ababa",
    countryCode: "ET",
    country: "Ethiopia",
    region: "East Africa",
    population: "5 million",
    description: "The diplomatic capital of Africa sits at 2,400m elevation with a unique culture untouched by colonialism. Ancient Christian heritage, distinctive cuisine, and the African Union headquarters.",
    highlights: [
      "African Union HQ",
      "Ancient culture",
      "Unique cuisine",
      "High altitude climate",
      "Historic churches"
    ],
    bestTimeToVisit: "October - June (dry season)",
    averageCost: "$35-60/day",
    safetyRating: 3.5,
    internetSpeed: "15 Mbps average",
    digitalNomadScore: 3.0,
    neighborhoods: [
      {
        name: "Bole",
        description: "Modern area near airport with restaurants and hotels",
        vibe: "Modern & Convenient",
        priceRange: "$$$"
      },
      {
        name: "Piazza",
        description: "Historic center with Italian architecture and cafes",
        vibe: "Historic & Central",
        priceRange: "$$"
      },
      {
        name: "Kazanchis",
        description: "Business district with hotels and offices",
        vibe: "Business & Central",
        priceRange: "$$$"
      },
      {
        name: "Merkato",
        description: "Africa's largest open-air market - overwhelming but authentic",
        vibe: "Chaotic & Authentic",
        priceRange: "$"
      }
    ],
    attractions: [
      {
        name: "National Museum",
        type: "Museum",
        description: "Home to Lucy, the 3.2 million year old hominid fossil",
        entryFee: "$4"
      },
      {
        name: "Holy Trinity Cathedral",
        type: "Religious",
        description: "Beautiful cathedral with Haile Selassie's tomb"
      },
      {
        name: "Merkato",
        type: "Market",
        description: "Largest open-air market in Africa"
      },
      {
        name: "Entoto Mountain",
        type: "Nature",
        description: "Eucalyptus forest with city views and historic church"
      }
    ],
    practicalInfo: {
      currency: "Ethiopian Birr (ETB)",
      language: ["Amharic", "English"],
      timezone: "GMT+3",
      electricity: "220V, Type C/E/F/L plugs",
      water: "Drink bottled water",
      transportation: ["Blue taxis", "Minibuses", "Ride (ride-share)"]
    }
  }
];

export const getCityById = (id: string): City | undefined => {
  return cities.find((city) => city.id === id);
};

export const getCitiesByCountry = (countryCode: string): City[] => {
  return cities.filter((city) => city.countryCode === countryCode);
};

export const getCitiesByRegion = (region: string): City[] => {
  return cities.filter((city) => city.region === region);
};

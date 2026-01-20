import Image from 'next/image';
import { 
  Bot, 
  MapPin, 
  FileCheck, 
  Wallet, 
  Shield, 
  Users,
  Sparkles,
  Globe
} from 'lucide-react';
import { siteImages } from '@/lib/images';

const features = [
  {
    icon: Bot,
    title: 'AI Trip Planner',
    description: 'Generate personalized multi-country itineraries with budget optimization and seasonal recommendations.',
    color: 'bg-safari-gold',
  },
  {
    icon: Globe,
    title: 'Country Intelligence',
    description: 'Deep insights into all 54 African nations including safety, cost of living, and infrastructure.',
    color: 'bg-savanna-green',
  },
  {
    icon: FileCheck,
    title: 'Visa Checker',
    description: 'Instantly check visa requirements for your nationality across every African country.',
    color: 'bg-ocean-blue',
  },
  {
    icon: Wallet,
    title: 'Cost Calculator',
    description: 'Compare living costs across cities and plan your budget with real-time data.',
    color: 'bg-sunset-orange',
  },
  {
    icon: Shield,
    title: 'Safety Insights',
    description: 'Real-time safety ratings, travel advisories, and vetted neighborhood guides.',
    color: 'bg-kente-red',
  },
  {
    icon: Users,
    title: 'Community Connect',
    description: 'Join expat communities, find local guides, and network with fellow travelers.',
    color: 'bg-clay',
  },
];

const audiences = [
  {
    title: 'African Diaspora',
    description: 'Returning home for the Year of Return, reconnecting with heritage, or exploring investment opportunities.',
    icon: Sparkles,
    color: 'safari-gold',
    image: siteImages.categories.culture,
  },
  {
    title: 'Digital Nomads & Expats',
    description: 'Seeking new destinations with great internet, affordable living, and vibrant communities.',
    icon: MapPin,
    color: 'ocean-blue',
    image: siteImages.categories.business,
  },
  {
    title: 'Tourists & Travelers',
    description: 'Planning safari adventures, beach getaways, cultural experiences, and historical tours.',
    icon: Globe,
    color: 'savanna-green',
    image: siteImages.categories.wildlife,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-safari-gold font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Everything You Need to Explore Africa
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From visa requirements to cost of living, our AI-powered platform provides comprehensive tools for your African journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-safari-gold/50 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-ivory" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Target Audiences */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="text-safari-gold font-semibold text-sm uppercase tracking-wider">Who We Serve</span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Built for Every Type of Traveler
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="relative rounded-2xl border border-border overflow-hidden group"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={audience.image || "/placeholder.svg"}
                    alt={audience.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/70 to-ebony/30" />
                </div>
                
                {/* Content */}
                <div className="relative p-8">
                  <audience.icon className={`w-10 h-10 text-${audience.color} mb-4`} />
                  <h3 className="text-xl font-semibold text-white mb-2">{audience.title}</h3>
                  <p className="text-white/80">{audience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

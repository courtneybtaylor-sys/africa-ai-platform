"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCountryFacts, type CountryFacts } from "@/app/actions/ai-actions";
import { createBrowserClient } from "@/lib/supabase/client";
import {
  Globe,
  Users,
  Banknote,
  Building2,
  Plane,
  Loader2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Factory,
  Scale,
  Wifi,
  Heart,
  Sparkles,
  Lock,
  Crown,
} from "lucide-react";

interface CountryFactbookProps {
  countryName: string;
}

export function CountryFactbook({ countryName }: CountryFactbookProps) {
  const [facts, setFacts] = useState<CountryFacts | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["geography", "demographics"])
  );
  const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      const supabase = createBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('subscription_tier')
          .eq('id', user.id)
          .single();
        
        setSubscriptionPlan(profile?.subscription_tier || 'explorer');
      } else {
        setSubscriptionPlan(null);
      }
      setIsCheckingAuth(false);
    };
    
    checkSubscription();
  }, []);

  const hasAccess = subscriptionPlan === 'voyager' || subscriptionPlan === 'pioneer';

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleLoadFacts = async () => {
    if (!hasAccess) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCountryFacts(countryName);
      setFacts(data);
    } catch (err) {
      setError("Failed to load country data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Show upgrade prompt for non-subscribers
  if (!isCheckingAuth && !hasAccess && !facts) {
    return (
      <div className="bg-gradient-to-br from-safari-gold/10 via-sunset-orange/5 to-kente-red/10 rounded-2xl p-8 border border-safari-gold/20">
        <div className="text-center max-w-xl mx-auto">
          <div className="w-16 h-16 bg-safari-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-safari-gold" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
            Unlock AI-Powered Country Factbook
          </h3>
          <p className="text-muted-foreground mb-6">
            Get comprehensive CIA World Factbook-style data including geography, demographics, 
            economy, government, infrastructure, and travel information for {countryName}.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="w-4 h-4 text-safari-gold" />
              <span>Geography</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 text-safari-gold" />
              <span>Demographics</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Banknote className="w-4 h-4 text-safari-gold" />
              <span>Economy</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-4 h-4 text-safari-gold" />
              <span>Government</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wifi className="w-4 h-4 text-safari-gold" />
              <span>Infrastructure</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Plane className="w-4 h-4 text-safari-gold" />
              <span>Travel Info</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-safari-gold hover:bg-safari-gold/90 text-ebony">
              <Link href="/pricing">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Voyager - $19/mo
              </Link>
            </Button>
            {!subscriptionPlan && (
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!facts) {
    return (
      <div className="mt-8 p-6 bg-sand-beige/20 rounded-xl border border-border">
        <div className="text-center">
          <Globe className="w-12 h-12 text-safari-gold mx-auto mb-4" />
          <h3 className="font-serif text-xl font-semibold mb-2">
            Detailed Country Factbook
          </h3>
          <p className="text-muted-foreground mb-4">
            Get comprehensive data including geography, demographics, economy,
            government, and travel information - similar to CIA World Factbook.
          </p>
          <Button
            onClick={handleLoadFacts}
            disabled={isLoading}
            className="bg-safari-gold hover:bg-safari-gold/90 text-ebony"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading Factbook Data...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Load AI-Powered Factbook
              </>
            )}
          </Button>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>
      </div>
    );
  }

  const sections = [
    {
      id: "geography",
      title: "Geography",
      icon: MapPin,
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Area</p>
            <p className="font-medium">{facts.geography.area}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Coastline</p>
            <p className="font-medium">{facts.geography.coastline}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-muted-foreground">Climate</p>
            <p className="font-medium">{facts.geography.climate}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-muted-foreground">Terrain</p>
            <p className="font-medium">{facts.geography.terrain}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Natural Resources</p>
            <p className="font-medium">
              {facts.geography.naturalResources.join(", ")}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Borders</p>
            <p className="font-medium">{facts.geography.borders.join(", ")}</p>
          </div>
        </div>
      ),
    },
    {
      id: "demographics",
      title: "Demographics",
      icon: Users,
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Population</p>
            <p className="font-medium">{facts.demographics.population}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Growth Rate</p>
            <p className="font-medium">
              {facts.demographics.populationGrowthRate}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Urbanization</p>
            <p className="font-medium">{facts.demographics.urbanization}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Life Expectancy</p>
            <p className="font-medium">{facts.demographics.lifeExpectancy}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Literacy Rate</p>
            <p className="font-medium">{facts.demographics.literacyRate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Languages</p>
            <p className="font-medium">
              {facts.demographics.languages.join(", ")}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-muted-foreground">Major Cities</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {facts.demographics.majorCities.map((city) => (
                <span
                  key={city.name}
                  className="px-2 py-1 bg-background rounded text-sm"
                >
                  {city.name} ({city.population})
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Ethnic Groups</p>
            <p className="font-medium">
              {facts.demographics.ethnicGroups.join(", ")}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Religions</p>
            <p className="font-medium">
              {facts.demographics.religions.join(", ")}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "economy",
      title: "Economy",
      icon: Banknote,
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">GDP</p>
            <p className="font-medium">{facts.economy.gdp}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">GDP Per Capita</p>
            <p className="font-medium">{facts.economy.gdpPerCapita}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">GDP Growth Rate</p>
            <p className="font-medium">{facts.economy.gdpGrowthRate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Inflation</p>
            <p className="font-medium">{facts.economy.inflation}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Unemployment</p>
            <p className="font-medium">{facts.economy.unemployment}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Currency</p>
            <p className="font-medium">{facts.economy.currency}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-muted-foreground">Main Industries</p>
            <p className="font-medium">
              {facts.economy.mainIndustries.join(", ")}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Major Exports</p>
            <p className="font-medium">{facts.economy.exports.join(", ")}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Major Imports</p>
            <p className="font-medium">{facts.economy.imports.join(", ")}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-muted-foreground">Trading Partners</p>
            <p className="font-medium">
              {facts.economy.tradingPartners.join(", ")}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "government",
      title: "Government",
      icon: Scale,
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Government Type</p>
            <p className="font-medium">{facts.government.type}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Head of State</p>
            <p className="font-medium">{facts.government.headOfState}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-muted-foreground">Independence</p>
            <p className="font-medium">{facts.government.independence}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-muted-foreground">Legal System</p>
            <p className="font-medium">{facts.government.legalSystem}</p>
          </div>
        </div>
      ),
    },
    {
      id: "infrastructure",
      title: "Infrastructure",
      icon: Wifi,
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Airports</p>
            <p className="font-medium">{facts.infrastructure.airports}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Roadways</p>
            <p className="font-medium">{facts.infrastructure.roadways}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Railways</p>
            <p className="font-medium">{facts.infrastructure.railways}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Major Ports</p>
            <p className="font-medium">
              {facts.infrastructure.ports.join(", ") || "None (landlocked)"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Internet Users</p>
            <p className="font-medium">{facts.infrastructure.internetUsers}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Mobile Subscriptions
            </p>
            <p className="font-medium">
              {facts.infrastructure.mobileSubscriptions}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "travel",
      title: "Travel Information",
      icon: Plane,
      content: (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Visa Policy</p>
            <p className="font-medium">{facts.travel.visaPolicy}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Best Time to Visit</p>
            <p className="font-medium">{facts.travel.bestTimeToVisit}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Major Attractions</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {facts.travel.majorAttractions.map((attraction) => (
                <span
                  key={attraction}
                  className="px-2 py-1 bg-safari-gold/20 text-safari-gold rounded text-sm"
                >
                  {attraction}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Safety Notes</p>
            <p className="font-medium">{facts.travel.safetyNotes}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Health Considerations
            </p>
            <ul className="list-disc list-inside text-sm">
              {facts.travel.healthConsiderations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold">
          {facts.officialName} Factbook
        </h2>
        <span className="text-sm text-muted-foreground">
          AI-powered data from multiple sources
        </span>
      </div>

      {/* Fun Facts Banner */}
      <div className="p-4 bg-safari-gold/10 rounded-lg mb-6">
        <h3 className="font-medium text-safari-gold mb-2 flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Did You Know?
        </h3>
        <ul className="space-y-1">
          {facts.funFacts.map((fact, idx) => (
            <li key={idx} className="text-sm text-foreground">
              • {fact}
            </li>
          ))}
        </ul>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-3">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 bg-background hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <section.icon className="w-5 h-5 text-safari-gold" />
                <span className="font-medium">{section.title}</span>
              </div>
              {expandedSections.has(section.id) ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            {expandedSections.has(section.id) && (
              <div className="p-4 border-t border-border bg-muted/20">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

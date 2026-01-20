"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";
import {
  Shield,
  Heart,
  Syringe,
  Stethoscope,
  AlertTriangle,
  Phone,
  Pill,
  Sun,
  Droplets,
  Bug,
  Crown,
  Sparkles,
  Loader2,
  CheckCircle2,
  Info,
  MapPin,
  Clock,
  Users,
  MessageSquare,
} from "lucide-react";

// Health topics data
const healthTopics = [
  {
    icon: Syringe,
    title: "Vaccinations",
    description: "Required and recommended vaccines vary by country",
    items: [
      "Yellow Fever (required for many countries)",
      "Hepatitis A & B",
      "Typhoid",
      "Meningitis (for certain regions)",
      "Rabies (if extended rural travel)",
      "Cholera (for some areas)",
    ],
    tip: "Consult a travel medicine specialist 6-8 weeks before departure",
  },
  {
    icon: Bug,
    title: "Malaria Prevention",
    description: "Malaria is present in many African regions",
    items: [
      "Take prophylactic medication as prescribed",
      "Use DEET-based insect repellent",
      "Sleep under treated mosquito nets",
      "Wear long sleeves at dusk/dawn",
      "Stay in air-conditioned rooms when possible",
    ],
    tip: "Malaria risk varies by region and season - check specific areas",
  },
  {
    icon: Droplets,
    title: "Water & Food Safety",
    description: "Prevent waterborne illnesses",
    items: [
      "Drink bottled or purified water only",
      "Avoid ice in drinks unless from safe source",
      "Eat thoroughly cooked foods",
      "Peel fruits yourself",
      "Avoid street food initially until adapted",
    ],
    tip: "Carry water purification tablets as backup",
  },
  {
    icon: Sun,
    title: "Sun & Heat Protection",
    description: "African sun can be intense",
    items: [
      "Use SPF 50+ sunscreen",
      "Wear wide-brimmed hats",
      "Stay hydrated (3-4 liters daily)",
      "Avoid midday sun (11am-3pm)",
      "Recognize heat exhaustion signs",
    ],
    tip: "Acclimatize gradually - take it easy the first few days",
  },
];

const safetyTips = [
  {
    icon: Shield,
    title: "Personal Security",
    tips: [
      "Research your destination's safety situation",
      "Register with your embassy",
      "Keep copies of important documents",
      "Use reputable transportation",
      "Avoid displaying expensive items",
      "Stay aware of your surroundings",
    ],
  },
  {
    icon: Phone,
    title: "Emergency Preparedness",
    tips: [
      "Save local emergency numbers",
      "Know nearest hospital location",
      "Have travel insurance with evacuation coverage",
      "Keep emergency contacts accessible",
      "Learn basic local phrases for emergencies",
    ],
  },
  {
    icon: MapPin,
    title: "Regional Awareness",
    tips: [
      "Check travel advisories regularly",
      "Understand local customs and laws",
      "Respect local dress codes",
      "Avoid restricted or conflict areas",
      "Connect with expat communities",
    ],
  },
];

const emergencyNumbers = [
  { country: "South Africa", police: "10111", ambulance: "10177", fire: "10177" },
  { country: "Kenya", police: "999", ambulance: "999", fire: "999" },
  { country: "Nigeria", police: "199", ambulance: "199", fire: "199" },
  { country: "Ghana", police: "191", ambulance: "193", fire: "192" },
  { country: "Morocco", police: "19", ambulance: "15", fire: "15" },
  { country: "Egypt", police: "122", ambulance: "123", fire: "180" },
  { country: "Tanzania", police: "112", ambulance: "114", fire: "114" },
  { country: "Rwanda", police: "112", ambulance: "912", fire: "112" },
];

export default function HealthSafetyPage() {
  const [isPioneer, setIsPioneer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [healthConcerns, setHealthConcerns] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [personalizedAdvice, setPersonalizedAdvice] = useState<string | null>(null);

  useEffect(() => {
    async function checkUserTier() {
      const supabase = createBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("subscription_tier")
          .eq("id", user.id)
          .single();
        
        setIsPioneer(profile?.subscription_tier === "pioneer");
      }
      setIsLoading(false);
    }
    
    checkUserTier();
  }, []);

  const handleGetAdvice = async () => {
    if (!selectedCountry || !healthConcerns) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch("/api/health-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: selectedCountry,
          concerns: healthConcerns,
        }),
      });
      
      const data = await response.json();
      setPersonalizedAdvice(data.advice);
    } catch (error) {
      console.error("Error getting advice:", error);
    }
    setIsGenerating(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kente-red/10 via-background to-savanna-green/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-kente-red/10 text-kente-red border-kente-red/20">
              <Heart className="w-3 h-3 mr-1" />
              Your Health Matters
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Health & Safety Guide
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay healthy and safe during your African adventure with our comprehensive guide to 
              vaccinations, disease prevention, and emergency resources.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        {/* Health Topics Grid */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-savanna-green" />
            Health Essentials
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {healthTopics.map((topic) => (
              <Card key={topic.title} className="border-border hover:border-savanna-green/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-savanna-green/10">
                      <topic.icon className="w-6 h-6 text-savanna-green" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{topic.title}</CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {topic.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-savanna-green shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-start gap-2 p-3 bg-safari-gold/10 rounded-lg">
                    <Info className="w-4 h-4 text-safari-gold shrink-0 mt-0.5" />
                    <p className="text-xs text-safari-gold">{topic.tip}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Safety Tips */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-ocean-blue" />
            Safety Guidelines
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {safetyTips.map((section) => (
              <Card key={section.title} className="border-border">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-ocean-blue/10 w-fit mb-2">
                    <section.icon className="w-6 h-6 text-ocean-blue" />
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-ocean-blue">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Numbers */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Phone className="w-6 h-6 text-kente-red" />
            Emergency Numbers
          </h2>
          <Card className="border-kente-red/20 bg-kente-red/5">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {emergencyNumbers.map((item) => (
                  <div key={item.country} className="p-4 bg-background rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-2">{item.country}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">Police: <span className="text-kente-red font-medium">{item.police}</span></p>
                      <p className="text-muted-foreground">Ambulance: <span className="text-kente-red font-medium">{item.ambulance}</span></p>
                      <p className="text-muted-foreground">Fire: <span className="text-kente-red font-medium">{item.fire}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Personalized Health Advice - Pioneer Feature */}
        <section className="mb-16">
          <Card className={`border-2 ${isPioneer ? "border-safari-gold/50 bg-gradient-to-br from-safari-gold/5 to-transparent" : "border-border"}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-safari-gold/20 to-sunset-orange/20">
                    <Sparkles className="w-6 h-6 text-safari-gold" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Personalized Health Advice
                      <Badge className="bg-safari-gold/20 text-safari-gold border-safari-gold/30">
                        <Crown className="w-3 h-3 mr-1" />
                        Pioneer
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Get AI-powered health recommendations tailored to your destination and concerns
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : !isPioneer ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Crown className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Pioneer Feature</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                    Our Pioneer plan includes access to personalized health advice and relocation consultants 
                    who can help you navigate healthcare systems and find trusted medical providers in your 
                    destination country.
                  </p>
                  <Button asChild className="bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                    <Link href="/pricing">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Pioneer
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Destination Country</Label>
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          {["South Africa", "Kenya", "Nigeria", "Ghana", "Morocco", "Egypt", "Tanzania", "Rwanda", "Ethiopia", "Senegal", "Uganda", "Botswana", "Namibia", "Mozambique", "Zambia"].map((country) => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Your Health Concerns & Questions</Label>
                    <Textarea
                      placeholder="Describe any health conditions, medications, allergies, or specific concerns you have about traveling to your destination..."
                      value={healthConcerns}
                      onChange={(e) => setHealthConcerns(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button 
                    onClick={handleGetAdvice}
                    disabled={!selectedCountry || !healthConcerns || isGenerating}
                    className="bg-safari-gold hover:bg-safari-gold/90 text-ebony"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Advice...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Get Personalized Advice
                      </>
                    )}
                  </Button>

                  {personalizedAdvice && (
                    <Card className="mt-6 border-savanna-green/30 bg-savanna-green/5">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Stethoscope className="w-5 h-5 text-savanna-green" />
                          Your Personalized Health Advice
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                          {personalizedAdvice}
                        </div>
                        <div className="mt-4 p-3 bg-background rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-safari-gold shrink-0" />
                            This advice is for informational purposes only. Always consult with a qualified 
                            healthcare professional or travel medicine specialist before making health decisions.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Consultant Booking CTA */}
                  <Card className="border-safari-gold/30 bg-gradient-to-r from-safari-gold/10 to-sunset-orange/10">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-safari-gold/20">
                          <Users className="w-6 h-6 text-safari-gold" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">Need Expert Guidance?</h3>
                          <p className="text-sm text-muted-foreground">
                            As a Pioneer member, you have access to relocation consultants who can help 
                            you navigate healthcare systems and find trusted medical providers.
                          </p>
                        </div>
                        <Button variant="outline" className="border-safari-gold/50 text-safari-gold hover:bg-safari-gold/10 bg-transparent">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contact Consultant
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Disclaimer */}
        <Card className="bg-muted/50 border-muted">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Important Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  The information provided on this page is for general informational purposes only and should not 
                  be considered medical advice. Health risks and requirements change frequently. Always consult 
                  with a qualified healthcare professional, travel medicine clinic, or your country's health 
                  authority before traveling. Check the latest travel advisories and health alerts for your 
                  specific destination.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  );
}

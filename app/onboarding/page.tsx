"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createBrowserClient } from "@/lib/supabase/client";
import { countries } from "@/lib/data/countries";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Plane,
  Home,
  Laptop,
  Briefcase,
  Heart,
  Users,
  GraduationCap,
  Palmtree,
  Globe,
  Loader2,
  Sparkles,
} from "lucide-react";

const interests = [
  { id: "tourism", label: "Tourism & Travel", icon: Plane, description: "Explore Africa as a tourist" },
  { id: "relocation", label: "Relocation", icon: Home, description: "Planning to move permanently" },
  { id: "digital-nomad", label: "Digital Nomad", icon: Laptop, description: "Work remotely from Africa" },
  { id: "business", label: "Business", icon: Briefcase, description: "Investment or entrepreneurship" },
  { id: "heritage", label: "Heritage & Roots", icon: Heart, description: "Connect with ancestry" },
  { id: "family", label: "Family Visit", icon: Users, description: "Visiting family or friends" },
  { id: "education", label: "Education", icon: GraduationCap, description: "Study or research" },
  { id: "retirement", label: "Retirement", icon: Palmtree, description: "Retire in Africa" },
];

const travelGoals = [
  { id: "first-trip", label: "Plan my first trip to Africa" },
  { id: "find-country", label: "Find the right country to relocate to" },
  { id: "visa-info", label: "Understand visa requirements" },
  { id: "cost-living", label: "Compare cost of living" },
  { id: "connect-diaspora", label: "Connect with the diaspora community" },
  { id: "start-business", label: "Start a business in Africa" },
  { id: "find-housing", label: "Find housing and neighborhoods" },
  { id: "healthcare", label: "Learn about healthcare options" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userName, setUserName] = useState("");
  
  // Form state
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [bio, setBio] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, onboarding_completed")
        .eq("id", user.id)
        .single();

      if (profile?.onboarding_completed) {
        router.push("/dashboard");
        return;
      }

      setUserName(profile?.full_name?.split(" ")[0] || "Explorer");
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleCountry = (code: string) => {
    setSelectedCountries(prev =>
      prev.includes(code) 
        ? prev.filter(c => c !== code) 
        : prev.length < 5 ? [...prev, code] : prev
    );
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleComplete = async () => {
    setIsSaving(true);
    const supabase = createBrowserClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from("profiles")
        .update({
          interests: selectedInterests,
          favorite_countries: selectedCountries,
          travel_goals: selectedGoals,
          bio: bio || null,
          onboarding_completed: true,
        })
        .eq("id", user.id);
    }

    router.push("/dashboard");
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-safari-gold" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-safari-gold/5 to-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  s < step
                    ? "bg-safari-gold text-ebony"
                    : s === step
                    ? "bg-safari-gold/20 text-safari-gold border-2 border-safari-gold"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-safari-gold transition-all duration-500"
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center space-y-8">
            <div className="w-24 h-24 bg-safari-gold/20 rounded-full flex items-center justify-center mx-auto">
              <Globe className="w-12 h-12 text-safari-gold" />
            </div>
            <div>
              <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
                Welcome to AfriTrek, {userName}!
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Let us personalize your experience. Answer a few quick questions 
                so we can help you discover the best of Africa.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 text-center border-safari-gold/20">
                <Plane className="w-8 h-8 text-safari-gold mx-auto mb-3" />
                <h3 className="font-semibold mb-1">AI Trip Planning</h3>
                <p className="text-sm text-muted-foreground">Personalized itineraries</p>
              </Card>
              <Card className="p-6 text-center border-safari-gold/20">
                <Heart className="w-8 h-8 text-kente-red mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Community</h3>
                <p className="text-sm text-muted-foreground">Connect with diaspora</p>
              </Card>
              <Card className="p-6 text-center border-safari-gold/20">
                <Sparkles className="w-8 h-8 text-ocean-blue mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Expert Insights</h3>
                <p className="text-sm text-muted-foreground">Local knowledge</p>
              </Card>
            </div>
            <Button 
              onClick={nextStep}
              size="lg"
              className="bg-safari-gold hover:bg-safari-gold/90 text-ebony mt-8"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
                What brings you to Africa?
              </h2>
              <p className="text-muted-foreground">
                Select all that apply. This helps us tailor your experience.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {interests.map((interest) => {
                const Icon = interest.icon;
                const isSelected = selectedInterests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-safari-gold bg-safari-gold/10"
                        : "border-border hover:border-safari-gold/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${isSelected ? "bg-safari-gold/20" : "bg-muted"}`}>
                        <Icon className={`w-6 h-6 ${isSelected ? "text-safari-gold" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{interest.label}</h3>
                        <p className="text-sm text-muted-foreground">{interest.description}</p>
                      </div>
                      {isSelected && (
                        <Check className="w-5 h-5 text-safari-gold ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep} className="bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextStep}
                disabled={selectedInterests.length === 0}
                className="bg-safari-gold hover:bg-safari-gold/90 text-ebony"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Countries */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
                Which countries interest you most?
              </h2>
              <p className="text-muted-foreground">
                Select up to 5 countries you would like to explore.
              </p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {countries.slice(0, 30).map((country) => {
                const isSelected = selectedCountries.includes(country.code);
                return (
                  <button
                    key={country.code}
                    onClick={() => toggleCountry(country.code)}
                    disabled={!isSelected && selectedCountries.length >= 5}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      isSelected
                        ? "border-safari-gold bg-safari-gold/10"
                        : selectedCountries.length >= 5
                        ? "border-border opacity-50 cursor-not-allowed"
                        : "border-border hover:border-safari-gold/50"
                    }`}
                  >
                    <span className="text-2xl block mb-1">{country.flagEmoji}</span>
                    <span className="text-xs font-medium truncate block">{country.name}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {selectedCountries.length}/5 selected
            </p>
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep} className="bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextStep}
                className="bg-safari-gold hover:bg-safari-gold/90 text-ebony"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Goals */}
        {step === 4 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
                What are your goals?
              </h2>
              <p className="text-muted-foreground">
                Select what you want to accomplish. We will recommend the best features for you.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {travelGoals.map((goal) => {
                const isSelected = selectedGoals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
                      isSelected
                        ? "border-safari-gold bg-safari-gold/10"
                        : "border-border hover:border-safari-gold/50"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-safari-gold bg-safari-gold" : "border-muted-foreground"
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-ebony" />}
                    </div>
                    <span className="font-medium">{goal.label}</span>
                  </button>
                );
              })}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Tell us more about yourself (optional)
              </label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share your story, what draws you to Africa, or anything else you'd like us to know..."
                className="h-24"
              />
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep} className="bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextStep}
                className="bg-safari-gold hover:bg-safari-gold/90 text-ebony"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Complete */}
        {step === 5 && (
          <div className="text-center space-y-8">
            <div className="w-24 h-24 bg-savanna-green/20 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-12 h-12 text-savanna-green" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
                You are all set!
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Based on your interests, here is what we recommend you explore first:
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {selectedInterests.includes("tourism") && (
                <Card className="p-4 text-left border-safari-gold/20">
                  <div className="flex items-center gap-3">
                    <Plane className="w-8 h-8 text-safari-gold" />
                    <div>
                      <h3 className="font-semibold">AI Trip Planner</h3>
                      <p className="text-sm text-muted-foreground">Create your perfect itinerary</p>
                    </div>
                  </div>
                </Card>
              )}
              {(selectedInterests.includes("relocation") || selectedInterests.includes("digital-nomad")) && (
                <Card className="p-4 text-left border-ocean-blue/20">
                  <div className="flex items-center gap-3">
                    <Home className="w-8 h-8 text-ocean-blue" />
                    <div>
                      <h3 className="font-semibold">Moving Checklist</h3>
                      <p className="text-sm text-muted-foreground">Step-by-step relocation guide</p>
                    </div>
                  </div>
                </Card>
              )}
              {selectedGoals.includes("visa-info") && (
                <Card className="p-4 text-left border-savanna-green/20">
                  <div className="flex items-center gap-3">
                    <Globe className="w-8 h-8 text-savanna-green" />
                    <div>
                      <h3 className="font-semibold">Visa Checker</h3>
                      <p className="text-sm text-muted-foreground">Check requirements instantly</p>
                    </div>
                  </div>
                </Card>
              )}
              {selectedGoals.includes("connect-diaspora") && (
                <Card className="p-4 text-left border-kente-red/20">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-kente-red" />
                    <div>
                      <h3 className="font-semibold">Community Forum</h3>
                      <p className="text-sm text-muted-foreground">Connect with others</p>
                    </div>
                  </div>
                </Card>
              )}
              {selectedCountries.length > 0 && (
                <Card className="p-4 text-left border-sunset-orange/20">
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8 text-sunset-orange" />
                    <div>
                      <h3 className="font-semibold">Your Countries</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedCountries.length} saved to favorites
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
            <Button 
              onClick={handleComplete}
              disabled={isSaving}
              size="lg"
              className="bg-safari-gold hover:bg-safari-gold/90 text-ebony mt-4"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

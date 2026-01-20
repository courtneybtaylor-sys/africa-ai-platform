"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SubscriptionGate } from "@/components/subscription-gate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { countries } from "@/lib/data/countries";
import { generateTripPlan, type TripPlan } from "@/app/actions/ai-actions";
import {
  Sparkles,
  Plane,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  Loader2,
  ArrowRight,
  Sun,
  Utensils,
  Camera,
  Building2,
  Backpack,
  Car,
  Landmark,
  Save,
  Check,
} from "lucide-react";
import { useSavedTrips } from "@/hooks/use-saved-trips";
import { useActivities } from "@/hooks/use-activities";

type TripType = "tourism" | "relocation" | "business" | "diaspora";
type BudgetRange = "budget" | "moderate" | "luxury";

const tripTypes: { value: TripType; label: string; description: string }[] = [
  {
    value: "tourism",
    label: "Tourism & Safari",
    description: "Wildlife, beaches, culture",
  },
  {
    value: "relocation",
    label: "Relocation Scouting",
    description: "Finding your new home",
  },
  {
    value: "business",
    label: "Business Trip",
    description: "Meetings, networking",
  },
  {
    value: "diaspora",
    label: "Roots Journey",
    description: "Reconnecting with heritage",
  },
];

const budgetRanges: {
  value: BudgetRange;
  label: string;
  description: string;
}[] = [
  { value: "budget", label: "Budget", description: "$50-100/day" },
  { value: "moderate", label: "Moderate", description: "$100-250/day" },
  { value: "luxury", label: "Luxury", description: "$250+/day" },
];

function TripPlanDisplay({
  tripPlan,
  travelers,
  destination,
  tripType,
  onSave,
  canSave,
  isSaved,
}: {
  tripPlan: TripPlan;
  travelers: string;
  destination: string;
  tripType: string;
  onSave: () => void;
  canSave: boolean;
  isSaved: boolean;
}) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "transport":
        return <Car className="w-4 h-4" />;
      case "food":
        return <Utensils className="w-4 h-4" />;
      case "culture":
        return <Landmark className="w-4 h-4" />;
      case "accommodation":
        return <Building2 className="w-4 h-4" />;
      default:
        return <Camera className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Plan Header */}
      <div className="bg-gradient-to-r from-safari-gold to-sunset-orange rounded-2xl p-6 sm:p-8 text-ebony">
        <h2 className="font-serif text-3xl font-bold">
          {tripPlan.title || "Generating your trip..."}
        </h2>
        {tripPlan.summary && (
          <p className="mt-2 text-ebony/80">{tripPlan.summary}</p>
        )}
        <div className="mt-6 flex flex-wrap gap-4">
          {tripPlan.duration && (
            <div className="flex items-center gap-2 bg-ebony/10 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{tripPlan.duration}</span>
            </div>
          )}
          {tripPlan.totalBudget && (
            <div className="flex items-center gap-2 bg-ebony/10 px-4 py-2 rounded-full">
              <DollarSign className="w-4 h-4" />
              <span className="font-medium">{tripPlan.totalBudget}</span>
            </div>
          )}
          <div className="flex items-center gap-2 bg-ebony/10 px-4 py-2 rounded-full">
            <Users className="w-4 h-4" />
            <span className="font-medium">
              {travelers} traveler{Number.parseInt(travelers) > 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="mt-6">
          {canSave ? (
            <Button
              onClick={onSave}
              disabled={isSaved}
              className={isSaved ? "bg-savanna-green text-white" : "bg-ebony/20 hover:bg-ebony/30 text-ebony"}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Trip Saved
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save This Trip
                </>
              )}
            </Button>
          ) : (
            <p className="text-sm text-ebony/70">
              Upgrade to Voyager to save your trips
            </p>
          )}
        </div>
      </div>

      {/* Day by Day */}
      {tripPlan.days && tripPlan.days.length > 0 && (
        <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Daily Itinerary
          </h3>
          <div className="space-y-6">
            {tripPlan.days.map((day) => (
              <div
                key={day.day}
                className="border-l-2 border-safari-gold pl-6 pb-6 relative"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-safari-gold flex items-center justify-center text-xs font-bold text-ebony">
                  {day.day}
                </div>
                <h4 className="font-semibold text-foreground">{day.title}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {day.location}
                </p>
                {day.activities && day.activities.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {day.activities.map((activity, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground w-20 flex-shrink-0">
                          {getActivityIcon(activity.type)}
                          <span>{activity.time}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground">{activity.activity}</p>
                          <p className="text-muted-foreground text-xs">
                            {activity.cost}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {day.accommodation && (
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {day.accommodation}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips & Packing */}
      {(tripPlan.tips || tripPlan.packingList) && (
        <div className="grid md:grid-cols-2 gap-6">
          {tripPlan.tips && tripPlan.tips.length > 0 && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-safari-gold" />
                Travel Tips
              </h3>
              <ul className="space-y-2">
                {tripPlan.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-savanna-green flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tripPlan.packingList && tripPlan.packingList.length > 0 && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Backpack className="w-5 h-5 text-safari-gold" />
                Packing List
              </h3>
              <ul className="space-y-2">
                {tripPlan.packingList.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-ocean-blue flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PlannerPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Form state
  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState<TripType>("tourism");
  const [duration, setDuration] = useState("7");
  const [budget, setBudget] = useState<BudgetRange>("moderate");
  const [travelers, setTravelers] = useState("1");
  const [interests, setInterests] = useState("");

  const { saveTrip, canSaveTrips } = useSavedTrips();
  const { saveActivity } = useActivities();

  const handleSaveTrip = async () => {
    if (!tripPlan || !canSaveTrips) return;
    const country = countries.find((c) => c.code === destination);
    const result = await saveTrip(tripPlan, country?.name || destination, Number.parseInt(travelers), tripType);
    if (result) {
      setIsSaved(true);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStep(3);

    const country = countries.find((c) => c.code === destination);
    const countryName = country?.name || destination;
    const capital = country?.capital || "the capital";

    try {
      const result = await generateTripPlan({
        destination,
        countryName,
        capital,
        tripType,
        duration: Number.parseInt(duration),
        budget,
        travelers: Number.parseInt(travelers),
        interests,
      });

      setTripPlan(result);
      setIsGenerating(false);
      
      // Save to activity history
      await saveActivity(
        "trip_plan",
        `${result.title || `${duration} days in ${countryName}`}`,
        `${tripType} trip for ${travelers} traveler${Number.parseInt(travelers) > 1 ? "s" : ""} - ${budget} budget`,
        { destination, tripType, duration, budget, travelers }
      );
    } catch (error) {
      console.error("Error generating trip:", error);
      setIsGenerating(false);
    }
  };

  const handleStartOver = () => {
    setStep(1);
    setTripPlan(null);
    setDestination("");
    setTripType("tourism");
    setDuration("7");
    setBudget("moderate");
    setTravelers("1");
    setInterests("");
    setIsSaved(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <SubscriptionGate feature="AI Trip Planner" requiredPlan="voyager">
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-safari-gold/10 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-safari-gold/20 border border-safari-gold/30 mb-6">
              <Sparkles className="w-4 h-4 text-safari-gold" />
              <span className="text-sm font-medium text-foreground">
                AI-Powered Trip Planning
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Plan Your African <span className="text-safari-gold">Adventure</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Let our AI create a personalized itinerary based on your
              preferences, budget, and travel style.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: "Destination" },
                { num: 2, label: "Preferences" },
                { num: 3, label: "Your Plan" },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step >= s.num
                        ? "bg-safari-gold text-ebony"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      step >= s.num ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                  {i < 2 && (
                    <div
                      className={`w-16 sm:w-24 h-1 mx-4 rounded ${
                        step > s.num ? "bg-safari-gold" : "bg-secondary"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Step 1: Destination */}
          {step === 1 && (
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Where do you want to go?
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="destination">Select Country</Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose your destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flagEmoji}</span>
                            <span>{country.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Trip Type</Label>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tripTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setTripType(type.value)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          tripType === type.value
                            ? "border-safari-gold bg-safari-gold/10"
                            : "border-border hover:border-safari-gold/50"
                        }`}
                      >
                        <p className="font-medium text-foreground">
                          {type.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {type.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!destination}
                  className="w-full bg-safari-gold hover:bg-safari-gold/90 text-ebony font-semibold py-6"
                >
                  Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Customize your trip
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration (days)</Label>
                    <div className="mt-2 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        max="30"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="travelers">Travelers</Label>
                    <div className="mt-2 flex items-center gap-2">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <Input
                        id="travelers"
                        type="number"
                        min="1"
                        max="20"
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Budget Range</Label>
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    {budgetRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => setBudget(range.value)}
                        className={`p-4 rounded-xl border text-center transition-all ${
                          budget === range.value
                            ? "border-safari-gold bg-safari-gold/10"
                            : "border-border hover:border-safari-gold/50"
                        }`}
                      >
                        <DollarSign
                          className={`w-5 h-5 mx-auto ${
                            budget === range.value
                              ? "text-safari-gold"
                              : "text-muted-foreground"
                          }`}
                        />
                        <p className="mt-1 font-medium text-foreground">
                          {range.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {range.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="interests">Special Interests (optional)</Label>
                  <Textarea
                    id="interests"
                    placeholder="E.g., wildlife photography, historical sites, local cuisine, tech scene..."
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 py-6 bg-transparent"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex-1 bg-safari-gold hover:bg-safari-gold/90 text-ebony font-semibold py-6"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 w-4 h-4" />
                        Generate Trip Plan
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Generated Plan */}
          {step === 3 && (
            <>
              {tripPlan ? (
<TripPlanDisplay
  tripPlan={tripPlan}
  travelers={travelers}
  destination={destination}
  tripType={tripType}
  onSave={handleSaveTrip}
  canSave={canSaveTrips}
  isSaved={isSaved}
  />
              ) : (
                <div className="bg-card rounded-2xl border border-border p-12 text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-safari-gold mx-auto" />
                  <p className="mt-4 text-lg text-foreground">
                    AI is crafting your perfect trip...
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This may take a few moments
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleStartOver}
                  className="bg-transparent"
                >
                  <Plane className="mr-2 w-4 h-4" />
                  Plan Another Trip
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
      </SubscriptionGate>
      <Footer />
    </main>
  );
}

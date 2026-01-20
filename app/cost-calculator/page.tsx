"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cities, type City } from "@/lib/data/cities";
import { createBrowserClient } from "@/lib/supabase/client";
import {
  Home,
  Utensils,
  Car,
  Wifi,
  ShoppingBag,
  Heart,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Minus,
  MapPin,
  Calculator,
  Crown,
  Lock,
} from "lucide-react";

// Free tier gets 4 cities, paid tiers get all
const FREE_CITY_LIMIT = 4;

interface CostBreakdown {
  housing: number;
  food: number;
  transportation: number;
  utilities: number;
  entertainment: number;
  healthcare: number;
  total: number;
}

const lifestyleMultipliers = {
  budget: 0.6,
  moderate: 1,
  comfortable: 1.5,
  luxury: 2.5,
};

const comparisonCities = [
  { name: "New York City", country: "USA", costIndex: 100 },
  { name: "London", country: "UK", costIndex: 95 },
  { name: "San Francisco", country: "USA", costIndex: 105 },
  { name: "Sydney", country: "Australia", costIndex: 85 },
  { name: "Toronto", country: "Canada", costIndex: 75 },
  { name: "Paris", country: "France", costIndex: 90 },
  { name: "Dubai", country: "UAE", costIndex: 80 },
  { name: "Singapore", country: "Singapore", costIndex: 85 },
];

function calculateCosts(city: City, lifestyle: keyof typeof lifestyleMultipliers): CostBreakdown {
  const multiplier = lifestyleMultipliers[lifestyle];
  const baseIndex = city.costOfLiving.index / 100;
  
  const housing = Math.round(city.costOfLiving.rentOneBedroomCenter * multiplier);
  const food = Math.round(400 * baseIndex * multiplier);
  const transportation = Math.round(100 * baseIndex * multiplier);
  const utilities = Math.round(city.costOfLiving.utilities * multiplier);
  const entertainment = Math.round(200 * baseIndex * multiplier);
  const healthcare = Math.round(150 * baseIndex * multiplier);
  
  return {
    housing,
    food,
    transportation,
    utilities,
    entertainment,
    healthcare,
    total: housing + food + transportation + utilities + entertainment + healthcare,
  };
}

function getSavingsPercentage(africanCost: number, comparisonCost: number): number {
  return Math.round(((comparisonCost - africanCost) / comparisonCost) * 100);
}

export default function CostCalculatorPage() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [lifestyle, setLifestyle] = useState<keyof typeof lifestyleMultipliers>("moderate");
  const [comparisonCity, setComparisonCity] = useState(comparisonCities[0]);
  const [income, setIncome] = useState([5000]);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        
        const tier = profile?.subscription_tier || "explorer";
        setIsPaidUser(tier === "voyager" || tier === "pioneer");
      }
      setIsLoading(false);
    }
    
    checkUserTier();
  }, []);

  // Filter cities based on user tier
  const availableCities = useMemo(() => {
    if (isPaidUser) return cities;
    return cities.slice(0, FREE_CITY_LIMIT);
  }, [isPaidUser]);

  const lockedCitiesCount = cities.length - FREE_CITY_LIMIT;

  const costs = useMemo(() => {
    if (!selectedCity) return null;
    return calculateCosts(selectedCity, lifestyle);
  }, [selectedCity, lifestyle]);

  const comparisonCost = useMemo(() => {
    if (!costs) return null;
    return Math.round(costs.total * (comparisonCity.costIndex / (selectedCity?.costOfLiving.index || 50)));
  }, [costs, comparisonCity, selectedCity]);

  const savings = useMemo(() => {
    if (!costs || !comparisonCost) return null;
    return getSavingsPercentage(costs.total, comparisonCost);
  }, [costs, comparisonCost]);

  const discretionaryIncome = useMemo(() => {
    if (!costs) return null;
    return income[0] - costs.total;
  }, [costs, income]);

  const costCategories = [
    { key: "housing", label: "Housing", icon: Home, color: "bg-primary" },
    { key: "food", label: "Food & Groceries", icon: Utensils, color: "bg-secondary" },
    { key: "transportation", label: "Transportation", icon: Car, color: "bg-accent" },
    { key: "utilities", label: "Utilities & Internet", icon: Wifi, color: "bg-ocean" },
    { key: "entertainment", label: "Entertainment", icon: ShoppingBag, color: "bg-savanna" },
    { key: "healthcare", label: "Healthcare", icon: Heart, color: "bg-kente" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-sand/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 border-primary text-primary">
                Financial Planning Tool
              </Badge>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Cost of Living Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Compare living costs across African cities and see how much you could save 
                compared to major global cities. Plan your relocation budget with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Input Panel */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-primary" />
                      Configure Your Estimate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
{/* City Selection */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Select African City</Label>
                        {!isPaidUser && !isLoading && (
                          <span className="text-xs text-muted-foreground">
                            {FREE_CITY_LIMIT} of {cities.length} cities
                          </span>
                        )}
                      </div>
                      <Select
                        value={selectedCity?.id || ""}
                        onValueChange={(value) => {
                          const city = cities.find((c) => c.id === value);
                          setSelectedCity(city || null);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a city" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCities.map((city) => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}, {city.country}
                            </SelectItem>
                          ))}
                          {!isPaidUser && lockedCitiesCount > 0 && (
                            <div className="px-2 py-3 border-t border-border">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <Lock className="w-4 h-4" />
                                <span>{lockedCitiesCount} more cities locked</span>
                              </div>
                              <Button asChild size="sm" className="w-full bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                                <Link href="/pricing">
                                  <Crown className="w-4 h-4 mr-2" />
                                  Unlock All Cities
                                </Link>
                              </Button>
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Lifestyle Selection */}
                    <div className="space-y-2">
                      <Label>Lifestyle Level</Label>
                      <Select
                        value={lifestyle}
                        onValueChange={(value) => setLifestyle(value as keyof typeof lifestyleMultipliers)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget - Basic necessities</SelectItem>
                          <SelectItem value="moderate">Moderate - Balanced comfort</SelectItem>
                          <SelectItem value="comfortable">Comfortable - Quality living</SelectItem>
                          <SelectItem value="luxury">Luxury - Premium lifestyle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Income Slider */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Monthly Income (USD)</Label>
                        <span className="text-sm font-medium text-primary">
                          ${income[0].toLocaleString()}
                        </span>
                      </div>
                      <Slider
                        value={income}
                        onValueChange={setIncome}
                        min={1000}
                        max={20000}
                        step={500}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$1,000</span>
                        <span>$20,000</span>
                      </div>
                    </div>

                    {/* Comparison City */}
                    <div className="space-y-2">
                      <Label>Compare With</Label>
                      <Select
                        value={comparisonCity.name}
                        onValueChange={(value) => {
                          const city = comparisonCities.find((c) => c.name === value);
                          if (city) setComparisonCity(city);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {comparisonCities.map((city) => (
                            <SelectItem key={city.name} value={city.name}>
                              {city.name}, {city.country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                {selectedCity && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {selectedCity.name} Quick Facts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cost Index</span>
                        <span className="font-medium">{selectedCity.costOfLiving.index}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Digital Nomad Score</span>
                        <span className="font-medium">{selectedCity.digitalNomadScore}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Internet Speed</span>
                        <span className="font-medium">{selectedCity.internetSpeed} Mbps</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Meal (Restaurant)</span>
                        <span className="font-medium">${selectedCity.costOfLiving.mealInexpensive}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Results Panel */}
              <div className="lg:col-span-2 space-y-6">
                {!selectedCity ? (
                  <Card className="h-full flex items-center justify-center min-h-[400px]">
                    <div className="text-center p-8">
                      <DollarSign className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Select a City to Begin</h3>
                      <p className="text-muted-foreground max-w-md">
                        Choose an African city from the dropdown to see detailed cost breakdowns 
                        and comparisons with global cities.
                      </p>
                    </div>
                  </Card>
                ) : costs ? (
                  <>
                    {/* Summary Cards */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <Card className="bg-primary/10 border-primary/20">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-1">Monthly Cost</p>
                            <p className="text-3xl font-bold text-primary">
                              ${costs.total.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              in {selectedCity.name}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className={discretionaryIncome && discretionaryIncome > 0 ? "bg-savanna/10 border-savanna/20" : "bg-kente/10 border-kente/20"}>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-1">Monthly Savings</p>
                            <p className={`text-3xl font-bold ${discretionaryIncome && discretionaryIncome > 0 ? "text-savanna" : "text-kente"}`}>
                              ${discretionaryIncome?.toLocaleString() || 0}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              from ${income[0].toLocaleString()} income
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-ocean/10 border-ocean/20">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-1">vs {comparisonCity.name}</p>
                            <div className="flex items-center justify-center gap-1">
                              {savings && savings > 0 ? (
                                <TrendingDown className="w-6 h-6 text-savanna" />
                              ) : savings && savings < 0 ? (
                                <TrendingUp className="w-6 h-6 text-kente" />
                              ) : (
                                <Minus className="w-6 h-6 text-muted-foreground" />
                              )}
                              <p className="text-3xl font-bold text-ocean">
                                {Math.abs(savings || 0)}%
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {savings && savings > 0 ? "cheaper" : savings && savings < 0 ? "more expensive" : "similar"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Cost Breakdown */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Monthly Cost Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {costCategories.map((category) => {
                            const cost = costs[category.key as keyof CostBreakdown] as number;
                            const percentage = Math.round((cost / costs.total) * 100);
                            const Icon = category.icon;
                            
                            return (
                              <div key={category.key} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center`}>
                                      <Icon className="w-4 h-4 text-primary-foreground" />
                                    </div>
                                    <span className="font-medium">{category.label}</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="font-semibold">${cost.toLocaleString()}</span>
                                    <span className="text-muted-foreground text-sm ml-2">({percentage}%)</span>
                                  </div>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${category.color} transition-all duration-500`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Comparison Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Cost Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{selectedCity.name}</span>
                              <span className="font-bold text-primary">${costs.total.toLocaleString()}/mo</span>
                            </div>
                            <div className="h-4 bg-primary rounded-full" style={{ width: "100%" }} />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{comparisonCity.name}</span>
                              <span className="font-bold text-muted-foreground">${comparisonCost?.toLocaleString()}/mo</span>
                            </div>
                            <div 
                              className="h-4 bg-muted-foreground/50 rounded-full" 
                              style={{ width: `${Math.min(100, (comparisonCost || 0) / costs.total * 100)}%` }} 
                            />
                          </div>

                          {savings && savings > 0 && (
                            <div className="p-4 bg-savanna/10 rounded-lg border border-savanna/20">
                              <p className="text-savanna font-medium">
                                You could save approximately <strong>${(comparisonCost! - costs.total).toLocaleString()}</strong> per month 
                                by living in {selectedCity.name} instead of {comparisonCity.name}.
                              </p>
                              <p className="text-sm text-muted-foreground mt-2">
                                That's <strong>${((comparisonCost! - costs.total) * 12).toLocaleString()}</strong> per year!
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* CTA */}
                    <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                      <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">Ready to make the move?</h3>
                            <p className="text-muted-foreground">
                              Plan your relocation to {selectedCity.name} with our AI Trip Planner.
                            </p>
                          </div>
                          <Button asChild className="bg-primary hover:bg-primary/90">
                            <a href="/planner">Start Planning</a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

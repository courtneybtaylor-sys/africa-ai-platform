"use client";

import React from "react"

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/lib/data/cities";
import { FavoriteButton } from "@/components/favorite-button";
import {
  Search,
  MapPin,
  Shield,
  Wifi,
  DollarSign,
  ArrowRight,
  Building2,
  Loader2,
  Sparkles,
} from "lucide-react";

const regions = [
  "All Regions",
  "West Africa",
  "East Africa",
  "North Africa",
  "Southern Africa",
  "Central Africa",
];

// Popular African cities that aren't in our predefined list
const suggestedCities = [
  { name: "Dakar", country: "Senegal" },
  { name: "Addis Ababa", country: "Ethiopia" },
  { name: "Casablanca", country: "Morocco" },
  { name: "Tunis", country: "Tunisia" },
  { name: "Dar es Salaam", country: "Tanzania" },
  { name: "Luanda", country: "Angola" },
  { name: "Abidjan", country: "Ivory Coast" },
  { name: "Kampala", country: "Uganda" },
  { name: "Harare", country: "Zimbabwe" },
  { name: "Algiers", country: "Algeria" },
  { name: "Lusaka", country: "Zambia" },
  { name: "Maputo", country: "Mozambique" },
];

export default function CitiesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [sortBy, setSortBy] = useState("name");
  const [isSearching, setIsSearching] = useState(false);

  const filteredCities = useMemo(() => {
    let result = [...cities];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (city) =>
          city.name.toLowerCase().includes(query) ||
          city.country.toLowerCase().includes(query)
      );
    }

    if (selectedRegion !== "All Regions") {
      result = result.filter((city) => city.region === selectedRegion);
    }

    switch (sortBy) {
      case "name":
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "safety":
        result = result.sort((a, b) => b.safetyRating - a.safetyRating);
        break;
      case "nomad":
        result = result.sort((a, b) => b.digitalNomadScore - a.digitalNomadScore);
        break;
      case "cost":
        result = result.sort((a, b) => {
          const aMin = Number.parseInt(a.averageCost.match(/\d+/)?.[0] || "0");
          const bMin = Number.parseInt(b.averageCost.match(/\d+/)?.[0] || "0");
          return aMin - bMin;
        });
        break;
    }

    return result;
  }, [searchQuery, selectedRegion, sortBy]);

  // Check if search query matches any predefined city
  const matchesPredefinedCity = useMemo(() => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return cities.some(
      (city) =>
        city.name.toLowerCase().includes(query) ||
        city.country.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearchCity = (cityName: string, countryName?: string) => {
    setIsSearching(true);
    const query = countryName ? `${cityName}, ${countryName}` : cityName;
    router.push(`/city/search?q=${encodeURIComponent(query)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && !matchesPredefinedCity) {
      handleSearchCity(searchQuery.trim());
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-sunset/10 via-background to-safari/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-sunset/10 text-sunset px-4 py-2 rounded-full mb-6">
                <Building2 className="h-4 w-4" />
                <span className="text-sm font-medium">City Guides</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Explore African Cities
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In-depth guides to cities across Africa. Search for any city and our AI will generate a comprehensive guide.
              </p>
              
              {/* AI Search Prompt */}
              <div className="bg-gradient-to-r from-safari/10 via-ocean/10 to-sunset/10 p-6 rounded-xl border border-safari/20 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-safari" />
                  <span className="font-medium text-foreground">AI-Powered City Search</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Search for any African city - even if it is not in our featured list, our AI will generate a detailed guide for you.
                </p>
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                  <Input
                    placeholder="Try: Bamako, Mombasa, Windhoek..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="submit"
                    disabled={!searchQuery.trim() || matchesPredefinedCity || isSearching}
                    className="bg-safari hover:bg-safari/90 text-safari-foreground"
                  >
                    {isSearching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Guide
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search featured cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full md:w-48 h-11">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 h-11">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="safety">Safety Rating</SelectItem>
                  <SelectItem value="nomad">Digital Nomad Score</SelectItem>
                  <SelectItem value="cost">Cost (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Suggested Cities (AI-generated) */}
        {!searchQuery && (
          <section className="py-8 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-safari" />
                  <h3 className="font-medium text-foreground">Discover More Cities with AI</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedCities.map((city) => (
                    <Button
                      key={`${city.name}-${city.country}`}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSearchCity(city.name, city.country)}
                      className="border-safari/30 text-foreground hover:bg-safari/10 hover:border-safari bg-transparent"
                    >
                      {city.name}, {city.country}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* No matches - suggest AI search */}
        {searchQuery && !matchesPredefinedCity && filteredCities.length === 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-xl mx-auto text-center">
                <Sparkles className="h-12 w-12 text-safari mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  City not in our featured list?
                </h3>
                <p className="text-muted-foreground mb-6">
                  No problem! Click below to generate an AI-powered guide for <strong>{searchQuery}</strong>.
                </p>
                <Button
                  onClick={() => handleSearchCity(searchQuery)}
                  className="bg-safari hover:bg-safari/90 text-safari-foreground"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2" />
                  )}
                  Generate Guide for {searchQuery}
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Featured Cities Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Featured Cities</h2>
              <p className="text-muted-foreground">
                Showing {filteredCities.length} {filteredCities.length === 1 ? "city" : "cities"}
              </p>
            </div>

            {filteredCities.length === 0 && matchesPredefinedCity ? (
              <div className="text-center py-16">
                <Building2 className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No cities found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : filteredCities.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCities.map((city) => (
                  <Link key={city.id} href={`/city/${city.id}`}>
                    <Card className="h-full border-border/50 hover:border-safari/50 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                      <div className="h-40 bg-gradient-to-br from-safari/20 via-sunset/10 to-ocean/20 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Building2 className="h-16 w-16 text-foreground/10" />
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                            {city.region}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-safari transition-colors">
                              {city.name}
                            </h3>
                            <p className="text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {city.country}
                            </p>
                          </div>
                          <div onClick={(e) => e.preventDefault()}>
                            <FavoriteButton 
                              type="city" 
                              itemId={city.id} 
                              itemName={`${city.name}, ${city.country}`}
                            />
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {city.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Shield className="h-4 w-4 text-savanna" />
                            <span className="text-muted-foreground">Safety:</span>
                            <span className="font-medium text-foreground">
                              {city.safetyRating}/5
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Wifi className="h-4 w-4 text-ocean" />
                            <span className="text-muted-foreground">Nomad:</span>
                            <span className="font-medium text-foreground">
                              {city.digitalNomadScore}/5
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm col-span-2">
                            <DollarSign className="h-4 w-4 text-safari" />
                            <span className="text-muted-foreground">Budget:</span>
                            <span className="font-medium text-foreground">
                              {city.averageCost}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {city.highlights.slice(0, 3).map((highlight) => (
                            <Badge
                              key={highlight}
                              variant="outline"
                              className="text-xs border-border/50"
                            >
                              {highlight}
                            </Badge>
                          ))}
                        </div>

                        <Button
                          variant="ghost"
                          className="w-full justify-between text-safari hover:text-safari hover:bg-safari/10"
                        >
                          Explore City Guide
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-safari mb-1">
                  {cities.length}+
                </div>
                <p className="text-sm text-muted-foreground">Featured Cities</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-sunset mb-1">
                  1000+
                </div>
                <p className="text-sm text-muted-foreground">AI-Searchable Cities</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-ocean mb-1">
                  54
                </div>
                <p className="text-sm text-muted-foreground">Countries Covered</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-savanna mb-1">
                  Real-time
                </div>
                <p className="text-sm text-muted-foreground">AI-Generated Guides</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

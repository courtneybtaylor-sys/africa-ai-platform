"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountryFactbook } from '@/components/country-factbook';
import { FavoriteButton } from '@/components/favorite-button';
import { WeatherWidget } from '@/components/weather-widget';
import { CountrySchema, BreadcrumbSchema } from '@/components/structured-data';
import { countries, regions, getCitiesByCountry } from '@/lib/data/countries';
import { cities } from '@/lib/data/cities';
import {
  ArrowLeft,
  Globe,
  DollarSign,
  Shield,
  Wifi,
  Users,
  Languages,
  Banknote,
  MapPin,
  Plane,
  Star,
  Building2,
  Search,
  Sparkles,
  Loader2,
  ArrowRight,
} from 'lucide-react';

interface CountryClientProps {
  code: string;
}

export function CountryClient({ code }: CountryClientProps) {
  const router = useRouter();
  const country = countries.find((c) => c.code.toLowerCase() === code.toLowerCase());
  
  if (!country) {
    notFound();
  }

  const countryCities = getCitiesByCountry(country.code);
  const region = regions.find((r) => r.name === country.region);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isSearching, setIsSearching] = useState(false);

  const filteredCities = useMemo(() => {
    let result = [...countryCities];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((city) =>
        city.name.toLowerCase().includes(query) ||
        city.description?.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case "name":
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "cost":
        result = result.sort((a, b) => (a.costOfLivingMonthly || 0) - (b.costOfLivingMonthly || 0));
        break;
      case "internet":
        result = result.sort((a, b) => (b.internetSpeedMbps || 0) - (a.internetSpeedMbps || 0));
        break;
    }

    return result;
  }, [countryCities, searchQuery, sortBy]);

  const handleSearchCity = (cityName: string) => {
    setIsSearching(true);
    router.push(`/city/search?q=${encodeURIComponent(cityName)}`);
  };

  return (
    <>
      <CountrySchema 
        name={country.name}
        description={country.description}
        capital={country.capital}
        region={country.region}
        url={`https://afritrek.com/country/${country.code.toLowerCase()}`}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://afritrek.com' },
          { name: 'Countries', url: 'https://afritrek.com/countries' },
          { name: country.name, url: `https://afritrek.com/country/${country.code.toLowerCase()}` },
        ]}
      />
      <main className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section
          className="pt-24 pb-16"
          style={{
            background: `linear-gradient(to bottom, ${region?.color}15, transparent)`,
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Back button */}
            <Link
              href="/countries"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Countries
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
              {/* Left: Main Info */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-6xl">{country.flagEmoji}</span>
                  <div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium text-ivory"
                      style={{ backgroundColor: region?.color }}
                    >
                      {country.region}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
                    {country.name}
                  </h1>
                  <FavoriteButton 
                    type="country" 
                    itemId={country.code} 
                    itemName={country.name}
                    variant="button"
                  />
                </div>

                <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                  {country.description}
                </p>

                {/* Highlights */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {country.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button
                    className="bg-safari-gold hover:bg-safari-gold/90 text-ebony font-semibold"
                    asChild
                  >
                    <Link href={`/planner?country=${country.code}`}>
                      <Plane className="w-4 h-4 mr-2" />
                      Plan a Trip
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-transparent"
                    asChild
                  >
                    <Link href={`/visa-checker?destination=${country.code}`}>
                      <Shield className="w-4 h-4 mr-2" />
                      Check Visa Requirements
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: Quick Stats */}
              <div className="w-full lg:w-80 bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-safari-gold/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-safari-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Capital</p>
                      <p className="font-medium text-foreground">{country.capital}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-savanna-green/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-savanna-green" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Population</p>
                      <p className="font-medium text-foreground">{country.population}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-ocean-blue/10 flex items-center justify-center">
                      <Languages className="w-5 h-5 text-ocean-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Languages</p>
                      <p className="font-medium text-foreground">{country.languages.join(', ')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sunset-orange/10 flex items-center justify-center">
                      <Banknote className="w-5 h-5 text-sunset-orange" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Currency</p>
                      <p className="font-medium text-foreground">{country.currency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weather Widget - Dynamic for selected country */}
        <section className="py-8 border-b border-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <WeatherWidget city={country.capital} countryCode={country.code} />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-savanna-green/10 flex items-center justify-center mb-3">
                  <Shield className="w-7 h-7 text-savanna-green" />
                </div>
                <p className="text-3xl font-bold text-foreground">{country.safetyIndex}%</p>
                <p className="text-sm text-muted-foreground">Safety Index</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-safari-gold/10 flex items-center justify-center mb-3">
                  <DollarSign className="w-7 h-7 text-safari-gold" />
                </div>
                <p className="text-3xl font-bold text-foreground">{country.costOfLivingIndex}</p>
                <p className="text-sm text-muted-foreground">Cost Index</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-ocean-blue/10 flex items-center justify-center mb-3">
                  <Wifi className="w-7 h-7 text-ocean-blue" />
                </div>
                <p className="text-3xl font-bold text-foreground">{country.internetSpeedMbps}</p>
                <p className="text-sm text-muted-foreground">Avg. Mbps</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-sunset-orange/10 flex items-center justify-center mb-3">
                  <Globe className="w-7 h-7 text-sunset-orange" />
                </div>
                <p className="text-3xl font-bold text-foreground">{countryCities.length}</p>
                <p className="text-sm text-muted-foreground">City Guides</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI-Powered Factbook */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CountryFactbook countryName={country.name} />
          </div>
        </section>

        {/* Related Countries */}
        <section className="py-16 bg-sand-beige/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-8">
              More in {country.region}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {countries
                .filter((c) => c.region === country.region && c.id !== country.id)
                .slice(0, 5)
                .map((c) => (
                  <Link
                    key={c.id}
                    href={`/country/${c.code.toLowerCase()}`}
                    className="group flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-safari-gold/50 transition-all"
                  >
                    <span className="text-2xl">{c.flagEmoji}</span>
                    <span className="font-medium text-foreground group-hover:text-safari-gold transition-colors">
                      {c.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* City Guides Section */}
        {countryCities.length > 0 && (
          <section className="py-20 bg-gradient-to-b from-background to-sand-beige/20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-safari-gold/10 text-safari-gold text-sm font-medium mb-4">
                  <Building2 className="w-4 h-4" />
                  City Guides
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Explore {country.name} Cities
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  In-depth guides to cities across {country.name}. Search for any city and our AI will generate a comprehensive guide for you.
                </p>
              </div>

              {/* AI-Powered Search */}
              <div className="max-w-3xl mx-auto mb-12">
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-safari-gold" />
                    <h3 className="font-semibold text-lg">AI-Powered City Search</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Search for any {country.name} city - even if it's not in our featured list, our AI will generate a detailed guide for you.
                  </p>
                  <div className="flex gap-3">
                    <Input
                      placeholder={`Try: Bamako, Mombasa, Windhoek...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 h-12 text-base"
                    />
                    <Button
                      onClick={() => handleSearchCity(searchQuery)}
                      disabled={!searchQuery || isSearching}
                      className="bg-safari-gold hover:bg-safari-gold/90 text-ebony h-12 px-6"
                    >
                      {isSearching ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 mr-2" />
                          Generate Guide
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search featured cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 bg-background"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 h-11 bg-background">
                    <SelectValue placeholder="Name (A-Z)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="cost">Cost (Low to High)</SelectItem>
                    <SelectItem value="internet">Internet Speed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cities Grid */}
              {filteredCities.length === 0 ? (
                <div className="text-center py-16">
                  <Building2 className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No cities found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search
                  </p>
                  {searchQuery && (
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
                      Generate AI Guide for {searchQuery}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCities.map((city) => (
                    <Link
                      key={city.id}
                      href={`/city/${city.id}`}
                      className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-safari-gold/50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-video bg-gradient-to-br from-sand-beige to-clay/30 relative">
                        {city.isCapital && (
                          <Badge className="absolute top-4 left-4 bg-safari-gold text-ebony">
                            Capital
                          </Badge>
                        )}
                        {city.isTechHub && (
                          <Badge className="absolute top-4 right-4 bg-savanna-green text-ivory">
                            Tech Hub
                          </Badge>
                        )}
                      </div>

                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-safari transition-colors">
                              {city.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{city.population} people</p>
                          </div>
                          <div className="flex items-center gap-1 text-safari-gold">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">4.5</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {city.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5" />
                            <span>${city.costOfLivingMonthly}/mo</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Wifi className="w-3.5 h-3.5" />
                            <span>{city.internetSpeedMbps} Mbps</span>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          className="w-full justify-between text-safari hover:text-safari hover:bg-safari/10 mt-3"
                        >
                          Explore City Guide
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Link>
                  ))}
                </div>
              )}

              {/* Discover More Cities with AI */}
              <div className="mt-16 pt-12 border-t border-border">
                <div className="flex items-center gap-2 justify-center mb-8">
                  <Sparkles className="w-5 h-5 text-safari-gold" />
                  <h3 className="text-xl font-semibold">Discover More Cities with AI</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "Addis Ababa, Ethiopia",
                    "Casablanca, Morocco",
                    "Tunis, Tunisia",
                    "Dar es Salaam, Tanzania",
                    "Abidjan, Ivory Coast",
                    "Kampala, Uganda",
                    "Harare, Zimbabwe",
                    "Algiers, Algeria",
                    "Lusaka, Zambia",
                    "Maputo, Mozambique"
                  ].map((cityName) => (
                    <button
                      key={cityName}
                      onClick={() => {
                        const city = cityName.split(",")[0];
                        setSearchQuery(city);
                        handleSearchCity(city);
                      }}
                      className="px-4 py-2 bg-card border border-border rounded-full hover:border-safari-gold hover:bg-safari-gold/5 transition-colors text-sm"
                    >
                      {cityName}
                      <ArrowRight className="inline-block w-3 h-3 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </>
  );
}

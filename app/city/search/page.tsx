"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCityInfo, type CityInfo } from "@/app/actions/ai-actions";
import { SubscriptionGate } from "@/components/subscription-gate";
import Loading from "./loading";
import {
  MapPin,
  Star,
  Wifi,
  Shield,
  DollarSign,
  ArrowLeft,
  Calendar,
  Users,
  Droplets,
  Plug,
  Globe,
  Clock,
  Car,
  Building2,
  Landmark,
  Map,
  Info,
  ChevronRight,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react";

function CitySearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [cityInfo, setCityInfo] = useState<CityInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      setError(null);
      
      getCityInfo(query)
        .then((data) => {
          setCityInfo(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching city info:", err);
          setError("Failed to generate city guide. Please try again.");
          setIsLoading(false);
        });
    }
  }, [query]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= Math.round(rating)
                ? "fill-safari text-safari"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getVibeColor = (vibe: string) => {
    if (vibe.includes("Upscale") || vibe.includes("Luxury")) return "bg-safari/10 text-safari border-safari/20";
    if (vibe.includes("Modern") || vibe.includes("Trendy")) return "bg-ocean/10 text-ocean border-ocean/20";
    if (vibe.includes("Historic") || vibe.includes("Authentic")) return "bg-sunset/10 text-sunset border-sunset/20";
    if (vibe.includes("Local") || vibe.includes("Busy")) return "bg-savanna/10 text-savanna border-savanna/20";
    return "bg-muted text-muted-foreground border-border";
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-safari/20 rounded-full mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-10 w-10 text-safari animate-spin" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-safari" />
            <h2 className="text-xl font-semibold text-foreground">Generating City Guide</h2>
          </div>
          <p className="text-muted-foreground">
            Our AI is researching <strong>{query}</strong>...
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This may take a few seconds
          </p>
        </div>
      </div>
    );
  }

  if (error || !cityInfo) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-kente mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Could not generate guide
          </h2>
          <p className="text-muted-foreground mb-6">
            {error || "We couldn't find information for this city. Please make sure it's an African city and try again."}
          </p>
          <Link href="/cities">
            <Button variant="outline" className="border-safari text-safari hover:bg-safari/10 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cities
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sunset/10 via-background to-safari/5 py-12">
        <div className="container mx-auto px-4">
          {/* AI Badge */}
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-safari/10 text-safari border-safari/30">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Generated Guide
            </Badge>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/cities" className="hover:text-safari transition-colors flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              All Cities
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>{cityInfo.region}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{cityInfo.name}</span>
          </div>

          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-4 border-safari/30 text-safari">
              {cityInfo.region}
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
              {cityInfo.name}
            </h1>
            <p className="text-xl text-muted-foreground flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5" />
              {cityInfo.country}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {cityInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Shield className="h-5 w-5 text-savanna" />
              <div>
                <p className="text-xs text-muted-foreground">Safety</p>
                {renderStars(cityInfo.safetyRating)}
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Wifi className="h-5 w-5 text-ocean" />
              <div>
                <p className="text-xs text-muted-foreground">Digital Nomad</p>
                {renderStars(cityInfo.digitalNomadScore)}
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <DollarSign className="h-5 w-5 text-safari" />
              <div>
                <p className="text-xs text-muted-foreground">Daily Budget</p>
                <p className="font-semibold text-foreground">{cityInfo.averageCost}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Users className="h-5 w-5 text-sunset" />
              <div>
                <p className="text-xs text-muted-foreground">Population</p>
                <p className="font-semibold text-foreground">{cityInfo.population}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Calendar className="h-5 w-5 text-kente" />
              <div>
                <p className="text-xs text-muted-foreground">Best Time</p>
                <p className="font-semibold text-foreground text-sm">{cityInfo.bestTimeToVisit.split(" ")[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Map className="h-5 w-5 text-safari" />
              <h3 className="font-semibold text-foreground">Location</h3>
            </div>
            <div className="rounded-xl overflow-hidden border border-border/50 h-64 bg-muted">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${cityInfo.coordinates.lng - 0.1},${cityInfo.coordinates.lat - 0.1},${cityInfo.coordinates.lng + 0.1},${cityInfo.coordinates.lat + 0.1}&layer=mapnik&marker=${cityInfo.coordinates.lat},${cityInfo.coordinates.lng}`}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Coordinates: {cityInfo.coordinates.lat.toFixed(4)}, {cityInfo.coordinates.lng.toFixed(4)}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="max-w-5xl mx-auto">
            <TabsList className="w-full justify-start overflow-x-auto mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="neighborhoods">Neighborhoods</TabsTrigger>
              <TabsTrigger value="attractions">Attractions</TabsTrigger>
              <TabsTrigger value="practical">Practical Info</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Highlights */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-safari" />
                    City Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cityInfo.highlights.map((highlight) => (
                      <Badge
                        key={highlight}
                        variant="secondary"
                        className="text-sm px-3 py-1"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Best Time to Visit */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-ocean" />
                    Best Time to Visit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium text-foreground">{cityInfo.bestTimeToVisit}</p>
                </CardContent>
              </Card>

              {/* Quick Preview of Neighborhoods */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-sunset" />
                    Popular Neighborhoods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {cityInfo.neighborhoods.slice(0, 4).map((neighborhood) => (
                      <div
                        key={neighborhood.name}
                        className="p-4 bg-muted/30 rounded-lg"
                      >
                        <h4 className="font-semibold text-foreground mb-1">
                          {neighborhood.name}
                        </h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={getVibeColor(neighborhood.vibe)}>
                            {neighborhood.vibe}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {neighborhood.priceRange}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Neighborhoods Tab */}
            <TabsContent value="neighborhoods" className="space-y-6">
              <div className="grid gap-6">
                {cityInfo.neighborhoods.map((neighborhood) => (
                  <Card key={neighborhood.name} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-serif font-bold text-foreground">
                              {neighborhood.name}
                            </h3>
                            <Badge
                              variant="outline"
                              className={getVibeColor(neighborhood.vibe)}
                            >
                              {neighborhood.vibe}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">
                            {neighborhood.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="h-4 w-4 text-safari" />
                            <span className="text-muted-foreground">Price Range:</span>
                            <span className="font-medium text-foreground">
                              {neighborhood.priceRange}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Attractions Tab */}
            <TabsContent value="attractions" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {cityInfo.attractions.map((attraction) => (
                  <Card key={attraction.name} className="border-border/50">
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3 border-safari/30 text-safari">
                        {attraction.type}
                      </Badge>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {attraction.name}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {attraction.description}
                      </p>
                      {attraction.entryFee && (
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-safari" />
                          <span className="text-muted-foreground">Entry Fee:</span>
                          <span className="font-medium text-foreground">
                            {attraction.entryFee}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Practical Info Tab */}
            <TabsContent value="practical" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <DollarSign className="h-5 w-5 text-safari" />
                      Currency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground font-medium">
                      {cityInfo.practicalInfo.currency}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Globe className="h-5 w-5 text-ocean" />
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {cityInfo.practicalInfo.language.map((lang) => (
                        <Badge key={lang} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Clock className="h-5 w-5 text-sunset" />
                      Timezone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground font-medium">
                      {cityInfo.practicalInfo.timezone}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Plug className="h-5 w-5 text-savanna" />
                      Electricity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground font-medium">
                      {cityInfo.practicalInfo.electricity}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Droplets className="h-5 w-5 text-ocean" />
                      Water
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground font-medium">
                      {cityInfo.practicalInfo.water}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Car className="h-5 w-5 text-kente" />
                      Transportation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {cityInfo.practicalInfo.transportation.map((transport) => (
                        <Badge key={transport} variant="secondary">
                          {transport}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Wifi className="h-5 w-5 text-ocean" />
                      Internet Speed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground font-medium">
                      {cityInfo.internetSpeed}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Plan Your Trip to {cityInfo.name}
            </h2>
            <p className="text-muted-foreground mb-6">
              Use our AI Trip Planner to create a personalized itinerary for your visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/planner">
                <Button className="bg-safari hover:bg-safari/90 text-safari-foreground">
                  <Map className="mr-2 h-4 w-4" />
                  Plan Your Trip
                </Button>
              </Link>
              <Link href={`/country/${cityInfo.countryCode}`}>
                <Button variant="outline" className="border-safari/50 text-safari hover:bg-safari/10 bg-transparent">
                  <Info className="mr-2 h-4 w-4" />
                  Explore {cityInfo.country}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CitySearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <SubscriptionGate feature="AI City Guides" requiredPlan="voyager">
          <Suspense fallback={<Loading />}>
            <CitySearchContent />
          </Suspense>
        </SubscriptionGate>
      </main>
      <Footer />
    </div>
  );
}

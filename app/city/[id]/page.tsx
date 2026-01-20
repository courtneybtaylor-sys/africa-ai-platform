import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cities, getCitiesByCountry, type City } from "@/lib/data/countries";

// Helper function to get city by ID
const getCityById = (id: string): City | undefined => {
  return cities.find((city) => city.id === id);
};
import { WeatherWidget } from "@/components/weather-widget";
import { ActivityTracker } from "@/components/activity-tracker";
import {
  MapPin,
  Star,
  Wifi,
  Shield,
  DollarSign,
  ArrowLeft,
  Calendar,
  Users,
  Zap,
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
} from "lucide-react";

export async function generateStaticParams() {
  return cities.map((city) => ({
    id: city.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CityDetailPage({ params }: PageProps) {
  const { id } = await params;
  const city = getCityById(id);

  if (!city) {
    notFound();
  }

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Track city guide view for paid users */}
      <ActivityTracker
        type="city_guide"
        title={`${city.name}, ${city.countryCode}`}
        description={city.description.slice(0, 100)}
        metadata={{ cityId: city.id, countryCode: city.countryCode }}
      />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-sunset/10 via-background to-safari/5 py-12">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/countries" className="hover:text-safari transition-colors flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Countries
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span>{city.region}</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{city.name}</span>
            </div>

            <div className="max-w-4xl">
              <Badge variant="outline" className="mb-4 border-safari/30 text-safari">
                {city.region}
              </Badge>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
                {city.name}
              </h1>
              <p className="text-xl text-muted-foreground flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5" />
                {city.country}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {city.description}
              </p>
            </div>
          </div>
        </section>

        {/* Weather Widget */}
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <WeatherWidget city={city.name} countryCode={city.countryCode} />
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
                  {renderStars(city.safetyRating)}
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Wifi className="h-5 w-5 text-ocean" />
                <div>
                  <p className="text-xs text-muted-foreground">Digital Nomad</p>
                  {renderStars(city.digitalNomadScore)}
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <DollarSign className="h-5 w-5 text-safari" />
                <div>
                  <p className="text-xs text-muted-foreground">Daily Budget</p>
                  <p className="font-semibold text-foreground">{city.averageCost}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Users className="h-5 w-5 text-sunset" />
                <div>
                  <p className="text-xs text-muted-foreground">Population</p>
                  <p className="font-semibold text-foreground">{city.population}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Calendar className="h-5 w-5 text-kente" />
                <div>
                  <p className="text-xs text-muted-foreground">Best Time</p>
                  <p className="font-semibold text-foreground text-sm">{city.bestTimeToVisit.split(" ")[0]}</p>
                </div>
              </div>
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
                      {city.highlights.map((highlight) => (
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
                    <p className="text-lg font-medium text-foreground">{city.bestTimeToVisit}</p>
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
                      {city.neighborhoods.slice(0, 4).map((neighborhood) => (
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
                  {city.neighborhoods.map((neighborhood) => (
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
                  {city.attractions.map((attraction) => (
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
                        {city.practicalInfo.currency}
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
                        {city.practicalInfo.language.map((lang) => (
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
                        {city.practicalInfo.timezone}
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
                        {city.practicalInfo.electricity}
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
                        {city.practicalInfo.water}
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
                        {city.practicalInfo.transportation.map((transport) => (
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
                        {city.internetSpeed}
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
                Plan Your Trip to {city.name}
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
                <Link href={`/country/${city.countryCode}`}>
                  <Button variant="outline" className="border-safari/50 text-safari hover:bg-safari/10 bg-transparent">
                    <Info className="mr-2 h-4 w-4" />
                    Explore {city.country}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

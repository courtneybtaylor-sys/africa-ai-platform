"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SubscriptionGate } from "@/components/subscription-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/data/countries";
import { checkVisaRequirements, type VisaInfo } from "@/app/actions/ai-actions";
import { useActivities } from "@/hooks/use-activities";
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  Globe,
  Plane,
  Info,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";

const passportCountries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "MA", name: "Morocco", flag: "🇲🇦" },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
];

function VisaResultDisplay({
  visaInfo,
  destinationName,
  destinationCode,
  passportName,
  isLoading,
}: {
  visaInfo: Partial<VisaInfo>;
  destinationName: string;
  destinationCode: string;
  passportName: string;
  isLoading: boolean;
}) {
  const getRequirementIcon = (requirement?: string) => {
    switch (requirement) {
      case "visa_free":
        return <CheckCircle2 className="h-8 w-8 text-savanna-green" />;
      case "visa_on_arrival":
        return <Clock className="h-8 w-8 text-safari-gold" />;
      case "e_visa":
        return <Globe className="h-8 w-8 text-ocean-blue" />;
      case "visa_required":
        return <AlertTriangle className="h-8 w-8 text-kente-red" />;
      default:
        return <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />;
    }
  };

  const getRequirementBadge = (requirement?: string) => {
    switch (requirement) {
      case "visa_free":
        return (
          <Badge className="bg-savanna-green/20 text-savanna-green border-savanna-green/30 text-lg px-4 py-1">
            Visa Free
          </Badge>
        );
      case "visa_on_arrival":
        return (
          <Badge className="bg-safari-gold/20 text-safari-gold border-safari-gold/30 text-lg px-4 py-1">
            Visa on Arrival
          </Badge>
        );
      case "e_visa":
        return (
          <Badge className="bg-ocean-blue/20 text-ocean-blue border-ocean-blue/30 text-lg px-4 py-1">
            E-Visa Required
          </Badge>
        );
      case "visa_required":
        return (
          <Badge className="bg-kente-red/20 text-kente-red border-kente-red/30 text-lg px-4 py-1">
            Visa Required
          </Badge>
        );
      default:
        return (
          <Badge className="bg-muted text-muted-foreground text-lg px-4 py-1">
            Checking...
          </Badge>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Main Result Card */}
      <Card className="border-border/50 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-6 border-b border-border/50">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {getRequirementIcon(visaInfo.requirement)}
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground">
                  {destinationName}
                </h2>
                <p className="text-muted-foreground">From {passportName}</p>
              </div>
            </div>
            {getRequirementBadge(visaInfo.requirement)}
          </div>
          {isLoading && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AI is gathering visa information...</span>
            </div>
          )}
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Duration & Fee Info */}
          <div className="grid sm:grid-cols-3 gap-4">
            {visaInfo.stayDuration && (
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Stay Duration</p>
                <p className="font-semibold text-foreground">
                  {visaInfo.stayDuration}
                </p>
              </div>
            )}
            {visaInfo.processingTime && (
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Processing Time
                </p>
                <p className="font-semibold text-foreground">
                  {visaInfo.processingTime}
                </p>
              </div>
            )}
            {visaInfo.cost && (
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Estimated Fee
                </p>
                <p className="font-semibold text-foreground">{visaInfo.cost}</p>
              </div>
            )}
          </div>

          {/* Notes */}
          {visaInfo.notes && visaInfo.notes.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Info className="h-4 w-4 text-ocean-blue" />
                Important Notes
              </h3>
              <div className="p-4 bg-ocean-blue/5 rounded-lg border border-ocean-blue/20 space-y-2">
                {visaInfo.notes.map((note, index) => (
                  <p key={index} className="text-foreground flex items-start gap-2">
                    <span className="text-ocean-blue mt-1">•</span>
                    {note}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Required Documents */}
          {visaInfo.documents && visaInfo.documents.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-safari-gold" />
                Required Documents
              </h3>
              <ul className="space-y-2">
                {visaInfo.documents.map((doc, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-savanna-green shrink-0 mt-1" />
                    <span className="text-muted-foreground">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Embassy Info */}
          {visaInfo.embassyInfo && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Embassy Information</h3>
              <p className="text-muted-foreground">{visaInfo.embassyInfo}</p>
            </div>
          )}

          {/* CTA */}
          <div className="pt-4 border-t border-border/50">
            <Link href={`/country/${destinationCode}`}>
              <Button className="w-full sm:w-auto bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                Explore {destinationName}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-sunset-orange/30 bg-sunset-orange/5">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-sunset-orange shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Important Notice</p>
              <p>
                Visa requirements can change. Always verify current requirements
                with the official embassy or consulate of your destination country
                before traveling. This tool provides general guidance only.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VisaCheckerPage() {
  const [passportCountry, setPassportCountry] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
const [isChecking, setIsChecking] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [visaInfo, setVisaInfo] = useState<VisaInfo | null>(null);
  const { saveActivity } = useActivities();
  
  const handleCheck = async () => {
    if (!passportCountry || !destination) return;

    setIsChecking(true);
    setHasSearched(true);

    const passportName =
      passportCountries.find((c) => c.code === passportCountry)?.name ||
      passportCountry;
    const destCountry = countries.find((c) => c.code === destination);
    const destinationName = destCountry?.name || destination;

try {
  const result = await checkVisaRequirements({
  passportCountry: passportName,
  destinationCountry: destinationName,
  });
  
setVisaInfo(result);
    setIsChecking(false);
    
    // Save to activity history
    await saveActivity(
      "visa_check",
      `${passportName} to ${destinationName}`,
      `${result.requirement?.replace("_", " ") || "Checked"} - ${result.stayDuration || "Duration varies"}`,
      { passportCountry, destination, requirement: result.requirement }
    );
  } catch (error) {
    console.error("Error checking visa:", error);
    setIsChecking(false);
  }
  };

  const destCountry = countries.find((c) => c.code === destination);
  const passportName =
    passportCountries.find((c) => c.code === passportCountry)?.name || "";

return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubscriptionGate feature="AI Visa Checker" requiredPlan="voyager">
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-ocean-blue/10 via-background to-safari-gold/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-ocean-blue/10 text-ocean-blue px-4 py-2 rounded-full mb-6">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">
                  AI-Powered Visa Checker
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Check Your Visa Requirements
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Get AI-powered visa information for any African country. Instant
                requirements, document lists, and processing times.
              </p>
            </div>
          </div>
        </section>

        {/* Visa Checker Form */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Plane className="h-5 w-5 text-safari-gold" />
                  Enter Your Travel Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Your Passport Country
                    </label>
                    <Select
                      value={passportCountry}
                      onValueChange={setPassportCountry}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your passport" />
                      </SelectTrigger>
                      <SelectContent>
                        {passportCountries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Destination Country
                    </label>
                    <Select value={destination} onValueChange={setDestination}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select destination" />
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
                </div>

                <Button
                  onClick={handleCheck}
                  disabled={!passportCountry || !destination || isChecking}
                  className="w-full h-12 bg-safari-gold hover:bg-safari-gold/90 text-ebony font-medium"
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking Requirements...
                    </>
                  ) : (
                    "Check Visa Requirements"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Results Section */}
        {hasSearched && visaInfo && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <VisaResultDisplay
                visaInfo={visaInfo}
                destinationName={destCountry?.name || destination}
                destinationCode={destination}
                passportName={passportName}
                isLoading={isChecking}
              />
            </div>
          </section>
        )}

        {/* Loading State */}
        {hasSearched && !visaInfo && isChecking && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-12 text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-safari-gold mx-auto" />
                  <p className="mt-4 text-lg text-foreground">
                    AI is checking visa requirements...
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This may take a few moments
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* No Result State */}
        {hasSearched && !visaInfo && !isChecking && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <Card className="max-w-2xl mx-auto border-kente-red/30 bg-kente-red/5">
                <CardContent className="p-8 text-center">
                  <XCircle className="h-12 w-12 text-kente-red mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Unable to Retrieve Information
                  </h3>
                  <p className="text-muted-foreground">
                    We couldn&apos;t get visa information for this combination.
                    Please try again or contact the embassy directly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Info Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl font-bold text-foreground text-center mb-8">
                Understanding Visa Types
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-savanna-green/30 bg-savanna-green/5">
                  <CardContent className="p-4 text-center">
                    <CheckCircle2 className="h-8 w-8 text-savanna-green mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">
                      Visa Free
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      No visa needed. Just show your passport at entry.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-safari-gold/30 bg-safari-gold/5">
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 text-safari-gold mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">
                      Visa on Arrival
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Get your visa at the airport upon arrival.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-ocean-blue/30 bg-ocean-blue/5">
                  <CardContent className="p-4 text-center">
                    <Globe className="h-8 w-8 text-ocean-blue mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">E-Visa</h3>
                    <p className="text-sm text-muted-foreground">
                      Apply online before travel. Quick processing.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-kente-red/30 bg-kente-red/5">
                  <CardContent className="p-4 text-center">
                    <FileText className="h-8 w-8 text-kente-red mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">
                      Embassy Visa
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Apply at embassy or consulate before travel.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      </SubscriptionGate>
      <Footer />
    </div>
  );
}

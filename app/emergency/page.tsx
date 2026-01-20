"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { countries } from "@/lib/data/countries";
import {
  Stethoscope,
  Phone,
  AlertTriangle,
  Shield,
  Syringe,
  Pill,
  Hospital,
  Ambulance,
  MapPin,
  Search,
  ExternalLink,
  Heart,
  Droplets,
  Bug,
} from "lucide-react";

interface EmergencyInfo {
  country: string;
  code: string;
  emergencyNumber: string;
  policeNumber: string;
  ambulanceNumber: string;
  fireNumber: string;
  hospitals: { name: string; city: string; type: string }[];
  vaccinations: { name: string; required: boolean; notes: string }[];
  healthRisks: { name: string; severity: string; prevention: string }[];
  waterSafety: string;
  pharmacyInfo: string;
  insuranceNotes: string;
  embassyContact: string;
}

const emergencyData: Record<string, EmergencyInfo> = {
  GH: {
    country: "Ghana",
    code: "GH",
    emergencyNumber: "112 / 999",
    policeNumber: "191",
    ambulanceNumber: "193",
    fireNumber: "192",
    hospitals: [
      { name: "Korle Bu Teaching Hospital", city: "Accra", type: "Public" },
      { name: "37 Military Hospital", city: "Accra", type: "Military" },
      { name: "Nyaho Medical Centre", city: "Accra", type: "Private" },
      { name: "Lister Hospital", city: "Accra", type: "Private" },
    ],
    vaccinations: [
      { name: "Yellow Fever", required: true, notes: "Certificate required for entry" },
      { name: "Hepatitis A & B", required: false, notes: "Strongly recommended" },
      { name: "Typhoid", required: false, notes: "Recommended for most travelers" },
      { name: "Malaria Prophylaxis", required: false, notes: "Essential - chloroquine resistant area" },
      { name: "Meningitis", required: false, notes: "Recommended during dry season (Dec-Jun)" },
    ],
    healthRisks: [
      { name: "Malaria", severity: "High", prevention: "Use prophylaxis, mosquito nets, repellent" },
      { name: "Cholera", severity: "Moderate", prevention: "Drink bottled water, eat cooked food" },
      { name: "Typhoid", severity: "Moderate", prevention: "Vaccination, safe food/water practices" },
    ],
    waterSafety: "Do not drink tap water. Use bottled or filtered water.",
    pharmacyInfo: "Pharmacies are widely available in cities. Common medications available over the counter.",
    insuranceNotes: "Comprehensive travel insurance with medical evacuation strongly recommended.",
    embassyContact: "US Embassy: +233 30 274 1000",
  },
  KE: {
    country: "Kenya",
    code: "KE",
    emergencyNumber: "999 / 112",
    policeNumber: "999",
    ambulanceNumber: "999",
    fireNumber: "999",
    hospitals: [
      { name: "Nairobi Hospital", city: "Nairobi", type: "Private" },
      { name: "Aga Khan University Hospital", city: "Nairobi", type: "Private" },
      { name: "Kenyatta National Hospital", city: "Nairobi", type: "Public" },
      { name: "MP Shah Hospital", city: "Nairobi", type: "Private" },
    ],
    vaccinations: [
      { name: "Yellow Fever", required: true, notes: "Required if arriving from endemic country" },
      { name: "Hepatitis A & B", required: false, notes: "Strongly recommended" },
      { name: "Typhoid", required: false, notes: "Recommended for most travelers" },
      { name: "Malaria Prophylaxis", required: false, notes: "Essential for coastal and safari areas" },
      { name: "Rabies", required: false, notes: "Consider if extended travel or animal contact" },
    ],
    healthRisks: [
      { name: "Malaria", severity: "High", prevention: "Prophylaxis, nets, repellent (especially coast/safari)" },
      { name: "Altitude Sickness", severity: "Moderate", prevention: "Acclimatize if visiting high areas" },
      { name: "Waterborne Diseases", severity: "Moderate", prevention: "Bottled water, safe food practices" },
    ],
    waterSafety: "Drink bottled water in most areas. Some hotels have filtered water.",
    pharmacyInfo: "Good pharmacy network in Nairobi. International medications available.",
    insuranceNotes: "Medical evacuation insurance essential. Flying Doctors Society provides air ambulance.",
    embassyContact: "US Embassy: +254 20 363 6000",
  },
  ZA: {
    country: "South Africa",
    code: "ZA",
    emergencyNumber: "10111 (Police) / 10177 (Ambulance)",
    policeNumber: "10111",
    ambulanceNumber: "10177",
    fireNumber: "10111",
    hospitals: [
      { name: "Netcare Milpark Hospital", city: "Johannesburg", type: "Private" },
      { name: "Groote Schuur Hospital", city: "Cape Town", type: "Public" },
      { name: "Mediclinic Cape Town", city: "Cape Town", type: "Private" },
      { name: "Life Vincent Pallotti Hospital", city: "Cape Town", type: "Private" },
    ],
    vaccinations: [
      { name: "Hepatitis A & B", required: false, notes: "Recommended" },
      { name: "Typhoid", required: false, notes: "Recommended if visiting rural areas" },
      { name: "Malaria Prophylaxis", required: false, notes: "Required for Kruger/Mpumalanga regions" },
      { name: "Rabies", required: false, notes: "Consider for extended stays" },
    ],
    healthRisks: [
      { name: "Malaria", severity: "Moderate", prevention: "Prophylaxis in endemic areas (northeast)" },
      { name: "HIV/AIDS", severity: "High", prevention: "Practice safe behaviors" },
      { name: "Crime-related Injury", severity: "Moderate", prevention: "Stay aware, avoid high-risk areas" },
    ],
    waterSafety: "Tap water is generally safe in major cities.",
    pharmacyInfo: "Excellent pharmacy network. Dis-Chem and Clicks chains widely available.",
    insuranceNotes: "Good private healthcare but expensive. Insurance strongly recommended.",
    embassyContact: "US Embassy: +27 12 431 4000",
  },
  NG: {
    country: "Nigeria",
    code: "NG",
    emergencyNumber: "199 / 112",
    policeNumber: "199",
    ambulanceNumber: "199",
    fireNumber: "199",
    hospitals: [
      { name: "Lagos University Teaching Hospital", city: "Lagos", type: "Public" },
      { name: "Reddington Hospital", city: "Lagos", type: "Private" },
      { name: "Eko Hospital", city: "Lagos", type: "Private" },
      { name: "St. Nicholas Hospital", city: "Lagos", type: "Private" },
    ],
    vaccinations: [
      { name: "Yellow Fever", required: true, notes: "Certificate required for entry" },
      { name: "Hepatitis A & B", required: false, notes: "Strongly recommended" },
      { name: "Typhoid", required: false, notes: "Strongly recommended" },
      { name: "Malaria Prophylaxis", required: false, notes: "Essential throughout country" },
      { name: "Meningitis", required: false, notes: "Recommended, especially during dry season" },
      { name: "Polio", required: false, notes: "Booster recommended" },
    ],
    healthRisks: [
      { name: "Malaria", severity: "High", prevention: "Prophylaxis essential, mosquito prevention" },
      { name: "Lassa Fever", severity: "Low", prevention: "Avoid rodent contact, especially rural areas" },
      { name: "Cholera", severity: "Moderate", prevention: "Safe water and food practices" },
    ],
    waterSafety: "Never drink tap water. Use sealed bottled water only.",
    pharmacyInfo: "Pharmacies available but quality varies. Bring essential medications.",
    insuranceNotes: "Comprehensive evacuation insurance essential. Limited quality healthcare outside Lagos/Abuja.",
    embassyContact: "US Embassy: +234 9 461 4000",
  },
  RW: {
    country: "Rwanda",
    code: "RW",
    emergencyNumber: "112",
    policeNumber: "112",
    ambulanceNumber: "912",
    fireNumber: "112",
    hospitals: [
      { name: "King Faisal Hospital", city: "Kigali", type: "Private" },
      { name: "Rwanda Military Hospital", city: "Kigali", type: "Military" },
      { name: "CHUK (University Hospital)", city: "Kigali", type: "Public" },
    ],
    vaccinations: [
      { name: "Yellow Fever", required: true, notes: "Required if arriving from endemic country" },
      { name: "Hepatitis A & B", required: false, notes: "Recommended" },
      { name: "Typhoid", required: false, notes: "Recommended" },
      { name: "Malaria Prophylaxis", required: false, notes: "Kigali is low risk, but needed for other areas" },
    ],
    healthRisks: [
      { name: "Malaria", severity: "Moderate", prevention: "Prophylaxis outside Kigali" },
      { name: "Altitude Sickness", severity: "Low", prevention: "Kigali at 1,500m, acclimatize for gorilla treks" },
    ],
    waterSafety: "Tap water is generally safe in Kigali but bottled recommended for visitors.",
    pharmacyInfo: "Pharmacies available in Kigali with basic medications.",
    insuranceNotes: "Travel insurance recommended. Evacuation to Nairobi for serious conditions.",
    embassyContact: "US Embassy: +250 252 596 400",
  },
  MA: {
    country: "Morocco",
    code: "MA",
    emergencyNumber: "19 (Police) / 15 (Ambulance)",
    policeNumber: "19",
    ambulanceNumber: "15",
    fireNumber: "15",
    hospitals: [
      { name: "Clinique Internationale de Marrakech", city: "Marrakech", type: "Private" },
      { name: "CHU Ibn Rochd", city: "Casablanca", type: "Public" },
      { name: "Clinique du Parc", city: "Casablanca", type: "Private" },
    ],
    vaccinations: [
      { name: "Hepatitis A & B", required: false, notes: "Recommended" },
      { name: "Typhoid", required: false, notes: "Recommended for rural areas" },
      { name: "Rabies", required: false, notes: "Consider if extended travel" },
    ],
    healthRisks: [
      { name: "Traveler's Diarrhea", severity: "Moderate", prevention: "Safe food and water practices" },
      { name: "Heat-related Illness", severity: "Moderate", prevention: "Stay hydrated, avoid midday sun" },
    ],
    waterSafety: "Tap water is safe in major cities but bottled recommended for visitors.",
    pharmacyInfo: "Pharmacies (green cross) widely available. Many medications available without prescription.",
    insuranceNotes: "Good private healthcare available. Insurance recommended.",
    embassyContact: "US Embassy: +212 522 64 2000",
  },
};

const defaultEmergencyInfo: EmergencyInfo = {
  country: "General Africa",
  code: "",
  emergencyNumber: "Varies by country",
  policeNumber: "Varies by country",
  ambulanceNumber: "Varies by country",
  fireNumber: "Varies by country",
  hospitals: [],
  vaccinations: [
    { name: "Yellow Fever", required: false, notes: "Required for most sub-Saharan countries" },
    { name: "Hepatitis A & B", required: false, notes: "Recommended for all African travel" },
    { name: "Typhoid", required: false, notes: "Recommended for most destinations" },
    { name: "Malaria Prophylaxis", required: false, notes: "Essential in many regions" },
  ],
  healthRisks: [
    { name: "Malaria", severity: "High", prevention: "Prophylaxis, mosquito nets, repellent" },
    { name: "Waterborne Diseases", severity: "Moderate", prevention: "Drink bottled water" },
  ],
  waterSafety: "Drink bottled water in most African countries as a precaution.",
  pharmacyInfo: "Availability varies. Bring essential medications from home.",
  insuranceNotes: "Comprehensive travel and medical evacuation insurance strongly recommended for all African travel.",
  embassyContact: "Check your country's embassy list for specific contacts",
};

export default function EmergencyPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const emergencyInfo = selectedCountry
    ? emergencyData[selectedCountry] || defaultEmergencyInfo
    : defaultEmergencyInfo;

  const africaCountries = countries.filter((c) => c.region !== "");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-kente/10 via-background to-sunset/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-kente/10 text-kente px-4 py-2 rounded-full mb-6">
                <Stethoscope className="h-4 w-4" />
                <span className="text-sm font-medium">Medical & Emergency</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Health & Safety Information
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Essential medical information, emergency contacts, vaccination requirements, 
                and health risks for traveling across Africa.
              </p>
            </div>
          </div>
        </section>

        {/* Country Selector */}
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <label className="block text-sm font-medium text-foreground mb-2">
                Select a country for specific information
              </label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose your destination country" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      placeholder="Search countries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                  {africaCountries
                    .filter((c) =>
                      c.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Emergency Numbers */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Emergency Contacts {emergencyInfo.country !== "General Africa" && `- ${emergencyInfo.country}`}
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="border-kente/30 bg-kente/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-kente/20 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-kente" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Emergency</p>
                      <p className="text-xl font-bold text-foreground">{emergencyInfo.emergencyNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-ocean/30 bg-ocean/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-ocean/20 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-ocean" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Police</p>
                      <p className="text-xl font-bold text-foreground">{emergencyInfo.policeNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-sunset/30 bg-sunset/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-sunset/20 flex items-center justify-center">
                      <Ambulance className="h-5 w-5 text-sunset" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ambulance</p>
                      <p className="text-xl font-bold text-foreground">{emergencyInfo.ambulanceNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-savanna/30 bg-savanna/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-savanna/20 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-savanna" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fire</p>
                      <p className="text-xl font-bold text-foreground">{emergencyInfo.fireNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Vaccinations */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <Syringe className="h-6 w-6 text-safari" />
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Vaccination Requirements
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyInfo.vaccinations.map((vax) => (
                <Card key={vax.name} className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{vax.name}</h3>
                      <Badge variant={vax.required ? "destructive" : "secondary"}>
                        {vax.required ? "Required" : "Recommended"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{vax.notes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              * Always consult a travel medicine specialist 4-6 weeks before your trip for personalized advice.
            </p>
          </div>
        </section>

        {/* Health Risks */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <Bug className="h-6 w-6 text-kente" />
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Health Risks & Prevention
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyInfo.healthRisks.map((risk) => (
                <Card key={risk.name} className="border-border/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{risk.name}</CardTitle>
                      <Badge
                        variant={
                          risk.severity === "High"
                            ? "destructive"
                            : risk.severity === "Moderate"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {risk.severity} Risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{risk.prevention}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Practical Info Grid */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Practical Health Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Droplets className="h-5 w-5 text-ocean" />
                    <CardTitle>Water Safety</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{emergencyInfo.waterSafety}</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Pill className="h-5 w-5 text-savanna" />
                    <CardTitle>Pharmacies & Medication</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{emergencyInfo.pharmacyInfo}</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-kente" />
                    <CardTitle>Travel Insurance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{emergencyInfo.insuranceNotes}</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-sunset" />
                    <CardTitle>Embassy Contact</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{emergencyInfo.embassyContact}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Hospitals */}
        {emergencyInfo.hospitals.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-6">
                <Hospital className="h-6 w-6 text-ocean" />
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Recommended Hospitals
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {emergencyInfo.hospitals.map((hospital) => (
                  <Card key={hospital.name} className="border-border/50">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-foreground mb-1">{hospital.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                        <MapPin className="h-3 w-3" />
                        {hospital.city}
                      </p>
                      <Badge variant="outline">{hospital.type}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Important Tips */}
        <section className="py-12 bg-kente/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
                Essential Health Tips for African Travel
              </h2>
              <div className="space-y-4">
                {[
                  "Visit a travel medicine clinic 4-6 weeks before departure",
                  "Carry a copy of your vaccination records",
                  "Pack a basic first aid kit with personal medications",
                  "Know your blood type and carry documentation",
                  "Register with your embassy before traveling",
                  "Purchase comprehensive travel insurance with medical evacuation",
                  "Keep emergency contacts saved offline on your phone",
                  "Research the nearest quality hospital at each destination",
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-safari/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-safari">{index + 1}</span>
                    </div>
                    <p className="text-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              Need Personalized Health Advice?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our Pioneer plan includes access to relocation consultants who can help you navigate 
              healthcare systems and find trusted medical providers in your destination country.
            </p>
            <Button asChild size="lg" className="bg-safari hover:bg-safari/90 text-ebony">
              <a href="/pricing">View Pioneer Plan</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import React from "react"

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SubscriptionGate } from "@/components/subscription-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Building2,
  MapPin,
  Star,
  Search,
  Filter,
  Phone,
  Mail,
  Globe,
  Utensils,
  Home,
  Briefcase,
  Car,
  Stethoscope,
  GraduationCap,
  Wifi,
  Lock,
  Plus,
  Loader2,
  CheckCircle,
  Crown,
} from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";
import { countries } from "@/lib/data/countries";

interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  city: string;
  country: string;
  country_code: string;
  rating: number;
  review_count: number;
  is_verified: boolean;
  is_featured: boolean;
  tags: string[];
  phone: string | null;
  email: string | null;
  website: string | null;
  owner_id: string;
}

const categories = [
  { value: "all", label: "All Categories", icon: Building2 },
  { value: "restaurants", label: "Restaurants & Dining", icon: Utensils },
  { value: "accommodation", label: "Accommodation", icon: Home },
  { value: "relocation", label: "Relocation Services", icon: Briefcase },
  { value: "transport", label: "Transportation", icon: Car },
  { value: "healthcare", label: "Healthcare", icon: Stethoscope },
  { value: "education", label: "Education & Language", icon: GraduationCap },
  { value: "coworking", label: "Coworking Spaces", icon: Wifi },
];

// Sample businesses for display when DB is empty
const sampleBusinesses: Business[] = [
  {
    id: "sample-1",
    name: "Accra Expat Relocation",
    category: "relocation",
    description: "Full-service relocation support for expats moving to Ghana. Visa assistance, housing, banking setup, and cultural orientation.",
    city: "Accra",
    country: "Ghana",
    country_code: "GH",
    rating: 4.8,
    review_count: 127,
    is_verified: true,
    is_featured: true,
    tags: ["Visa Support", "Housing", "Banking", "Cultural Training"],
    phone: "+233 30 123 4567",
    email: "info@accraexpat.com",
    website: "https://accraexpat.com",
    owner_id: "",
  },
  {
    id: "sample-2",
    name: "Nairobi Cowork Hub",
    category: "coworking",
    description: "Modern coworking space in Westlands with high-speed internet, meeting rooms, and a vibrant community of digital nomads and startups.",
    city: "Nairobi",
    country: "Kenya",
    country_code: "KE",
    rating: 4.6,
    review_count: 89,
    is_verified: true,
    is_featured: true,
    tags: ["High-Speed WiFi", "Meeting Rooms", "24/7 Access", "Events"],
    phone: null,
    email: "hello@nairobicowork.co.ke",
    website: "https://nairobicowork.co.ke",
    owner_id: "",
  },
  {
    id: "sample-3",
    name: "Cape Town Language Academy",
    category: "education",
    description: "Learn Afrikaans, Xhosa, or Zulu with experienced local teachers. Private and group lessons available for all levels.",
    city: "Cape Town",
    country: "South Africa",
    country_code: "ZA",
    rating: 4.9,
    review_count: 64,
    is_verified: true,
    is_featured: false,
    tags: ["Afrikaans", "Xhosa", "Zulu", "Private Lessons"],
    phone: "+27 21 555 1234",
    email: "learn@ctlanguage.co.za",
    website: null,
    owner_id: "",
  },
  {
    id: "sample-4",
    name: "Mama Africa Kitchen",
    category: "restaurants",
    description: "Authentic West African cuisine in the heart of Accra. Family recipes passed down through generations. Live music on weekends.",
    city: "Accra",
    country: "Ghana",
    country_code: "GH",
    rating: 4.7,
    review_count: 213,
    is_verified: true,
    is_featured: true,
    tags: ["Ghanaian Cuisine", "Live Music", "Family-Friendly", "Outdoor Seating"],
    phone: "+233 24 555 6789",
    email: null,
    website: null,
    owner_id: "",
  },
  {
    id: "sample-5",
    name: "Kigali Health Clinic",
    category: "healthcare",
    description: "International standard medical clinic with English and French speaking doctors. Walk-ins welcome. Travel vaccinations available.",
    city: "Kigali",
    country: "Rwanda",
    country_code: "RW",
    rating: 4.5,
    review_count: 42,
    is_verified: true,
    is_featured: false,
    tags: ["English Speaking", "Vaccinations", "Walk-In", "Insurance Accepted"],
    phone: "+250 788 123 456",
    email: null,
    website: "https://kigaliclinic.rw",
    owner_id: "",
  },
  {
    id: "sample-6",
    name: "Lagos Airport Transfers",
    category: "transport",
    description: "Reliable airport pickup and drop-off service in Lagos. Professional drivers, AC vehicles, flight tracking included.",
    city: "Lagos",
    country: "Nigeria",
    country_code: "NG",
    rating: 4.4,
    review_count: 178,
    is_verified: true,
    is_featured: false,
    tags: ["Airport Transfers", "Flight Tracking", "24/7 Service", "AC Vehicles"],
    phone: "+234 803 555 7890",
    email: "book@lagostransfers.ng",
    website: null,
    owner_id: "",
  },
];

function BusinessPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [businesses, setBusinesses] = useState<Business[]>(sampleBusinesses);
  const [isLoading, setIsLoading] = useState(true);
  const [isPioneer, setIsPioneer] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    city: "",
    country_code: "",
    phone: "",
    email: "",
    website: "",
    tags: "",
  });

  useEffect(() => {
    const loadData = async () => {
      const supabase = createBrowserClient();
      
      // Check user and subscription
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data: profile } = await supabase
          .from("profiles")
          .select("subscription_tier")
          .eq("id", user.id)
          .single();
        setIsPioneer(profile?.subscription_tier === "pioneer");
      }

      // Fetch businesses from DB
      const { data: dbBusinesses } = await supabase
        .from("businesses")
        .select("*")
        .eq("status", "approved")
        .order("is_featured", { ascending: false })
        .order("rating", { ascending: false });

      if (dbBusinesses && dbBusinesses.length > 0) {
        setBusinesses([...dbBusinesses, ...sampleBusinesses]);
      }
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    setIsSubmitting(true);
    const supabase = createBrowserClient();
    
    const country = countries.find(c => c.code === formData.country_code);
    
    const { error } = await supabase.from("businesses").insert({
      owner_id: userId,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      city: formData.city,
      country: country?.name || "",
      country_code: formData.country_code,
      phone: formData.phone || null,
      email: formData.email || null,
      website: formData.website || null,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
      status: "pending",
    });

    setIsSubmitting(false);
    
    if (!error) {
      setSubmitSuccess(true);
      setFormData({
        name: "",
        category: "",
        description: "",
        city: "",
        country_code: "",
        phone: "",
        email: "",
        website: "",
        tags: "",
      });
    }
  };

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || business.category === selectedCategory;
    const matchesCountry =
      selectedCountry === "all" || business.country_code === selectedCountry;
    return matchesSearch && matchesCategory && matchesCountry;
  });

  const featuredBusinesses = filteredBusinesses.filter((b) => b.is_featured);
  const regularBusinesses = filteredBusinesses.filter((b) => !b.is_featured);

  const getCategoryIcon = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.icon || Building2;
  };

  const uniqueCountries = [...new Set(businesses.map(b => b.country_code))];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubscriptionGate feature="Business Directory" requiredPlan="voyager">
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-ocean/10 via-background to-safari/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-ocean/10 text-ocean px-4 py-2 rounded-full mb-6">
                <Building2 className="h-4 w-4" />
                <span className="text-sm font-medium">Business Directory</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Find Trusted Businesses Across Africa
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Discover verified restaurants, relocation services, coworking spaces, 
                healthcare providers, and more across the continent.
              </p>
              
              {isPioneer ? (
                <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-safari hover:bg-safari/90 text-ebony">
                      <Plus className="h-4 w-4 mr-2" />
                      List Your Business
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-safari" />
                        List Your Business
                      </DialogTitle>
                      <DialogDescription>
                        As a Pioneer member, you can list your business in our directory.
                        Listings are reviewed before publishing.
                      </DialogDescription>
                    </DialogHeader>
                    
                    {submitSuccess ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-savanna mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Submitted Successfully!</h3>
                        <p className="text-muted-foreground mb-4">
                          Your business listing is pending review. We will notify you once it is approved.
                        </p>
                        <Button onClick={() => { setShowAddDialog(false); setSubmitSuccess(false); }}>
                          Close
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Business Name *</Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Accra Expat Services"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(v) => setFormData({ ...formData, category: v })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.filter(c => c.value !== "all").map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                  {cat.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Description *</Label>
                          <Textarea
                            id="description"
                            required
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe your business..."
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="country">Country *</Label>
                            <Select
                              value={formData.country_code}
                              onValueChange={(v) => setFormData({ ...formData, country_code: v })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                {countries.map((c) => (
                                  <SelectItem key={c.code} value={c.code}>
                                    {c.flagEmoji} {c.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              required
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                              placeholder="e.g., Accra"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+233 30 123 4567"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="contact@business.com"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            type="url"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://yourbusiness.com"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="tags">Tags (comma separated)</Label>
                          <Input
                            id="tags"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            placeholder="Visa Support, Housing, Banking"
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-safari hover:bg-safari/90 text-ebony"
                          disabled={isSubmitting || !formData.name || !formData.category || !formData.description || !formData.country_code || !formData.city}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-2" />
                              Submit for Review
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              ) : (
                <Link href="/pricing">
                  <Button size="lg" className="bg-safari hover:bg-safari/90 text-ebony">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade to Pioneer to List
                  </Button>
                </Link>
              )}
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
                  placeholder="Search businesses, cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-56 h-11">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full md:w-48 h-11">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {uniqueCountries.map((code) => {
                    const country = countries.find(c => c.code === code);
                    return (
                      <SelectItem key={code} value={code}>
                        {country?.flagEmoji} {country?.name || code}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Pioneer Banner */}
        {!isPioneer && (
          <section className="py-6 bg-safari/5 border-b border-safari/20">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-3">
                  <Crown className="h-5 w-5 text-safari" />
                  <p className="text-foreground">
                    <span className="font-semibold">Pioneer members</span> can list their businesses in this directory.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="border-safari text-safari hover:bg-safari/10 bg-transparent">
                  <Link href="/pricing">Upgrade to Pioneer</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {isLoading ? (
          <div className="py-20 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-safari mx-auto mb-4" />
            <p className="text-muted-foreground">Loading businesses...</p>
          </div>
        ) : (
          <>
            {/* Featured Businesses */}
            {featuredBusinesses.length > 0 && (
              <section className="py-12">
                <div className="container mx-auto px-4">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Featured Businesses
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {featuredBusinesses.map((business) => {
                      const CategoryIcon = getCategoryIcon(business.category);
                      return (
                        <Card key={business.id} className="border-safari/30 bg-safari/5 overflow-hidden">
                          <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-lg bg-safari/20 flex items-center justify-center">
                                  <CategoryIcon className="h-6 w-6 text-safari" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <CardTitle className="text-lg">{business.name}</CardTitle>
                                    {business.is_verified && (
                                      <Badge className="bg-savanna/20 text-savanna border-0 text-xs">
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3" />
                                    {business.city}, {business.country}
                                  </p>
                                </div>
                              </div>
                              <Badge className="bg-safari text-ebony">Featured</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm mb-4">
                              {business.description}
                            </p>
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-safari fill-safari" />
                                <span className="font-medium text-foreground">{business.rating}</span>
                                <span className="text-muted-foreground text-sm">({business.review_count} reviews)</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {business.tags?.slice(0, 4).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                              {business.website && (
                                <Button variant="outline" size="sm" asChild className="bg-transparent">
                                  <a href={business.website} target="_blank" rel="noopener noreferrer">
                                    <Globe className="h-4 w-4 mr-1" />
                                    Website
                                  </a>
                                </Button>
                              )}
                              {business.email && (
                                <Button variant="outline" size="sm" asChild className="bg-transparent">
                                  <a href={`mailto:${business.email}`}>
                                    <Mail className="h-4 w-4 mr-1" />
                                    Email
                                  </a>
                                </Button>
                              )}
                              {business.phone && (
                                <Button variant="outline" size="sm" asChild className="bg-transparent">
                                  <a href={`tel:${business.phone}`}>
                                    <Phone className="h-4 w-4 mr-1" />
                                    Call
                                  </a>
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* All Businesses */}
            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    All Businesses
                  </h2>
                  <p className="text-muted-foreground">
                    {filteredBusinesses.length} {filteredBusinesses.length === 1 ? "business" : "businesses"} found
                  </p>
                </div>

                {filteredBusinesses.length === 0 ? (
                  <div className="text-center py-16">
                    <Building2 className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No businesses found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularBusinesses.map((business) => {
                      const CategoryIcon = getCategoryIcon(business.category);
                      return (
                        <Card key={business.id} className="border-border/50 hover:border-safari/50 transition-colors">
                          <CardHeader className="pb-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <CardTitle className="text-base truncate">{business.name}</CardTitle>
                                  {business.is_verified && (
                                    <Badge className="bg-savanna/20 text-savanna border-0 text-xs shrink-0">
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3" />
                                  {business.city}, {business.country}
                                </p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {business.description}
                            </p>
                            <div className="flex items-center gap-1 mb-3">
                              <Star className="h-4 w-4 text-safari fill-safari" />
                              <span className="font-medium text-foreground">{business.rating}</span>
                              <span className="text-muted-foreground text-sm">({business.review_count})</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {business.tags?.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                              {business.website && (
                                <Button variant="ghost" size="sm" asChild className="px-2">
                                  <a href={business.website} target="_blank" rel="noopener noreferrer">
                                    <Globe className="h-4 w-4" />
                                  </a>
                                </Button>
                              )}
                              {business.email && (
                                <Button variant="ghost" size="sm" asChild className="px-2">
                                  <a href={`mailto:${business.email}`}>
                                    <Mail className="h-4 w-4" />
                                  </a>
                                </Button>
                              )}
                              {business.phone && (
                                <Button variant="ghost" size="sm" asChild className="px-2">
                                  <a href={`tel:${business.phone}`}>
                                    <Phone className="h-4 w-4" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
      </SubscriptionGate>
      <Footer />
    </div>
  );
}

export default function BusinessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-safari" /></div>}>
      <BusinessPageContent />
    </Suspense>
  );
}

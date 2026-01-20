"use client";

import React from "react"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase/client";
import { countries } from "@/lib/data/countries";
import {
  Globe,
  MapPin,
  Calendar,
  Plane,
  Home,
  Briefcase,
  Laptop,
  Heart,
  Users,
  GraduationCap,
  Palmtree,
  Loader2,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink,
} from "lucide-react";

const interestIcons: Record<string, React.ElementType> = {
  tourism: Plane,
  relocation: Home,
  "digital-nomad": Laptop,
  business: Briefcase,
  heritage: Heart,
  family: Users,
  education: GraduationCap,
  retirement: Palmtree,
};

const interestLabels: Record<string, string> = {
  tourism: "Tourism & Travel",
  relocation: "Relocation",
  "digital-nomad": "Digital Nomad",
  business: "Business",
  heritage: "Heritage & Roots",
  family: "Family Visit",
  education: "Education",
  retirement: "Retirement",
};

type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  subscription_tier: string;
  interests: string[] | null;
  favorite_countries: string[] | null;
  social_links: Record<string, string> | null;
  created_at: string;
};

export default function PublicProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createBrowserClient();
      const profileId = params.id as string;

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, bio, subscription_tier, interests, favorite_countries, social_links, created_at")
        .eq("id", profileId)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setProfile(data);
      }
      setIsLoading(false);
    };

    loadProfile();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-safari-gold" />
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-serif text-3xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground mb-6">This profile does not exist or has been removed.</p>
          <Link href="/">
            <Button className="bg-safari-gold hover:bg-safari-gold/90 text-ebony">
              Go Home
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const memberSince = new Date(profile.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const favoriteCountriesData = profile.favorite_countries
    ?.map((code) => countries.find((c) => c.code === code))
    .filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="max-w-3xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="w-32 h-32">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url || "/placeholder.svg"}
                      alt={profile.full_name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-4xl bg-safari-gold/10 text-safari-gold">
                      {profile.full_name?.charAt(0) || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h1 className="font-serif text-3xl font-bold">
                      {profile.full_name || "Anonymous Explorer"}
                    </h1>
                    {profile.subscription_tier === "pioneer" && (
                      <Badge className="bg-safari-gold text-ebony">Pioneer</Badge>
                    )}
                    {profile.subscription_tier === "voyager" && (
                      <Badge className="bg-ocean-blue text-white">Voyager</Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mb-4">
                    <Calendar className="w-4 h-4" />
                    Member since {memberSince}
                  </p>

                  {profile.bio && (
                    <p className="text-foreground mb-4">{profile.bio}</p>
                  )}

                  {/* Social Links */}
                  {profile.social_links && Object.keys(profile.social_links).length > 0 && (
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      {profile.social_links.twitter && (
                        <a
                          href={profile.social_links.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {profile.social_links.instagram && (
                        <a
                          href={profile.social_links.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                      {profile.social_links.linkedin && (
                        <a
                          href={profile.social_links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {profile.social_links.website && (
                        <a
                          href={profile.social_links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          {profile.interests && profile.interests.length > 0 && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-kente-red" />
                  Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => {
                    const Icon = interestIcons[interest] || Globe;
                    return (
                      <Badge
                        key={interest}
                        variant="outline"
                        className="px-3 py-2 text-sm flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {interestLabels[interest] || interest}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Favorite Countries */}
          {favoriteCountriesData.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-safari-gold" />
                  Countries of Interest
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {favoriteCountriesData.map((country) => (
                    <Link
                      key={country?.code}
                      href={`/country/${country?.code.toLowerCase()}`}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:border-safari-gold/50 transition-colors"
                    >
                      <span className="text-2xl">{country?.flagEmoji}</span>
                      <div>
                        <p className="font-medium">{country?.name}</p>
                        <p className="text-xs text-muted-foreground">{country?.region}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

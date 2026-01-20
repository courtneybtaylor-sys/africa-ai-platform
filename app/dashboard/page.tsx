"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plane,
  MapPin,
  Heart,
  Settings,
  Crown,
  Calendar,
  Globe,
  FileCheck,
  Building2,
  MessageSquare,
  TrendingUp,
  Clock,
  Star,
  Edit,
  Trash2,
  Eye,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";
import { useFavorites } from "@/hooks/use-favorites";
import { useActivities, type UserActivity } from "@/hooks/use-activities";
import { getTimeAgo } from "@/utils/get-time-ago"; // Import getTimeAgo function

type Profile = {
  id: string;
  full_name: string | null;
  subscription_tier: string;
  created_at: string;
  avatar_url: string | null;
  bio: string | null;
  interests: string[] | null;
  favorite_countries: string[] | null;
  social_links: Record<string, string> | null;
};

type SavedTrip = {
  id: string;
  user_id: string;
  trip_data: {
    title?: string;
    duration?: string;
    totalBudget?: string;
    destination?: string;
    travelers?: number;
    tripType?: string;
    savedAt?: string;
    summary?: string;
    days?: Array<{ day: number; title: string; location: string }>;
  };
  created_at: string;
};

const quickActions = [
  { name: "Plan a Trip", href: "/planner", icon: Plane, color: "bg-safari-gold" },
  { name: "Check Visa", href: "/visa", icon: FileCheck, color: "bg-ocean-blue" },
  { name: "Explore Cities", href: "/cities", icon: Building2, color: "bg-savanna-green" },
  { name: "Community", href: "/community", icon: MessageSquare, color: "bg-sunset-orange" },
];

// Activity type icons and colors
const activityConfig = {
  trip_plan: { icon: Plane, color: "text-safari-gold", label: "Trip Plan" },
  visa_check: { icon: FileCheck, color: "text-ocean-blue", label: "Visa Check" },
  city_guide: { icon: MapPin, color: "text-savanna-green", label: "City Guide" },
};

const favoriteCountries = [
  { name: "Ghana", code: "GH", visits: 3 },
  { name: "Kenya", code: "KE", visits: 2 },
  { name: "South Africa", code: "ZA", visits: 1 },
];

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const router = useRouter();
  const { activities, activityLimits, isLoading: activitiesLoading } = useActivities();
  const recentActivity = activities.slice(0, 5); // Assuming useActivities returns an array of activities

  useEffect(() => {
    const loadDashboard = async () => {
      const supabase = createBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/auth");
        return;
      }

      // Load profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setEditName(profileData.full_name || "");
      }

      // Load saved trips
      const { data: tripsData } = await supabase
        .from("saved_trips")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (tripsData) {
        setSavedTrips(tripsData);
      }

      setIsLoading(false);
    };

    loadDashboard();
  }, [router]);

  const handleUpdateProfile = async () => {
    if (!profile) return;
    
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: editName })
      .eq("id", profile.id);
    
    if (!error) {
      setProfile({ ...profile, full_name: editName });
      setIsEditing(false);
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from("saved_trips")
      .delete()
      .eq("id", tripId);
    
    if (!error) {
      setSavedTrips(prev => prev.filter(t => t.id !== tripId));
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "pioneer":
        return <Badge className="bg-gradient-to-r from-safari-gold to-sunset-orange text-ebony"><Crown className="w-3 h-3 mr-1" />Pioneer</Badge>;
      case "voyager":
        return <Badge className="bg-ocean-blue text-white"><Star className="w-3 h-3 mr-1" />Voyager</Badge>;
      default:
        return <Badge variant="secondary">Explorer</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const memberSince = new Date(profile.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-ebony via-ebony to-ocean-blue/20 text-white rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-20 h-20 border-4 border-safari-gold/30">
                <AvatarFallback className="bg-safari-gold text-ebony text-2xl font-bold">
                  {profile.full_name?.split(" ").map((n) => n[0]).join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-white/10 border-white/20 text-white max-w-xs"
                      />
                      <Button size="sm" onClick={handleUpdateProfile} className="bg-safari-gold text-ebony hover:bg-safari-gold/90">
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)} className="text-white hover:bg-white/10">
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h1 className="font-serif text-3xl font-bold">
                        {profile.full_name || "Welcome, Traveler"}
                      </h1>
                      <button onClick={() => setIsEditing(true)} className="text-white/60 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-gray-300">
                  {getPlanBadge(profile.subscription_tier)}
                  <span className="flex items-center gap-1 text-sm">
                    <Calendar className="w-4 h-4" />
                    Member since {memberSince}
                  </span>
                </div>
              </div>
              {profile.subscription_tier === "explorer" && (
                <Link href="/pricing">
                  <Button className="bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action) => (
              <Link key={action.name} href={action.href}>
                <Card className="hover:shadow-lg transition-all hover:border-safari-gold/30 cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`${action.color} p-3 rounded-lg`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium">{action.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trips">My Trips</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-safari-gold" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {profile.subscription_tier === "explorer" ? (
                      <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          Activity history is available for Voyager and Pioneer plans
                        </p>
                        <Link href="/pricing">
                          <Button variant="outline" size="sm">
                            <Crown className="w-4 h-4 mr-2" />
                            Upgrade to Track Activity
                          </Button>
                        </Link>
                      </div>
                    ) : activitiesLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-safari-gold" />
                      </div>
                    ) : activities.length === 0 ? (
                      <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">No recent activity yet</p>
                        <p className="text-sm text-muted-foreground">
                          Your trip plans, visa checks, and city guides will appear here
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {activities.slice(0, 6).map((activity) => {
                          const config = activityConfig[activity.activity_type as keyof typeof activityConfig];
                          const Icon = config?.icon || Clock;
                          const timeAgo = getTimeAgo(new Date(activity.created_at)); // Use getTimeAgo function
                          return (
                            <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="w-10 h-10 rounded-full bg-safari-gold/10 flex items-center justify-center">
                                <Icon className={`w-5 h-5 ${config?.color || "text-safari-gold"}`} />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{activity.title}</p>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="secondary" className="text-xs mb-1">{config?.label}</Badge>
                                <p className="text-xs text-muted-foreground">{timeAgo}</p>
                              </div>
                            </div>
                          );
                        })}
                        <div className="pt-2 border-t text-xs text-muted-foreground">
                          Showing up to {activityLimits.tripPlans} trip plans, {activityLimits.visaChecks} visa checks, {activityLimits.cityGuides} city guides
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Stats & Favorites */}
                <div className="space-y-6">
                  {/* Plan Status */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Your Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        {getPlanBadge(profile.subscription_tier)}
                        {profile.subscription_tier !== "pioneer" && (
                          <Link href="/pricing" className="text-sm text-safari-gold hover:underline">
                            Upgrade
                          </Link>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {profile.subscription_tier === "explorer" && (
                          <p>Upgrade to unlock AI Trip Planner, Visa Checker, and Community posting.</p>
                        )}
                        {profile.subscription_tier === "voyager" && (
                          <p>You have access to all AI tools. Upgrade to Pioneer for consulting services.</p>
                        )}
                        {profile.subscription_tier === "pioneer" && (
                          <p>You have full access to all Africa AI features and consulting services.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Favorite Countries */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Heart className="w-4 h-4 text-kente-red" />
                        Top Countries
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {favoriteCountries.map((country) => (
                        <Link key={country.code} href={`/country/${country.code}`}>
                          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <Globe className="w-4 h-4 text-safari-gold" />
                              <span className="font-medium">{country.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{country.visits} views</span>
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trips">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Saved Trip Plans</CardTitle>
                    <Link href="/planner">
                      <Button className="bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                        <Plane className="w-4 h-4 mr-2" />
                        Plan New Trip
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {savedTrips.length === 0 ? (
                    <div className="text-center py-12">
                      <Plane className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No saved trips yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start planning your African adventure with our AI Trip Planner.
                      </p>
                      <Link href="/planner">
                        <Button className="bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                          Create Your First Trip
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedTrips.map((trip) => (
                        <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg hover:border-safari-gold/30 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-safari-gold/10 rounded-lg flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-safari-gold" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{trip.trip_data.title || trip.trip_data.destination || "Trip Plan"}</h4>
                              <p className="text-sm text-muted-foreground">
                                {trip.trip_data.duration || "Custom"} • {trip.trip_data.totalBudget || "Budget not set"}
                                {trip.trip_data.travelers && ` • ${trip.trip_data.travelers} traveler${trip.trip_data.travelers > 1 ? "s" : ""}`}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Saved {new Date(trip.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteTrip(trip.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              {/* FavoritesTab Component */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Places</CardTitle>
                    <CardDescription>Countries and cities you have saved for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No favorites yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Explore countries and cities to save your favorites.
                      </p>
                      <Link href="/countries">
                        <Button className="bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                          Explore Countries
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your profile and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="space-y-2">
                    <Label>Profile Photo</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-20 h-20">
                        {profile?.avatar_url ? (
                          <img src={profile.avatar_url || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <AvatarFallback className="text-2xl bg-safari-gold/10 text-safari-gold">
                            {profile?.full_name?.charAt(0) || "U"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload a photo to personalize your profile
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          id="avatar-upload"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file && profile) {
                              const supabase = createBrowserClient();
                              const fileExt = file.name.split('.').pop();
                              const fileName = `${profile.id}.${fileExt}`;
                              
                              const { error: uploadError } = await supabase.storage
                                .from('avatars')
                                .upload(fileName, file, { upsert: true });
                              
                              if (!uploadError) {
                                const { data: { publicUrl } } = supabase.storage
                                  .from('avatars')
                                  .getPublicUrl(fileName);
                                
                                await supabase
                                  .from('profiles')
                                  .update({ avatar_url: publicUrl })
                                  .eq('id', profile.id);
                                
                                setProfile({ ...profile, avatar_url: publicUrl });
                              }
                            }
                          }}
                        />
                        <Button 
                          variant="outline" 
                          className="bg-transparent"
                          onClick={() => document.getElementById('avatar-upload')?.click()}
                        >
                          Upload Photo
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <div className="flex gap-2">
                      <Input 
                        value={editName} 
                        onChange={(e) => setEditName(e.target.value)}
                        className="max-w-sm"
                      />
                      <Button onClick={handleUpdateProfile} className="bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                        Update
                      </Button>
                    </div>
                  </div>
                  
                  {/* Bio Section */}
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <textarea
                      className="w-full max-w-lg p-3 border rounded-md text-sm resize-none"
                      rows={3}
                      placeholder="Tell us about yourself..."
                      defaultValue={profile?.bio || ""}
                      onBlur={async (e) => {
                        if (profile) {
                          const supabase = createBrowserClient();
                          await supabase
                            .from('profiles')
                            .update({ bio: e.target.value })
                            .eq('id', profile.id);
                          setProfile({ ...profile, bio: e.target.value });
                        }
                      }}
                    />
                    <p className="text-xs text-muted-foreground">This will be visible on your public profile</p>
                  </div>

                  {/* Public Profile Link */}
                  <div className="space-y-2">
                    <Label>Public Profile</Label>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-3 py-2 rounded text-sm">
                        /profile/{profile?.id?.slice(0, 8)}
                      </code>
                      <Link href={`/profile/${profile?.id}`}>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Subscription</Label>
                    <div className="flex items-center gap-4">
                      {getPlanBadge(profile.subscription_tier)}
                      {profile.subscription_tier !== "pioneer" && (
                        <Link href="/pricing">
                          <Button variant="outline" className="bg-transparent">
                            <Crown className="w-4 h-4 mr-2" />
                            Upgrade Plan
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email Notifications</Label>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 rounded-lg border hover:border-safari-gold/30 transition-colors cursor-pointer">
                        <div>
                          <p className="font-medium text-sm">Trip Notifications</p>
                          <p className="text-xs text-muted-foreground">Get notified when trips are saved</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-safari-gold" />
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-lg border hover:border-safari-gold/30 transition-colors cursor-pointer">
                        <div>
                          <p className="font-medium text-sm">Weekly Digest</p>
                          <p className="text-xs text-muted-foreground">Receive weekly community highlights</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-safari-gold" />
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-lg border hover:border-safari-gold/30 transition-colors cursor-pointer">
                        <div>
                          <p className="font-medium text-sm">Community Updates</p>
                          <p className="text-xs text-muted-foreground">Get notified about forum replies</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-safari-gold" />
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-lg border hover:border-safari-gold/30 transition-colors cursor-pointer">
                        <div>
                          <p className="font-medium text-sm">Marketing Emails</p>
                          <p className="text-xs text-muted-foreground">Special offers and announcements</p>
                        </div>
                        <input type="checkbox" className="w-4 h-4 accent-safari-gold" />
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="destructive" className="bg-kente-red hover:bg-kente-red/90">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}

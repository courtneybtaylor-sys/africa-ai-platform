"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Gift, Users, Copy, Check, Share2, Trophy, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ReferralsPage() {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [profile, setProfile] = useState<{
    referral_code: string | null;
    referral_credits: number;
  } | null>(null);
  const [referrals, setReferrals] = useState<{ created_at: string; status: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      const supabase = createBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUser(user);
        
        // Get profile with referral info
        const { data: profileData } = await supabase
          .from("profiles")
          .select("referral_code, referral_credits")
          .eq("id", user.id)
          .single();
        
        if (profileData) {
          // Generate referral code if not exists
          if (!profileData.referral_code) {
            const code = `AFRICA${user.id.slice(0, 6).toUpperCase()}`;
            await supabase
              .from("profiles")
              .update({ referral_code: code })
              .eq("id", user.id);
            profileData.referral_code = code;
          }
          setProfile(profileData);
        }
        
        // Get referrals
        const { data: referralsData } = await supabase
          .from("referrals")
          .select("created_at, status")
          .eq("referrer_id", user.id)
          .order("created_at", { ascending: false });
        
        if (referralsData) {
          setReferrals(referralsData);
        }
      }
      
      setIsLoading(false);
    }
    
    loadData();
  }, []);

  const referralLink = profile?.referral_code 
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/auth?ref=${profile.referral_code}`
    : "";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Join Africa AI",
        text: "Discover Africa with AI-powered travel tools!",
        url: referralLink,
      });
    } else {
      copyLink();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-safari-gold" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <Gift className="w-12 h-12 text-safari-gold mx-auto mb-4" />
            <CardTitle>Referral Program</CardTitle>
            <CardDescription>Sign in to access your referral dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth">
              <Button className="w-full bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                Sign In to Continue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-safari-gold/10 rounded-full mb-4">
            <Gift className="w-8 h-8 text-safari-gold" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Referral Program</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Share Africa AI with friends and earn credits toward premium features
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-ocean-blue mx-auto mb-2" />
              <p className="text-3xl font-bold">{referrals.length}</p>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Check className="w-8 h-8 text-savanna-green mx-auto mb-2" />
              <p className="text-3xl font-bold">
                {referrals.filter(r => r.status === "completed").length}
              </p>
              <p className="text-sm text-muted-foreground">Successful Signups</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-safari-gold mx-auto mb-2" />
              <p className="text-3xl font-bold">{profile?.referral_credits || 0}</p>
              <p className="text-sm text-muted-foreground">Credits Earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Referral Link */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>
              Share this link to invite friends and earn rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                value={referralLink} 
                readOnly 
                className="font-mono text-sm"
              />
              <Button 
                onClick={copyLink}
                variant="outline"
                className="bg-transparent shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button 
                onClick={shareLink}
                className="bg-safari-gold hover:bg-safari-gold/90 text-ebony shrink-0"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Your code: <span className="font-mono font-bold">{profile?.referral_code}</span>
            </p>
          </CardContent>
        </Card>

        {/* How it Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-10 h-10 bg-safari-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-safari-gold">1</span>
                </div>
                <h3 className="font-semibold mb-1">Share Your Link</h3>
                <p className="text-sm text-muted-foreground">
                  Send your unique referral link to friends interested in African travel
                </p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-safari-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-safari-gold">2</span>
                </div>
                <h3 className="font-semibold mb-1">They Sign Up</h3>
                <p className="text-sm text-muted-foreground">
                  When they create an account using your link, you both get credited
                </p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-safari-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold text-safari-gold">3</span>
                </div>
                <h3 className="font-semibold mb-1">Earn Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Get 10 credits per referral - redeem for premium features or discounts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Referrals */}
        {referrals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {referrals.slice(0, 10).map((referral, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="text-sm">
                        New referral on {new Date(referral.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      referral.status === "completed" 
                        ? "bg-savanna-green/10 text-savanna-green"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {referral.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

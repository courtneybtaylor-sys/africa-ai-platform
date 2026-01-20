"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Sparkles, Check } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";

interface SubscriptionGateProps {
  feature: string;
  requiredPlan: "voyager" | "pioneer";
  children: React.ReactNode;
}

const planFeatures = {
  voyager: [
    "AI-Powered Trip Planner",
    "AI Visa Checker",
    "Business Directory Access",
    "Community Forum Access",
    "Save Favorites",
  ],
  pioneer: [
    "Everything in Voyager",
    "Relocation Consulting (4 hrs/mo)",
    "List Your Business",
    "Priority Support",
    "Legal Document Review",
  ],
};

const planPrices = {
  voyager: "$19/month",
  pioneer: "$79/month",
};

export function SubscriptionGate({ feature, requiredPlan, children }: SubscriptionGateProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    async function checkAuth() {
      try {
        const supabase = createBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user && isMounted) {
          setIsLoggedIn(true);
          // Get user's subscription plan and admin status from profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("subscription_tier, is_admin")
            .eq("id", user.id)
            .single();
          
          if (isMounted) {
            setCurrentPlan(profile?.subscription_tier || "explorer");
            setIsAdmin(profile?.is_admin || false);
          }
        } else if (isMounted) {
          setIsLoggedIn(false);
          setCurrentPlan(null);
          setIsAdmin(false);
        }
        if (isMounted) {
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    checkAuth();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const hasAccess = () => {
    // Admins always have access to all features
    if (isAdmin) return true;
    if (!currentPlan) return false;
    if (requiredPlan === "voyager") {
      return currentPlan === "voyager" || currentPlan === "pioneer";
    }
    return currentPlan === "pioneer";
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isLoggedIn && hasAccess()) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <Card className="max-w-lg w-full border-safari-gold/20 bg-gradient-to-b from-background to-sand-beige/5">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-safari-gold/10 flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-safari-gold" />
          </div>
          <CardTitle className="font-serif text-2xl">Premium Feature</CardTitle>
          <CardDescription className="text-base mt-2">
            <span className="font-semibold text-foreground">{feature}</span> is available on the{" "}
            <span className="text-safari-gold font-semibold capitalize">{requiredPlan}</span> plan and above.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold capitalize">{requiredPlan} Plan</span>
              <span className="text-safari-gold font-bold">{planPrices[requiredPlan]}</span>
            </div>
            <ul className="space-y-2">
              {planFeatures[requiredPlan].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-savanna-green flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            {!isLoggedIn ? (
              <>
                <Button asChild className="w-full bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                  <Link href="/auth">
                    Sign Up to Get Started
                  </Link>
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/auth" className="text-safari-gold hover:underline">
                    Sign in
                  </Link>
                </p>
              </>
            ) : (
              <>
                <Button asChild className="w-full bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                  <Link href="/pricing">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Upgrade to {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)}
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/">Back to Home</Link>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

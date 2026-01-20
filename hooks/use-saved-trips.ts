"use client";

import { useState, useEffect, useCallback } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import type { TripPlan } from "@/app/actions/ai-actions";

export interface SavedTrip {
  id: string;
  user_id: string;
  trip_data: TripPlan & {
    destination: string;
    travelers: number;
    tripType: string;
    savedAt: string;
  };
  created_at: string;
}

export function useSavedTrips() {
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);
  
  const supabase = createBrowserClient();

  const fetchTrips = useCallback(async () => {
    if (!userId) return;
    
    setIsLoading(true);
    const { data } = await supabase
      .from("saved_trips")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    
    if (data) {
      setTrips(data as SavedTrip[]);
    }
    setIsLoading(false);
  }, [supabase, userId]);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        
        // Get subscription plan
        const { data: profile } = await supabase
          .from("profiles")
          .select("subscription_tier")
          .eq("id", user.id)
          .single();
        
        setSubscriptionPlan(profile?.subscription_tier || "explorer");
      }
      setIsLoading(false);
    };
    init();
  }, [supabase]);

  useEffect(() => {
    if (userId) {
      fetchTrips();
    }
  }, [userId, fetchTrips]);

  const saveTrip = useCallback(async (
    tripPlan: TripPlan, 
    destination: string, 
    travelers: number,
    tripType: string
  ) => {
    if (!userId) return null;
    
    // Check if user has paid subscription
    const canSave = subscriptionPlan === "voyager" || subscriptionPlan === "pioneer";
    if (!canSave) return null;

    const tripData = {
      ...tripPlan,
      destination,
      travelers,
      tripType,
      savedAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("saved_trips")
      .insert({
        user_id: userId,
        trip_data: tripData,
      })
      .select()
      .single();

    if (!error && data) {
      setTrips(prev => [data as SavedTrip, ...prev]);
      return data;
    }
    return null;
  }, [userId, subscriptionPlan, supabase]);

  const deleteTrip = useCallback(async (tripId: string) => {
    if (!userId) return false;

    const { error } = await supabase
      .from("saved_trips")
      .delete()
      .eq("id", tripId)
      .eq("user_id", userId);

    if (!error) {
      setTrips(prev => prev.filter(t => t.id !== tripId));
      return true;
    }
    return false;
  }, [userId, supabase]);

  const canSaveTrips = subscriptionPlan === "voyager" || subscriptionPlan === "pioneer";

  return {
    trips,
    isLoading,
    isLoggedIn: !!userId,
    canSaveTrips,
    subscriptionPlan,
    saveTrip,
    deleteTrip,
    fetchTrips,
  };
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { createBrowserClient } from "@/lib/supabase/client";

export type ActivityType = "trip_plan" | "visa_check" | "city_guide";

export interface UserActivity {
  id: string;
  user_id: string;
  activity_type: ActivityType;
  title: string;
  description: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

interface UseActivitiesReturn {
  activities: UserActivity[];
  isLoading: boolean;
  saveActivity: (type: ActivityType, title: string, description: string, metadata?: Record<string, unknown>) => Promise<void>;
  getActivitiesByType: (type: ActivityType) => UserActivity[];
  activityLimits: { tripPlans: number; visaChecks: number; cityGuides: number };
}

export function useActivities(): UseActivitiesReturn {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [subscriptionTier, setSubscriptionTier] = useState<string>("explorer");
  
  const supabase = createBrowserClient();

  // Determine limits based on subscription tier
  const activityLimits = {
    tripPlans: subscriptionTier === "pioneer" ? 3 : subscriptionTier === "voyager" ? 1 : 0,
    visaChecks: subscriptionTier === "pioneer" ? 3 : subscriptionTier === "voyager" ? 1 : 0,
    cityGuides: subscriptionTier === "pioneer" ? 3 : subscriptionTier === "voyager" ? 1 : 0,
  };

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user && isMounted) {
          setUserId(user.id);
          
          // Get subscription tier
          const { data: profile } = await supabase
            .from("profiles")
            .select("subscription_tier, is_admin")
            .eq("id", user.id)
            .single();
          
          const tier = profile?.subscription_tier || "explorer";
          const isAdmin = profile?.is_admin || false;
          
          if (isMounted) {
            // Admins get pioneer-level access
            setSubscriptionTier(isAdmin ? "pioneer" : tier);
          }
          
          // Only load activities for paid tiers or admins
          if (tier !== "explorer" || isAdmin) {
            const { data } = await supabase
              .from("user_activities")
              .select("*")
              .eq("user_id", user.id)
              .order("created_at", { ascending: false });
            
            if (isMounted) {
              setActivities(data || []);
            }
          }
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

    loadActivities();
    
    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const saveActivity = useCallback(async (
    type: ActivityType,
    title: string,
    description: string,
    metadata: Record<string, unknown> = {}
  ) => {
    if (!userId || subscriptionTier === "explorer") return;

    const limit = type === "trip_plan" ? 3 
      : type === "visa_check" ? 3 
      : 3;

    // Get existing activities of this type
    const existingOfType = activities.filter(a => a.activity_type === type);

    // If at limit, delete oldest
    if (existingOfType.length >= limit) {
      const toDelete = existingOfType.slice(limit - 1);
      for (const activity of toDelete) {
        await supabase.from("user_activities").delete().eq("id", activity.id);
      }
    }

    // Insert new activity
    const { data, error } = await supabase
      .from("user_activities")
      .insert({
        user_id: userId,
        activity_type: type,
        title,
        description,
        metadata,
      })
      .select()
      .single();

    if (!error && data) {
      setActivities(prev => {
        const filtered = prev.filter(a => 
          a.activity_type !== type || 
          prev.filter(p => p.activity_type === type).indexOf(a) < limit - 1
        );
        return [data, ...filtered];
      });
    }
  }, [userId, subscriptionTier, activities, supabase]);

  const getActivitiesByType = useCallback((type: ActivityType) => {
    const limit = type === "trip_plan" ? 3 
      : type === "visa_check" ? 3 
      : 3;
    return activities.filter(a => a.activity_type === type).slice(0, limit);
  }, [activities]);

  return {
    activities,
    isLoading,
    saveActivity,
    getActivitiesByType,
    activityLimits,
  };
}

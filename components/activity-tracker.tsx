"use client";

import { useEffect, useRef } from "react";
import { useActivities, type ActivityType } from "@/hooks/use-activities";

interface ActivityTrackerProps {
  type: ActivityType;
  title: string;
  description: string;
  metadata?: Record<string, unknown>;
}

export function ActivityTracker({ type, title, description, metadata = {} }: ActivityTrackerProps) {
  const { saveActivity } = useActivities();
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per mount
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Slight delay to ensure user actually viewed the page
    const timer = setTimeout(() => {
      saveActivity(type, title, description, metadata);
    }, 2000);

    return () => clearTimeout(timer);
  }, [type, title, description, metadata, saveActivity]);

  // This component renders nothing
  return null;
}

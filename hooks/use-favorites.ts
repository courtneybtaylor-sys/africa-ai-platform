"use client";

import { useState, useEffect, useCallback } from "react";
import { createBrowserClient } from "@/lib/supabase/client";

export type FavoriteType = "country" | "city";

interface Favorite {
  id: string;
  item_type: FavoriteType;
  item_id: string;
  item_name: string;
  created_at: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const supabase = createBrowserClient();

  useEffect(() => {
    let isMounted = true;
    
    const loadFavorites = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user && isMounted) {
          setUserId(user.id);
          const { data } = await supabase
            .from("favorites")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });
          
          if (isMounted) {
            setFavorites(data || []);
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
    };

    loadFavorites();
    
    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const addFavorite = useCallback(async (type: FavoriteType, itemId: string, itemName: string) => {
    if (!userId) return false;

    const { data, error } = await supabase
      .from("favorites")
      .insert({
        user_id: userId,
        item_type: type,
        item_id: itemId,
        item_name: itemName,
      })
      .select()
      .single();

    if (!error && data) {
      setFavorites(prev => [data, ...prev]);
      return true;
    }
    return false;
  }, [userId, supabase]);

  const removeFavorite = useCallback(async (type: FavoriteType, itemId: string) => {
    if (!userId) return false;

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("item_type", type)
      .eq("item_id", itemId);

    if (!error) {
      setFavorites(prev => prev.filter(f => !(f.item_type === type && f.item_id === itemId)));
      return true;
    }
    return false;
  }, [userId, supabase]);

  const isFavorite = useCallback((type: FavoriteType, itemId: string) => {
    return favorites.some(f => f.item_type === type && f.item_id === itemId);
  }, [favorites]);

  const getFavoritesByType = useCallback((type: FavoriteType) => {
    return favorites.filter(f => f.item_type === type);
  }, [favorites]);

  return {
    favorites,
    isLoading,
    isLoggedIn: !!userId,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoritesByType,
  };
}

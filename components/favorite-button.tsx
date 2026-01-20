"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites, type FavoriteType } from "@/hooks/use-favorites";

interface FavoriteButtonProps {
  type: FavoriteType;
  itemId: string;
  itemName: string;
  variant?: "icon" | "button";
}

export function FavoriteButton({ type, itemId, itemName, variant = "icon" }: FavoriteButtonProps) {
  const router = useRouter();
  const { isFavorite, addFavorite, removeFavorite, isLoggedIn, isLoading } = useFavorites();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const favorited = isFavorite(type, itemId);

  const handleToggle = async () => {
    if (!isLoggedIn) {
      router.push("/auth");
      return;
    }
    
    setIsUpdating(true);
    if (favorited) {
      await removeFavorite(type, itemId);
    } else {
      await addFavorite(type, itemId, itemName);
    }
    setIsUpdating(false);
  };

  if (isLoading) {
    return (
      <Button variant="ghost" size={variant === "icon" ? "icon" : "sm"} disabled>
        <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    );
  }

  if (!isLoggedIn) {
    return (
      <Button 
        variant="ghost" 
        size={variant === "icon" ? "icon" : "sm"} 
        onClick={handleToggle}
        title="Sign in to save favorites"
      >
        <Heart className="w-4 h-4" />
        {variant === "button" && <span className="ml-2">Save</span>}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size={variant === "icon" ? "icon" : "sm"}
      onClick={handleToggle}
      disabled={isUpdating}
      className={favorited ? "text-kente-red" : "text-muted-foreground hover:text-kente-red"}
      title={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      {isUpdating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
      )}
      {variant === "button" && (
        <span className="ml-2">{favorited ? "Saved" : "Save"}</span>
      )}
    </Button>
  );
}

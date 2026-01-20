'use client';

import { MapPin, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gold/10 rounded-full flex items-center justify-center">
            <WifiOff className="w-12 h-12 text-gold" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <MapPin className="w-8 h-8 text-sunset" />
          </div>
        </div>

        <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
          You're Offline
        </h1>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          It looks like you've lost your connection. Don't worry - some of our 
          content is available offline. Reconnect to access the full Africa AI 
          experience with AI-powered trip planning and real-time visa information.
        </p>

        <div className="space-y-4">
          <Button 
            onClick={() => window.location.reload()} 
            className="w-full bg-gold hover:bg-gold/90 text-background"
          >
            <Wifi className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <Link href="/countries">
            <Button variant="outline" className="w-full border-gold/30 text-foreground hover:bg-gold/10 bg-transparent">
              Browse Cached Countries
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Tip: Visit pages while online to cache them for offline viewing.
        </p>
      </div>
    </div>
  );
}

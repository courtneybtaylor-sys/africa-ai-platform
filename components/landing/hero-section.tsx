'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plane, Globe, Users } from 'lucide-react';
import Link from 'next/link';
import { siteImages } from '@/lib/images';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={siteImages.hero.travelers || "/placeholder.svg"}
          alt="African travelers exploring"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-ebony/70 via-ebony/50 to-ebony/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-safari-gold/20 border border-safari-gold/30 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safari-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-safari-gold"></span>
            </span>
            <span className="text-sm font-medium text-white">AI-Powered Travel & Relocation Platform</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
            <span className="block">Your AI Guide to</span>
            <span className="block text-safari-gold italic">the Motherland</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-balance">
            Discover, relocate, and thrive across Africa&apos;s 54 nations. 
            Get personalized travel plans, visa guidance, and local insights powered by AI.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-safari-gold hover:bg-safari-gold/90 text-ebony font-semibold text-lg px-8 py-6 rounded-xl"
              asChild
            >
              <Link href="/planner">
                Plan Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-foreground/20 hover:bg-foreground/5 text-foreground font-semibold text-lg px-8 py-6 rounded-xl"
              asChild
            >
              <Link href="/countries">
                Explore 54 Countries
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-savanna-green/30 backdrop-blur-sm">
                <Globe className="w-6 h-6 text-savanna-green" />
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-bold text-white">54</p>
              <p className="text-sm text-white/70">Countries</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-ocean-blue/30 backdrop-blur-sm">
                <Plane className="w-6 h-6 text-ocean-blue" />
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-bold text-white">100+</p>
              <p className="text-sm text-white/70">City Guides</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-sunset-orange/30 backdrop-blur-sm">
                <Users className="w-6 h-6 text-sunset-orange" />
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-bold text-white">10K+</p>
              <p className="text-sm text-white/70">Travelers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

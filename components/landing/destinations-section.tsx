'use client';

import React from "react"
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wifi, DollarSign, Star } from 'lucide-react';
import { cities } from '@/lib/data/countries';
import { getCityImage } from '@/lib/images';

const featuredCities = cities.filter(c => c.isTechHub || c.isTouristDestination).slice(0, 6);

export function DestinationsSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <span className="text-safari-gold font-semibold text-sm uppercase tracking-wider">Top Destinations</span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Popular Cities
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              From tech hubs to beach paradises, discover the best cities Africa has to offer.
            </p>
          </div>
          <Button
            variant="ghost"
            className="mt-4 sm:mt-0 text-safari-gold hover:text-safari-gold/80"
            asChild
          >
            <Link href="/countries">
              View All Cities
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Cities Grid - Smaller cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCities.map((city) => {
            return (
              <Link
                key={city.id}
                href={`/city/${city.id}`}
                className="group relative bg-card rounded-xl border border-border overflow-hidden hover:border-safari-gold/50 hover:shadow-lg transition-all duration-300"
              >
                {/* City Image */}
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={getCityImage(city.id) || "/placeholder.svg"}
                    alt={`${city.name}, ${city.countryCode}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* City name overlay */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-sm font-semibold text-white drop-shadow-lg truncate">
                      {city.name}
                    </h3>
                  </div>
                  
                  {/* Badge */}
                  {city.isTechHub && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium rounded-full">
                        Tech Hub
                      </span>
                    </div>
                  )}
                </div>

                {/* Content - Compact */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">{city.countryCode}</p>
                    <div className="flex items-center gap-0.5 text-safari-gold">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-medium">4.5</span>
                    </div>
                  </div>

                  {/* Mini Stats */}
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-0.5">
                      <DollarSign className="w-3 h-3" />
                      <span>${city.costOfLivingMonthly}/mo</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Wifi className="w-3 h-3" />
                      <span>{city.internetSpeedMbps}Mbps</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { countries, regions } from '@/lib/data/countries';
import { Search, Globe, DollarSign, Shield, Wifi, ArrowRight, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function CountriesContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'safety' | 'cost'>('name');

  const filteredCountries = useMemo(() => {
    let result = countries;

    // Filter by search
    if (searchQuery) {
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.capital.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by region
    if (selectedRegion) {
      result = result.filter((c) => c.region === selectedRegion);
    }

    // Sort
    switch (sortBy) {
      case 'safety':
        result = [...result].sort((a, b) => b.safetyIndex - a.safetyIndex);
        break;
      case 'cost':
        result = [...result].sort((a, b) => a.costOfLivingIndex - b.costOfLivingIndex);
        break;
      default:
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedRegion, sortBy]);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
{/* Hero */}
  <section className="pt-32 pb-12 bg-gradient-to-b from-sand-beige/50 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
              Explore Africa&apos;s <span className="text-safari-gold">54 Nations</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From the ancient pyramids of Egypt to the vibrant streets of Lagos, discover detailed guides for every African country.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search countries or capitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-xl border-border"
              />
            </div>

            {/* Region Filter */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Region:</span>
              <Button
                variant={selectedRegion === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRegion(null)}
                className={selectedRegion === null ? 'bg-ebony text-ivory hover:bg-ebony/90' : 'bg-transparent'}
              >
                All
              </Button>
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedRegion(region.name)}
                  className={selectedRegion === region.name ? 'text-ivory' : 'bg-transparent'}
                  style={{
                    backgroundColor: selectedRegion === region.name ? region.color : undefined,
                  }}
                >
                  {region.name}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
              <Button
                variant={sortBy === 'name' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('name')}
                className={sortBy === 'name' ? 'bg-safari-gold text-ebony hover:bg-safari-gold/90' : 'bg-transparent'}
              >
                Name
              </Button>
              <Button
                variant={sortBy === 'safety' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('safety')}
                className={sortBy === 'safety' ? 'bg-safari-gold text-ebony hover:bg-safari-gold/90' : 'bg-transparent'}
              >
                <Shield className="w-4 h-4 mr-1" />
                Safety
              </Button>
              <Button
                variant={sortBy === 'cost' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('cost')}
                className={sortBy === 'cost' ? 'bg-safari-gold text-ebony hover:bg-safari-gold/90' : 'bg-transparent'}
              >
                <DollarSign className="w-4 h-4 mr-1" />
                Cost
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredCountries.length}</span> countries
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <Link
                key={country.id}
                href={`/country/${country.code.toLowerCase()}`}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-safari-gold/50 hover:shadow-lg transition-all duration-300"
              >
                {/* Header with flag */}
                <div
                  className="h-24 flex items-center justify-center relative"
                  style={{
                    backgroundColor: `${regions.find((r) => r.name === country.region)?.color}15`,
                  }}
                >
                  <span className="text-5xl">{country.flagEmoji}</span>
                  <div
                    className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium text-ivory"
                    style={{
                      backgroundColor: regions.find((r) => r.name === country.region)?.color,
                    }}
                  >
                    {country.region.split(' ')[0]}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-safari-gold transition-colors">
                    {country.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    <Globe className="w-3.5 h-3.5 inline mr-1" />
                    {country.capital}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {country.highlights.slice(0, 2).map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2 py-0.5 bg-secondary text-xs rounded-full text-muted-foreground"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" />
                      <span>{country.safetyIndex}% safe</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wifi className="w-3.5 h-3.5" />
                      <span>{country.internetSpeedMbps} Mbps</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-safari-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-16">
              <Globe className="w-16 h-16 mx-auto text-muted-foreground/30" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No countries found</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function CountriesPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-safari-gold" />
      </main>
    }>
      <CountriesContent />
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';

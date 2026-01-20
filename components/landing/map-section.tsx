import { AfricaMap } from '@/components/africa-map';

export function MapSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-sand-beige/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-safari-gold font-semibold text-sm uppercase tracking-wider">Interactive Map</span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Explore the Continent
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on any country to discover detailed information, city guides, and travel tips.
          </p>
        </div>

        {/* Map Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl border border-border p-4 sm:p-8 shadow-xl">
            <AfricaMap />
          </div>
        </div>
      </div>
    </section>
  );
}

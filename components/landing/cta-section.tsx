import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { siteImages } from '@/lib/images';

const benefits = [
  'AI-powered personalized itineraries',
  'Visa requirements for 190+ nationalities',
  'Cost of living data for 100+ cities',
  'Community insights from real expats',
];

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-ebony text-ivory relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="kente" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#D4A853" />
              <rect x="20" y="20" width="20" height="20" fill="#D4A853" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#kente)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <span className="text-safari-gold font-semibold text-sm uppercase tracking-wider">Start Your Journey</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory leading-tight">
              Ready to Discover Africa?
            </h2>
            <p className="mt-6 text-lg text-ivory/70 max-w-lg">
              Join thousands of travelers, expats, and diaspora members who have used Africa AI to plan their perfect African adventure.
            </p>

            {/* Benefits */}
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-safari-gold flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-ebony" />
                  </div>
                  <span className="text-ivory/90">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-safari-gold hover:bg-safari-gold/90 text-ebony font-semibold text-lg px-8 py-6 rounded-xl"
                asChild
              >
                <Link href="/planner">
                  Start Planning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-ivory/30 hover:bg-ivory/10 text-ivory font-semibold text-lg px-8 py-6 rounded-xl"
                asChild
              >
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main Image */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-4 border-safari-gold/30">
                <Image
                  src={siteImages.categories.family || "/placeholder.svg"}
                  alt="African family traveling"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ebony/50 to-transparent" />
              </div>
              
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <p className="text-4xl font-serif font-bold text-safari-gold">54</p>
                <p className="text-sm text-ebony">African Nations</p>
                <p className="text-xs text-muted-foreground">One Platform</p>
              </div>
              
              {/* Secondary floating image */}
              <div className="absolute -top-4 -right-4 w-32 h-32 rounded-xl overflow-hidden border-2 border-white shadow-lg">
                <Image
                  src={siteImages.categories.adventure || "/placeholder.svg"}
                  alt="African adventure"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

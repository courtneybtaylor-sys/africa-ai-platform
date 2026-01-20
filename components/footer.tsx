import Link from 'next/link';
import { Map } from 'lucide-react';

const footerLinks = {
  explore: [
    { name: 'All Countries', href: '/countries' },
    { name: 'City Guides', href: '/cities' },
    { name: 'Trip Planner', href: '/planner' },
    { name: 'Visa Checker', href: '/visa' },
    { name: 'Moving Checklist', href: '/checklist' },
    { name: 'Business Directory', href: '/business' },
    { name: 'Community Forum', href: '/community' },
    { name: 'Health & Safety', href: '/health-safety' },
  ],
  regions: [
    { name: 'East Africa', href: '/countries?region=East' },
    { name: 'West Africa', href: '/countries?region=West' },
    { name: 'Southern Africa', href: '/countries?region=Southern' },
    { name: 'North Africa', href: '/countries?region=North' },
    { name: 'Central Africa', href: '/countries?region=Central' },
  ],
  company: [
    { name: 'About Us', href: '/company' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Referral Program', href: '/referrals' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-ebony text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-safari-gold">
                <Map className="w-6 h-6 text-ebony" />
              </div>
              <span className="font-serif text-xl font-bold text-ivory">Africa AI</span>
            </Link>
            <p className="mt-4 text-sm text-ivory/70 max-w-xs">
              Your AI-powered guide to discovering, relocating, and thriving across Africa&apos;s 54 nations.
            </p>
            <p className="mt-4 text-xs text-ivory/50">
              Built by Kheper LLC
              <br />
              Kansas City, MO
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-safari-gold uppercase tracking-wider">Explore</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-ivory/70 hover:text-ivory transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h3 className="text-sm font-semibold text-safari-gold uppercase tracking-wider">Regions</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.regions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-ivory/70 hover:text-ivory transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-safari-gold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-ivory/70 hover:text-ivory transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-safari-gold uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-ivory/70 hover:text-ivory transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-ivory/10">
          <p className="text-center text-sm text-ivory/50">
            &copy; {new Date().getFullYear()} Africa AI by Kheper LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

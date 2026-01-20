'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, Map, Plane, FileCheck, Building2, CreditCard, Stethoscope, Store, Users, LogOut, User, ClipboardList, Info } from 'lucide-react';
import { createBrowserClient, type SupabaseUser } from '@/lib/supabase/client';
import { NotificationBell } from '@/components/notification-bell';

const navigation = [
  { name: 'About Us', href: '/company', icon: Info },
  { name: 'Countries', href: '/countries', icon: Globe },
  { name: 'Trip Planner', href: '/planner', icon: Plane },
  { name: 'Visa Checker', href: '/visa', icon: FileCheck },
  { name: 'Checklist', href: '/checklist', icon: ClipboardList },
  { name: 'Business', href: '/business', icon: Store },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Health & Safety', href: '/health-safety', icon: Stethoscope },
  { name: 'Pricing', href: '/pricing', icon: CreditCard },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function getUser() {
      try {
        const supabase = createBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (isMounted) {
          setUser(user);
          setLoading(false);
        }
      } catch (error) {
        // Ignore abort errors during unmount
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    getUser();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-ebony via-ebony/95 to-ebony backdrop-blur-md border-b border-safari-gold/20 shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-safari-gold">
            <Map className="w-6 h-6 text-ebony" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold text-white">Africa AI</span>
            <span className="text-[10px] text-safari-gold/80 -mt-1 hidden sm:block">Your AI Guide to the Motherland</span>
          </div>
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 hover:text-safari-gold hover:bg-white/10 rounded-lg transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          {loading ? (
            <div className="w-20 h-9 bg-muted animate-pulse rounded-lg" />
          ) : user ? (
            <>
              <NotificationBell />
              <Button variant="ghost" asChild className="text-white/90 hover:text-safari-gold hover:bg-white/10">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" onClick={handleSignOut} className="text-white/90 hover:text-safari-gold hover:bg-white/10">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-white/90 hover:text-safari-gold hover:bg-white/10">
                <Link href="/auth">Sign In</Link>
              </Button>
              <Button asChild className="bg-safari-gold hover:bg-safari-gold/90 text-ebony font-semibold">
                <Link href="/auth">Start Planning</Link>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-lg hover:bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Toggle menu</span>
          {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              {user ? (
                <>
                  <Button variant="outline" asChild className="w-full justify-center bg-transparent">
                    <Link href="/dashboard">
                      <User className="w-4 h-4 mr-2" />
                      My Dashboard
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={handleSignOut} className="w-full justify-center bg-transparent">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full justify-center bg-transparent">
                    <Link href="/auth">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full justify-center bg-safari-gold hover:bg-safari-gold/90 text-ebony font-semibold">
                    <Link href="/auth">Start Planning</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

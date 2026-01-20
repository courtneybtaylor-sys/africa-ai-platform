import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Cookie,
  Shield,
  Settings,
  BarChart3,
  Users,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | Africa AI",
  description: "Learn how Africa AI uses cookies to improve your experience. We believe in transparency and giving you control over your data.",
};

const cookieTypes = [
  {
    name: "Essential Cookies",
    icon: Shield,
    required: true,
    description: "These cookies are necessary for the website to function properly. They enable core functionality such as security, authentication, and session management.",
    examples: [
      "Authentication tokens to keep you logged in",
      "Security cookies to protect against fraud",
      "Session cookies to remember your preferences during a visit",
    ],
    retention: "Session or up to 1 year",
  },
  {
    name: "Functional Cookies",
    icon: Settings,
    required: false,
    description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
    examples: [
      "Language and region preferences",
      "Theme settings (light/dark mode)",
      "Recently viewed countries and cities",
      "Saved search filters",
    ],
    retention: "Up to 1 year",
  },
  {
    name: "Analytics Cookies",
    icon: BarChart3,
    required: false,
    description: "These cookies help us understand how visitors interact with our website, allowing us to improve our services and user experience.",
    examples: [
      "Pages visited and time spent",
      "Navigation patterns through the site",
      "Error tracking to fix bugs",
      "Feature usage statistics",
    ],
    retention: "Up to 2 years",
  },
  {
    name: "Marketing Cookies",
    icon: Users,
    required: false,
    description: "These cookies may be used to deliver relevant advertisements and track their effectiveness. We minimize the use of marketing cookies.",
    examples: [
      "Referral tracking for our affiliate program",
      "Campaign effectiveness measurement",
    ],
    retention: "Up to 1 year",
  },
];

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-sand-beige/30 to-background">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-safari-gold/10 text-safari-gold text-sm font-medium mb-6">
              <Cookie className="w-4 h-4" />
              Cookie Policy
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              How We Use Cookies
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We believe in transparency. This policy explains what cookies are, how we use them, and how you can control them.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-safari-gold/5 border-safari-gold/20">
              <CardContent className="p-8">
                <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-safari-gold" />
                  Cookie Summary
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">What we DO:</h3>
                    <ul className="space-y-2">
                      {[
                        "Use essential cookies for site functionality",
                        "Remember your preferences",
                        "Analyze site usage to improve our service",
                        "Give you control over non-essential cookies",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-savanna-green shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">What we DON'T do:</h3>
                    <ul className="space-y-2">
                      {[
                        "Sell cookie data to third parties",
                        "Track you across other websites",
                        "Use cookies without your knowledge",
                        "Store sensitive personal information in cookies",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <XCircle className="w-4 h-4 text-kente-red shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold mb-6">What Are Cookies?</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
              <p className="mt-4">
                Cookies help us remember your preferences, understand how you use our site, and improve your overall experience. They are not harmful and cannot be used to identify you personally unless you provide us with personal information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-16 bg-sand-beige/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold mb-8">Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              {cookieTypes.map((cookie) => (
                <Card key={cookie.name} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className={`p-6 md:w-64 flex flex-col items-center justify-center text-center ${
                        cookie.required ? "bg-savanna-green/10" : "bg-muted/50"
                      }`}>
                        <cookie.icon className={`w-10 h-10 mb-3 ${
                          cookie.required ? "text-savanna-green" : "text-muted-foreground"
                        }`} />
                        <h3 className="font-semibold text-lg">{cookie.name}</h3>
                        <span className={`text-xs mt-2 px-3 py-1 rounded-full ${
                          cookie.required 
                            ? "bg-savanna-green/20 text-savanna-green" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {cookie.required ? "Required" : "Optional"}
                        </span>
                      </div>
                      <div className="p-6 flex-1">
                        <p className="text-muted-foreground mb-4">{cookie.description}</p>
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold mb-2">Examples:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {cookie.examples.map((example) => (
                              <li key={example} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-safari-gold rounded-full" />
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          <strong>Retention:</strong> {cookie.retention}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Managing Cookies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold mb-6">Managing Your Cookie Preferences</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Browser Settings</h3>
                <p className="text-muted-foreground mb-4">
                  Most web browsers allow you to control cookies through their settings. You can usually find these options in the "Options," "Settings," or "Preferences" menu of your browser.
                </p>
                <p className="text-muted-foreground">
                  Please note that disabling certain cookies may affect the functionality of our website and limit your ability to use some features.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Opt-Out Links</h3>
                <p className="text-muted-foreground mb-4">
                  You can opt out of certain third-party cookies using the following resources:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-safari-gold rounded-full" />
                    <span>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-safari-gold hover:underline">Google Analytics Opt-out</a></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-safari-gold rounded-full" />
                    <span>Network Advertising Initiative: <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-safari-gold hover:underline">NAI Opt-out</a></span>
                  </li>
                </ul>
              </div>

              <Card className="bg-ocean-blue/5 border-ocean-blue/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Your Rights</h3>
                  <p className="text-muted-foreground">
                    Under GDPR and other privacy regulations, you have the right to access, correct, or delete any personal data we hold about you, including cookie-related data. Contact us at <a href="mailto:privacy@africaai.com" className="text-safari-gold hover:underline">privacy@africaai.com</a> to exercise these rights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-sand-beige/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold mb-4">Questions About Cookies?</h2>
            <p className="text-muted-foreground mb-8">
              We're committed to transparency. If you have any questions about our cookie policy, please don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/privacy">View Privacy Policy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

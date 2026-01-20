"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, X, Sparkles, Globe, Map, FileCheck, Users, Zap, Building, Stethoscope, Phone } from "lucide-react";

const plans = [
  {
    name: "Explorer",
    description: "Perfect for casual travelers exploring Africa",
    monthlyPrice: 0,
    yearlyPrice: 0,
    popular: false,
    features: [
      { name: "Browse all 54 country guides", included: true },
      { name: "Basic city information", included: true },
      { name: "Basic visa requirements lookup", included: true },
      { name: "Cost of living calculator", included: true },
      { name: "Medical & emergency info", included: true },
      { name: "AI Trip Planner", included: false },
      { name: "Advanced Visa Checker with AI", included: false },
      { name: "Business listing directory", included: false },
      { name: "1-on-1 relocation consulting", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    href: "/countries",
  },
  {
    name: "Voyager",
    description: "For serious travelers and digital nomads",
    monthlyPrice: 19,
    yearlyPrice: 149,
    popular: true,
    features: [
      { name: "Browse all 54 country guides", included: true },
      { name: "Detailed city guides with neighborhoods", included: true },
      { name: "Basic visa requirements lookup", included: true },
      { name: "Cost of living calculator", included: true },
      { name: "Medical & emergency info", included: true },
      { name: "Unlimited AI Trip Planner", included: true },
      { name: "Advanced Visa Checker with AI", included: true },
      { name: "Business listing directory access", included: true },
      { name: "1-on-1 relocation consulting", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Start 7-Day Free Trial",
    href: "/signup?plan=voyager",
  },
  {
    name: "Pioneer",
    description: "Complete relocation and business support",
    monthlyPrice: 79,
    yearlyPrice: 649,
    popular: false,
    features: [
      { name: "Everything in Voyager", included: true },
      { name: "Unlimited AI Trip Planner", included: true },
      { name: "Advanced Visa Checker with AI", included: true },
      { name: "Business listing directory access", included: true },
      { name: "List your business (1 listing)", included: true },
      { name: "1-on-1 relocation consulting (4 hrs/mo)", included: true },
      { name: "Priority support (24hr response)", included: true },
      { name: "Offline access to all guides", included: true },
      { name: "Custom relocation roadmap", included: true },
      { name: "Legal & visa document review", included: true },
    ],
    cta: "Contact Sales",
    href: "/contact?plan=pioneer",
  },
];

const features = [
  {
    icon: Globe,
    title: "54 Country Guides",
    description: "Comprehensive guides for every African nation with visa info, safety ratings, and cultural insights.",
  },
  {
    icon: Sparkles,
    title: "AI Trip Planner",
    description: "Get personalized itineraries powered by AI that understand your travel style and interests.",
    premium: true,
  },
  {
    icon: FileCheck,
    title: "AI Visa Checker",
    description: "Instant visa requirements for any passport-destination combination with document checklists.",
    premium: true,
  },
  {
    icon: Map,
    title: "City Guides",
    description: "Neighborhood-level guides with local tips, digital nomad scores, and cost breakdowns.",
  },
  {
    icon: Building,
    title: "Business Directory",
    description: "Find and list African businesses - from restaurants to relocation services.",
    premium: true,
  },
  {
    icon: Stethoscope,
    title: "Medical & Emergency",
    description: "Essential health info, emergency contacts, and hospital locations across Africa.",
  },
  {
    icon: Users,
    title: "Relocation Consulting",
    description: "1-on-1 expert guidance for your move to Africa - visas, housing, banking, and more.",
    premium: true,
  },
  {
    icon: Phone,
    title: "Priority Support",
    description: "Get answers within 24 hours from our Africa relocation experts.",
    premium: true,
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-safari-gold/10 via-sunset-orange/5 to-savanna-green/10" />
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-safari-gold/20 to-sunset-orange/20 border border-safari-gold/30 text-safari-gold text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                <span>Flexible plans for every African adventure</span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text">
                Plans & Pricing
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
                From casual exploration to complete relocation support — discover the perfect plan for your African journey
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4">
                <Label
                  htmlFor="billing-toggle"
                  className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Monthly
                </Label>
                <Switch className="text-primary"
                  id="billing-toggle"
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                />
                <Label
                  htmlFor="billing-toggle"
                  className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Yearly
                  <span className="ml-2 text-xs text-safari font-semibold bg-safari/10 px-2 py-1 rounded-full">
                    Save 30%
                  </span>
                </Label>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                    plan.popular
                      ? "border-2 border-safari-gold shadow-2xl scale-[1.05] z-10 bg-gradient-to-br from-background via-background to-safari-gold/5"
                      : "border border-border hover:border-safari-gold/50 bg-card"
                  }`}
                >
                  {/* Decorative Top Bar */}
                  <div className={`h-1.5 ${
                    index === 0 ? "bg-gradient-to-r from-ocean-blue to-sky-blue" :
                    index === 1 ? "bg-gradient-to-r from-safari-gold to-sunset-orange" :
                    "bg-gradient-to-r from-savanna-green to-safari-gold"
                  }`} />
                  
                  {plan.popular && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-gradient-to-r from-safari-gold to-sunset-orange text-ebony text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-6 pt-10">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      index === 0 ? "bg-gradient-to-br from-ocean-blue/10 to-sky-blue/10" :
                      index === 1 ? "bg-gradient-to-br from-safari-gold/10 to-sunset-orange/10" :
                      "bg-gradient-to-br from-savanna-green/10 to-safari-gold/10"
                    }`}>
                      {index === 0 ? <Globe className="w-8 h-8 text-ocean-blue" /> :
                       index === 1 ? <Sparkles className="w-8 h-8 text-safari-gold" /> :
                       <Zap className="w-8 h-8 text-savanna-green" />}
                    </div>
                    <CardTitle className="font-serif text-3xl font-bold mb-2">{plan.name}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-foreground">
                          ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        {plan.monthlyPrice > 0 && (
                          <span className="text-muted-foreground">
                            /{isYearly ? "year" : "month"}
                          </span>
                        )}
                      </div>
                      {plan.monthlyPrice === 0 && (
                        <span className="text-muted-foreground">Free forever</span>
                      )}
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature.name}
                          className="flex items-start gap-3"
                        >
                          {feature.included ? (
                            <Check className="w-5 h-5 text-savanna shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                          )}
                          <span
                            className={
                              feature.included
                                ? "text-foreground"
                                : "text-muted-foreground/50"
                            }
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className={`w-full ${plan.popular ? "bg-safari hover:bg-safari/90 text-ebony" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      <Link href={plan.href}>{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Everything You Need to Explore Africa
              </h2>
              <p className="text-muted-foreground text-lg">
                Core features for everyone. Premium features unlock with paid plans.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature) => (
                <Card key={feature.title} className="border-border/50 relative">
                  {feature.premium && (
                    <div className="absolute top-3 right-3">
                      <span className="text-xs bg-safari/10 text-safari px-2 py-1 rounded-full font-medium">
                        Premium
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-safari/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-safari" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {[
                  {
                    q: "What's included in the AI Trip Planner?",
                    a: "The AI Trip Planner creates personalized day-by-day itineraries based on your destination, travel style, budget, and interests. It includes accommodation suggestions, activities, dining recommendations, and local tips - all generated by our Africa-specialized AI.",
                  },
                  {
                    q: "How does the relocation consulting work?",
                    a: "Pioneer plan members get 4 hours per month of 1-on-1 video calls with our relocation experts. They help with visa strategy, finding housing, opening bank accounts, understanding local taxes, and navigating the bureaucracy of your destination country.",
                  },
                  {
                    q: "Can I list my business on Africa AI?",
                    a: "Yes! Pioneer plan members can list one business for free. Additional listings and featured placements are available for purchase. We accept businesses that serve travelers, expats, and the diaspora - restaurants, tour operators, relocation services, coworking spaces, and more.",
                  },
                  {
                    q: "Is there a free trial?",
                    a: "Yes, Voyager and Pioneer plans come with a 7-day free trial. No credit card required to start. You can explore all features before committing.",
                  },
                  {
                    q: "What payment methods do you accept?",
                    a: "We accept all major credit cards, PayPal, and mobile money options popular across Africa including M-Pesa, MTN Mobile Money, and Airtel Money.",
                  },
                ].map((faq) => (
                  <div
                    key={faq.q}
                    className="border border-border rounded-lg p-6"
                  >
                    <h3 className="font-semibold text-foreground mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-safari/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Your African Journey?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of travelers, digital nomads, and diaspora members discovering the beauty and opportunity across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-safari hover:bg-safari/90 text-ebony">
                <Link href="/planner">Try AI Trip Planner</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/countries">Explore Countries</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

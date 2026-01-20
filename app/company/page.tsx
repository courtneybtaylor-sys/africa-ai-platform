import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Globe,
  Users,
  Heart,
  Target,
  Lightbulb,
  Shield,
  Sparkles,
  Mail,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Heart,
    title: "African-First",
    description:
      "We believe in Africa's potential and are dedicated to showcasing the continent's beauty, opportunity, and innovation to the world.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description:
      "Our platform is built by and for the African diaspora, expats, and travelers who share our passion for the continent.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "We prioritize accurate, up-to-date information and vetted recommendations to ensure safe and informed travel decisions.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Leveraging AI and modern technology to make African travel and relocation accessible, personalized, and seamless.",
  },
];

const stats = [
  { value: "54", label: "African Countries" },
  { value: "20+", label: "City Guides" },
  { value: "AI", label: "Powered Planning" },
  { value: "24/7", label: "Support" },
];

const team = [
  {
    name: "The Founder",
    role: "CEO & Visionary",
    description:
      "Driven by a passion for connecting the African diaspora with their roots and helping global citizens discover Africa's potential.",
  },
];

export default function CompanyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-sand/30 to-background overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 border-primary text-primary">
                About Africa AI
              </Badge>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Your AI Guide to the Motherland
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
                Africa AI is a comprehensive relocation and travel platform focused exclusively 
                on the African continent. We serve the African diaspora returning home, 
                international expats, digital nomads, and tourists exploring Africa's 54 countries.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/planner">
                    Start Planning <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/countries">Explore Countries</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4 border-secondary text-secondary">
                  Our Mission
                </Badge>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Connecting the World to Africa
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Africa AI was born from a simple observation: despite being home to 54 diverse 
                  nations, incredible cultures, and boundless opportunities, Africa remains 
                  underrepresented in global travel and relocation platforms.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We're changing that. Our AI-powered platform provides comprehensive, accurate, 
                  and personalized information for anyone looking to visit, work, or relocate 
                  to Africa. From visa requirements to cost of living, from city guides to 
                  cultural insights - we've got you covered.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Target className="w-5 h-5" />
                    <span className="font-medium">Year of Return</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Globe className="w-5 h-5" />
                    <span className="font-medium">Digital Nomads</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-primary/10 border-primary/20">
                  <CardContent className="pt-6 text-center">
                    <Globe className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Pan-African</h3>
                    <p className="text-sm text-muted-foreground">
                      Covering all 54 African nations
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/10 border-secondary/20">
                  <CardContent className="pt-6 text-center">
                    <Sparkles className="w-10 h-10 text-secondary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">AI-Powered</h3>
                    <p className="text-sm text-muted-foreground">
                      Smart, personalized recommendations
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-savanna/10 border-savanna/20">
                  <CardContent className="pt-6 text-center">
                    <Users className="w-10 h-10 text-savanna mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Community</h3>
                    <p className="text-sm text-muted-foreground">
                      Built with diaspora insights
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-ocean/10 border-ocean/20">
                  <CardContent className="pt-6 text-center">
                    <Shield className="w-10 h-10 text-ocean mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Trusted</h3>
                    <p className="text-sm text-muted-foreground">
                      Vetted, accurate information
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-primary text-primary">
                Our Values
              </Badge>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Drives Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our core values guide everything we do, from the features we build 
                to the communities we serve.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <Card key={value.title} className="bg-background">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4 border-secondary text-secondary">
                  The Company
                </Badge>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Built by Kheper LLC
                </h2>
                <p className="text-muted-foreground">
                  Africa AI is a product of Kheper LLC, headquartered in Kansas City, Missouri.
                </p>
              </div>

              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-primary-foreground">K</span>
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="font-semibold text-xl mb-1">Kheper LLC</h3>
                      <p className="text-muted-foreground mb-3">
                        Technology company focused on building tools that connect 
                        communities and empower global citizens.
                      </p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          Kansas City, MO 64130
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          hello@africai.app
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-muted-foreground mb-2">
                  Africa AI is part of the AI Expat Hub family of products.
                </p>
                <p className="text-sm text-muted-foreground">
                  Empowering global mobility through artificial intelligence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Discover Africa?
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Join thousands of travelers and expats using Africa AI to plan their 
                journey across the continent.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                  <Link href="/planner">Plan Your Trip</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  <Link href="/countries">Browse Countries</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

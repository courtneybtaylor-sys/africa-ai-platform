import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Building2,
  Send,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact Us | Africa AI",
  description: "Get in touch with Africa AI. We're here to help with your African travel and relocation questions.",
};

const contactInfo = [
  {
    icon: Building2,
    label: "Company",
    value: "Kheper LLC",
    href: null,
  },
  {
    icon: MapPin,
    label: "Address",
    value: "2904 E 49th St\nKansas City, MO 64130-2706",
    href: "https://maps.google.com/?q=2904+E+49th+St+Kansas+City+MO+64130",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (816) 527-6799",
    href: "tel:+18165276799",
  },
  {
    icon: Mail,
    label: "Email",
    value: "courtneybtaylor@kheperllc.com",
    href: "mailto:courtneybtaylor@kheperllc.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri: 9AM - 6PM CST",
    href: null,
  },
];

const inquiryTypes = [
  "General Inquiry",
  "Partnership Opportunity",
  "Press & Media",
  "Technical Support",
  "Billing Question",
  "Feature Request",
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-safari-gold/10 to-background overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-64 h-64 bg-safari-gold rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-savanna-green rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 border-safari-gold text-safari-gold">
                Get In Touch
              </Badge>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Have questions about your African journey? We're here to help. 
                Reach out and our team will get back to you promptly.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground">
                    Reach out through any of these channels
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-safari-gold/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-safari-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a 
                            href={item.href}
                            className="text-foreground hover:text-safari-gold transition-colors whitespace-pre-line"
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-foreground whitespace-pre-line">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Links */}
                <Card className="border-safari-gold/20 bg-safari-gold/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-safari-gold" />
                      Quick Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link href="/faq" className="block text-sm text-muted-foreground hover:text-safari-gold transition-colors">
                      Frequently Asked Questions
                    </Link>
                    <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-safari-gold transition-colors">
                      Pricing & Plans
                    </Link>
                    <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-safari-gold transition-colors">
                      Privacy Policy
                    </Link>
                    <Link href="/company" className="block text-sm text-muted-foreground hover:text-safari-gold transition-colors">
                      About Us
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone (Optional)</Label>
                          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="inquiry">Inquiry Type</Label>
                        <select 
                          id="inquiry"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="">Select an inquiry type</option>
                          {inquiryTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="How can we help?" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Tell us more about your inquiry..."
                          rows={5}
                        />
                      </div>

                      <Button type="submit" className="w-full bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By submitting this form, you agree to our{" "}
                        <Link href="/privacy" className="underline hover:text-safari-gold">
                          Privacy Policy
                        </Link>
                        . We typically respond within 24-48 hours.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-sand-beige/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Our Location
              </h2>
              <p className="text-muted-foreground mb-8">
                Kheper LLC is headquartered in Kansas City, Missouri
              </p>
              <div className="aspect-video rounded-xl overflow-hidden border border-border bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3099.8!2d-94.55!3d39.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDAyJzI0LjAiTiA5NMKwMzMnMDAuMCJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kheper LLC Location"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

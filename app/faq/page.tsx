"use client";

import { useState, Suspense } from "react";
import { ChevronDown, HelpCircle, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is Africa AI?",
        a: "Africa AI is an AI-powered travel platform designed specifically for exploring the African continent. We provide comprehensive country guides, AI trip planning, visa information, and a community of fellow travelers."
      },
      {
        q: "Is Africa AI free to use?",
        a: "Yes! Our Explorer plan is completely free and gives you access to country guides, city information, and community forums. Premium plans (Voyager and Pioneer) unlock AI-powered tools like trip planning, visa checking, and business listing features."
      },
      {
        q: "How do I create an account?",
        a: "Click 'Sign In' in the top navigation, then select 'Create Account'. You can sign up with your email or use Google/Apple authentication for quick access."
      }
    ]
  },
  {
    category: "AI Features",
    questions: [
      {
        q: "How does the AI Trip Planner work?",
        a: "Our AI Trip Planner analyzes your preferences (destination, duration, budget, interests) and generates a personalized day-by-day itinerary. It considers local attractions, cultural experiences, and practical logistics to create your perfect African adventure."
      },
      {
        q: "Is the visa information accurate?",
        a: "Our AI Visa Checker provides general guidance based on commonly available information. However, visa requirements change frequently, so we always recommend verifying with official embassy sources before traveling."
      },
      {
        q: "Can I save my AI-generated trips?",
        a: "Yes! Voyager and Pioneer subscribers can save unlimited trips to their dashboard for future reference. You can also share trips with travel companions."
      }
    ]
  },
  {
    category: "Subscriptions & Billing",
    questions: [
      {
        q: "What are the subscription tiers?",
        a: "We offer three tiers: Explorer (Free) - basic access and community features; Voyager ($19/month) - full AI tools and trip saving; Pioneer ($79/month) - everything plus business listing and priority support."
      },
      {
        q: "Can I upgrade or downgrade my plan?",
        a: "Yes, you can change your subscription at any time from your dashboard settings. Upgrades take effect immediately, while downgrades apply at your next billing cycle."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express) through our secure Stripe payment processor. Local payment methods may be available depending on your region."
      },
      {
        q: "Is there a refund policy?",
        a: "We offer a 7-day money-back guarantee for new subscribers. If you're not satisfied, contact support within 7 days of your first payment for a full refund."
      }
    ]
  },
  {
    category: "Travel & Safety",
    questions: [
      {
        q: "Is it safe to travel to Africa?",
        a: "Africa is a diverse continent with varying safety levels by region. Our country guides include safety ratings and travel advisories. We recommend checking current conditions and registering with your embassy before travel."
      },
      {
        q: "Do you offer travel insurance?",
        a: "We don't sell travel insurance directly, but strongly recommend obtaining comprehensive travel insurance for any African trip. Our emergency page provides helpful resources and contacts."
      },
      {
        q: "How current is the country information?",
        a: "We regularly update our country data including costs, safety ratings, and practical information. AI-generated content uses current knowledge, but we always recommend verifying time-sensitive information."
      }
    ]
  },
  {
    category: "Business Directory",
    questions: [
      {
        q: "How can I list my business?",
        a: "Pioneer subscribers can list Africa-related businesses in our directory. Go to the Business page and click 'List Your Business' to submit your company for review."
      },
      {
        q: "What types of businesses can be listed?",
        a: "We accept legitimate businesses serving African travelers: tour operators, accommodations, restaurants, transportation services, travel agencies, and related services."
      },
      {
        q: "How long does business approval take?",
        a: "We review submissions within 2-3 business days. You'll receive an email notification once your listing is approved or if we need additional information."
      }
    ]
  },
  {
    category: "Community & Support",
    questions: [
      {
        q: "How do I participate in the forums?",
        a: "Voyager and Pioneer subscribers can post and comment in our community forums. All registered users can read and browse discussions."
      },
      {
        q: "How do I contact support?",
        a: "You can reach our support team via the AI chat assistant on any page, or email us at support@africaai.com. Pioneer subscribers receive priority support with faster response times."
      },
      {
        q: "Can I contribute to country guides?",
        a: "We love community contributions! If you have local knowledge or recent travel experience, contact us about becoming a verified contributor."
      }
    ]
  }
];

function FAQContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const searchParams = useSearchParams();

  const toggleItem = (id: string) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenItems(newOpen);
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-safari-gold/10 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-safari-gold" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">
            Find answers to common questions about Africa AI
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFaqs.map((category) => (
            <div key={category.category}>
              <h2 className="text-lg font-semibold mb-4 text-safari-gold">
                {category.category}
              </h2>
              <div className="space-y-2">
                {category.questions.map((item, index) => {
                  const itemId = `${category.category}-${index}`;
                  const isOpen = openItems.has(itemId);
                  
                  return (
                    <div
                      key={itemId}
                      className="border rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium pr-4">{item.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-muted-foreground">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-8 bg-muted/50 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">
            Our support team is here to help you plan your African adventure
          </p>
          <p className="text-sm">
            Use the chat widget in the corner or email{" "}
            <a href="mailto:support@africaai.com" className="text-safari-gold hover:underline">
              support@africaai.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-safari-gold" />
      </div>
    }>
      <FAQContent />
    </Suspense>
  );
}

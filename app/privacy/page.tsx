import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Eye,
  Lock,
  Database,
  Share2,
  Trash2,
  Mail,
  Globe,
  Cookie,
  FileText,
  Users,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Africa AI",
  description: "Our commitment to protecting your privacy and being transparent about how we handle your data.",
};

const sections = [
  {
    id: "commitment",
    icon: Shield,
    title: "Our Commitment to Transparency",
    content: `At Africa AI, transparency isn't just a policy—it's our mission. We believe you have the right to know exactly what data we collect, why we collect it, and how we use it. We will never sell your personal data to third parties, and we only collect what's necessary to provide you with the best possible experience exploring Africa.`,
  },
  {
    id: "data-collected",
    icon: Database,
    title: "Information We Collect",
    content: `We collect information you provide directly:
    
• **Account Information**: Email address, name, and password when you create an account
• **Profile Data**: Country of origin, travel preferences, and interests you share with us
• **Trip Planning Data**: Destinations, dates, and preferences when using our trip planner
• **Saved Content**: Countries, cities, and resources you favorite or bookmark
• **Communication**: Messages you send through our platform or customer support

We also collect some information automatically:
• **Usage Data**: Pages visited, features used, and time spent on the platform
• **Device Information**: Browser type, operating system, and device type
• **Location Data**: General geographic region (country/city level) from your IP address`,
  },
  {
    id: "how-we-use",
    icon: Eye,
    title: "How We Use Your Information",
    content: `We use your information solely to improve your experience:

• **Personalization**: Tailoring recommendations, trip plans, and content to your interests
• **AI Features**: Powering our AI trip planner, visa checker, and city guides with relevant context
• **Account Management**: Maintaining your account, saved items, and preferences
• **Communication**: Sending important updates, newsletters (if opted in), and responding to inquiries
• **Platform Improvement**: Analyzing aggregate usage patterns to make Africa AI better for everyone
• **Security**: Protecting against fraud, abuse, and unauthorized access`,
  },
  {
    id: "data-sharing",
    icon: Share2,
    title: "How We Share Information",
    content: `We are extremely protective of your data. We share information only in these limited circumstances:

• **Service Providers**: Trusted partners who help us operate (hosting, email, analytics) under strict confidentiality agreements
• **AI Processing**: Anonymized queries sent to AI providers to generate personalized content—your personal identity is never shared
• **Legal Requirements**: When required by law or to protect rights and safety
• **Business Transfers**: In the event of a merger or acquisition, with the same privacy protections

**We will NEVER**:
• Sell your personal data to advertisers or data brokers
• Share your travel plans or personal information with third parties for their marketing
• Use your data in ways you haven't consented to`,
  },
  {
    id: "data-security",
    icon: Lock,
    title: "Data Security",
    content: `We implement industry-standard security measures to protect your information:

• **Encryption**: All data transmitted to and from our platform is encrypted using TLS/SSL
• **Secure Storage**: Personal data is stored in encrypted databases with strict access controls
• **Authentication**: We use secure authentication methods and encourage strong passwords
• **Rate Limiting**: Protection against automated attacks and abuse
• **Regular Audits**: We regularly review our security practices and update them as needed

While no system is 100% secure, we continuously work to protect your information and promptly address any security concerns.`,
  },
  {
    id: "your-rights",
    icon: Users,
    title: "Your Rights & Controls",
    content: `You have full control over your data:

• **Access**: Request a copy of all personal data we hold about you
• **Correction**: Update or correct any inaccurate information in your profile
• **Deletion**: Request deletion of your account and associated data
• **Export**: Download your data in a portable format
• **Opt-Out**: Unsubscribe from marketing emails at any time
• **Cookies**: Manage cookie preferences through your browser settings

To exercise any of these rights, contact us at privacy@africaai.com or through your account settings.`,
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies & Tracking",
    content: `We use cookies and similar technologies to:

• **Essential Functions**: Keep you logged in and remember your preferences
• **Analytics**: Understand how users interact with our platform (using privacy-respecting analytics)
• **Performance**: Improve loading times and platform reliability

We do NOT use:
• Third-party advertising cookies
• Cross-site tracking pixels
• Invasive behavioral tracking

You can manage cookies through your browser settings. Disabling cookies may affect some platform functionality.`,
  },
  {
    id: "international",
    icon: Globe,
    title: "International Data Transfers",
    content: `Africa AI serves users across Africa and the global diaspora. Your data may be processed in countries outside your residence, including:

• United States (hosting and AI processing)
• European Union (backup services)

We ensure appropriate safeguards are in place for any international transfers, including standard contractual clauses and data processing agreements.`,
  },
  {
    id: "children",
    icon: AlertCircle,
    title: "Children's Privacy",
    content: `Africa AI is not intended for children under 16 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately and we will delete it.`,
  },
  {
    id: "retention",
    icon: Trash2,
    title: "Data Retention",
    content: `We retain your data only as long as necessary:

• **Active Accounts**: Data is retained while your account is active
• **Deleted Accounts**: Personal data is deleted within 30 days of account deletion
• **Anonymized Data**: We may retain anonymized, aggregate data indefinitely for analytics
• **Legal Requirements**: Some data may be retained longer if required by law

You can request immediate deletion of your data at any time.`,
  },
  {
    id: "updates",
    icon: FileText,
    title: "Policy Updates",
    content: `We may update this privacy policy from time to time. When we make significant changes:

• We'll notify you via email (if you have an account)
• We'll post a notice on our platform
• We'll update the "Last Updated" date below

We encourage you to review this policy periodically. Continued use of Africa AI after changes constitutes acceptance of the updated policy.`,
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact Us",
    content: `Questions, concerns, or requests about your privacy? We're here to help:

• **Email**: privacy@africaai.com
• **General Support**: support@africaai.com

We aim to respond to all privacy-related inquiries within 48 hours.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-savanna-green/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-savanna-green/10 text-savanna-green text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              <span>Your Privacy Matters</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground mb-4 text-pretty">
              Transparency is our mission. Here's exactly how we handle your data.
            </p>
            <p className="text-sm text-muted-foreground">
              Last Updated: January 19, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-12 border-y border-border bg-sand-beige/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
              Privacy at a Glance
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="text-center border-savanna-green/20 bg-savanna-green/5">
                <CardContent className="pt-6">
                  <Lock className="w-8 h-8 text-savanna-green mx-auto mb-3" />
                  <p className="font-medium text-foreground">Your data is encrypted</p>
                  <p className="text-sm text-muted-foreground">In transit and at rest</p>
                </CardContent>
              </Card>
              <Card className="text-center border-safari-gold/20 bg-safari-gold/5">
                <CardContent className="pt-6">
                  <Share2 className="w-8 h-8 text-safari-gold mx-auto mb-3" />
                  <p className="font-medium text-foreground">We never sell data</p>
                  <p className="text-sm text-muted-foreground">To anyone, ever</p>
                </CardContent>
              </Card>
              <Card className="text-center border-ocean-blue/20 bg-ocean-blue/5">
                <CardContent className="pt-6">
                  <Users className="w-8 h-8 text-ocean-blue mx-auto mb-3" />
                  <p className="font-medium text-foreground">You're in control</p>
                  <p className="text-sm text-muted-foreground">Access, export, delete anytime</p>
                </CardContent>
              </Card>
              <Card className="text-center border-sunset-orange/20 bg-sunset-orange/5">
                <CardContent className="pt-6">
                  <Eye className="w-8 h-8 text-sunset-orange mx-auto mb-3" />
                  <p className="font-medium text-foreground">No hidden tracking</p>
                  <p className="text-sm text-muted-foreground">No ads, no data brokers</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4">
              Contents
            </h2>
            <div className="flex flex-wrap gap-2">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="px-3 py-1.5 text-sm bg-muted hover:bg-safari-gold/10 hover:text-safari-gold rounded-full transition-colors"
                >
                  {index + 1}. {section.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <div key={section.id} id={section.id} className="scroll-mt-32">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-safari-gold/10 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-safari-gold" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                      {index + 1}. {section.title}
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      {section.content.split("\n\n").map((paragraph, pIndex) => (
                        <p 
                          key={pIndex} 
                          className="text-muted-foreground mb-4 whitespace-pre-line"
                          dangerouslySetInnerHTML={{ 
                            __html: paragraph
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                              .replace(/• /g, '<span class="text-safari-gold mr-2">•</span>')
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-ebony text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Shield className="w-12 h-12 text-safari-gold mx-auto mb-6" />
            <h2 className="font-serif text-3xl font-bold mb-4">
              Questions About Your Privacy?
            </h2>
            <p className="text-white/80 mb-8">
              We're committed to transparency. If you have any questions about how we handle your data, don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:privacy@africaai.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-safari-gold text-ebony font-medium rounded-lg hover:bg-safari-gold/90 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Contact Privacy Team
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
              >
                <FileText className="w-5 h-5" />
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

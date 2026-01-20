import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CurrencyConverter } from "@/components/currency-converter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, TrendingUp, Globe, Info } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Currency Converter | Africa AI",
  description: "Convert between African currencies and major world currencies. Get exchange rates for Nigerian Naira, South African Rand, Kenyan Shilling, and more.",
};

const popularPairs = [
  { from: "USD", to: "NGN", rate: 1550, change: "+2.3%" },
  { from: "USD", to: "ZAR", rate: 18.5, change: "-0.8%" },
  { from: "EUR", to: "KES", rate: 166, change: "+1.2%" },
  { from: "GBP", to: "GHS", rate: 20, change: "+3.1%" },
  { from: "USD", to: "EGP", rate: 50.5, change: "+0.5%" },
  { from: "USD", to: "MAD", rate: 10.1, change: "-0.2%" },
];

const currencyFacts = [
  {
    title: "CFA Franc",
    description: "Used by 14 African countries, the CFA franc is pegged to the Euro, providing currency stability across West and Central Africa.",
  },
  {
    title: "Mobile Money",
    description: "Africa leads the world in mobile money adoption. M-Pesa in Kenya processes billions in transactions annually.",
  },
  {
    title: "Currency Tips",
    description: "Always carry some local currency for small purchases. ATMs are widely available in major cities across Africa.",
  },
];

export default function CurrencyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-safari-gold/10 to-background py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-safari-gold/20 text-safari-gold px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Coins className="w-4 h-4" />
              Currency Tools
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              African Currency Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Convert between major world currencies and African currencies. 
              Plan your travel budget with up-to-date exchange rates.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Converter */}
              <div className="flex justify-center lg:justify-end">
                <CurrencyConverter />
              </div>

              {/* Popular Pairs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-safari-gold" />
                    Popular Currency Pairs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {popularPairs.map((pair) => (
                      <div
                        key={`${pair.from}-${pair.to}`}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{pair.from}</span>
                          <span className="text-muted-foreground">/</span>
                          <span className="font-medium">{pair.to}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-semibold">{pair.rate.toLocaleString()}</div>
                          <div className={`text-xs ${pair.change.startsWith("+") ? "text-savanna-green" : "text-kente-red"}`}>
                            {pair.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Currency Facts */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold text-center mb-8">
              African Currency Facts
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {currencyFacts.map((fact) => (
                <Card key={fact.title}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Info className="w-4 h-4 text-safari-gold" />
                      {fact.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{fact.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Currencies */}
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 text-muted-foreground mb-4">
              <Globe className="w-5 h-5" />
              <span>Supporting 18+ African & International Currencies</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {["NGN", "ZAR", "KES", "EGP", "GHS", "MAD", "TZS", "UGX", "ETB", "XOF", "XAF", "RWF", "BWP", "MUR", "TND", "USD", "EUR", "GBP"].map((code) => (
                <span
                  key={code}
                  className="px-3 py-1 bg-muted rounded-full text-sm font-medium"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

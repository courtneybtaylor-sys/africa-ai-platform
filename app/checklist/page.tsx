"use client";

export const dynamic = 'force-dynamic';

import { TabsContent } from "@/components/ui/tabs";
import { TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs";
import { Tabs } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { createBrowserClient } from "@/lib/supabase/client";
import { generateMovingChecklist, type MovingChecklist } from "@/app/actions/ai-actions";
import { countries } from "@/lib/data/countries";
import {
  Plane,
  Home,
  Laptop,
  CheckCircle2,
  Circle,
  Loader2,
  Lock,
  Crown,
  Calendar,
  MapPin,
  Clock,
  FileText,
  Briefcase,
  Heart,
  Banknote,
  Shield,
  Wifi,
  Users,
  Download,
  Share2,
  Sparkles,
  Save,
  Edit3,
  Building2,
  Truck,
  Bell,
} from "lucide-react";

// Pre-filled Relocation Checklist from template
const relocationChecklist = {
  phases: [
    {
      name: "Phase 1: Legal & Administrative Prep",
      icon: FileText,
      color: "bg-ocean-blue",
      items: [
        { id: "1", task: "Verify Passport & Visa Status", description: "Ensure your passport is valid for at least 6-12 months beyond your arrival date. Secure the correct work or residency visa before booking travel." },
        { id: "2", task: "Gather Essential Documents", description: "Create a 'relocation file' containing birth/marriage certificates, degree transcripts, and professional certifications. Get these documents apostilled or legalized if required." },
        { id: "3", task: "Secure a Work Permit", description: "If you don't have a job yet, research whether your visa allows full-time employment or has hourly restrictions." },
        { id: "4", task: "Obtain an International Driving Permit (IDP)", description: "Apply for an IDP while still in your home country; it's often easier than obtaining one from abroad." },
        { id: "5", task: "Notify Official Agencies", description: "Inform your tax office (e.g., HMRC or IRS), postal service, and local council about your move." },
      ],
    },
    {
      name: "Phase 2: Finance & Healthcare",
      icon: Banknote,
      color: "bg-savanna-green",
      items: [
        { id: "6", task: "Establish International Banking", description: "Open a multi-currency account like Wise or Revolut for low-fee transfers." },
        { id: "7", task: "Notify Your Current Bank", description: "Inform them of your move to prevent fraud alerts and account freezes." },
        { id: "8", task: "Create a Relocation Budget", description: "Factor in flights, shipping, visa fees, and a 5%-15% buffer for unexpected arrival costs." },
        { id: "9", task: "Research Tax Obligations", description: "Understand how you will be taxed in both your home and host countries to avoid double taxation." },
        { id: "10", task: "Secure Health Insurance", description: "Determine if you qualify for public healthcare or need private expat medical insurance." },
        { id: "11", task: "Visit Your Doctors", description: "Complete check-ups, dental exams, and vaccinations. Get physical copies of your medical records and generic names for prescriptions." },
      ],
    },
    {
      name: "Phase 3: Logistics & Belongings",
      icon: Truck,
      color: "bg-sunset-orange",
      items: [
        { id: "12", task: "Declutter and Downsize", description: "Sell or donate items you don't need. Shipping costs are typically based on volume or weight." },
        { id: "13", task: "Hire International Movers", description: "Get quotes from at least three licensed movers at least three months in advance." },
        { id: "14", task: "Arrange Housing", description: "Book 1-3 months of temporary housing (like Airbnb) to scout neighborhoods in person before signing a long-term lease." },
        { id: "15", task: "Manage Your Current Home", description: "Finalize plans to sell, rent out, or terminate the lease on your current residence." },
        { id: "16", task: "Prep Your Tech", description: "Unlock your mobile phone for local SIMs and change 2-factor authentication (2FA) to email instead of a phone number before you lose access to your old number." },
      ],
    },
    {
      name: "Phase 4: Final Countdown & Arrival",
      icon: Bell,
      color: "bg-kente-red",
      items: [
        { id: "17", task: "Pet Relocation", description: "If moving with pets, start the process 4-6 months early to handle vaccinations, blood tests, and travel permits." },
        { id: "18", task: "Cancel Subscriptions", description: "Terminate local gym memberships, utilities, and region-locked services like cable or local Amazon Prime accounts." },
        { id: "19", task: "Setup a Virtual Mailbox", description: "Use a service like Anytime Mailbox to receive and scan physical mail sent to your home country." },
        { id: "20", task: "Register with Local Authorities", description: "Upon arrival, register your address and apply for a local tax ID or residency permit immediately to avoid fines." },
      ],
    },
  ],
};

const financeAppChecklist = {
  phases: [
    {
      name: "Phase 1: Business Setup",
      icon: Briefcase,
      color: "bg-ocean-blue",
      items: [
        { id: "21", task: "Register Your Business", description: "Choose the right business structure and register your business with the relevant authorities." },
        { id: "22", task: "Obtain Necessary Licenses", description: "Research and obtain any licenses or permits required for your business in the new country." },
        { id: "23", task: "Set Up Bank Accounts", description: "Open local bank accounts for business transactions and consider international accounts for cross-border payments." },
        { id: "24", task: "Hire Local Staff", description: "Recruit and hire local staff to understand the local market and culture." },
        { id: "25", task: "Secure Office Space", description: "Find and lease office space that meets your business needs." },
      ],
    },
    {
      name: "Phase 2: Marketing & Branding",
      icon: Heart,
      color: "bg-savanna-green",
      items: [
        { id: "26", task: "Develop Your Brand", description: "Create a strong brand identity that resonates with the local market." },
        { id: "27", task: "Localize Your Marketing", description: "Adapt your marketing strategies to suit the local language and culture." },
        { id: "28", task: "Build Local Partnerships", description: "Establish relationships with local suppliers, partners, and customers." },
        { id: "29", task: "Create Local Content", description: "Produce content that speaks to the local audience, such as blog posts, videos, and social media updates." },
        { id: "30", task: "Attend Local Events", description: "Participate in local business events and networking opportunities to increase visibility." },
      ],
    },
    {
      name: "Phase 3: Operations & Logistics",
      icon: Truck,
      color: "bg-sunset-orange",
      items: [
        { id: "31", task: "Set Up Supply Chain", description: "Establish a reliable supply chain to ensure smooth operations." },
        { id: "32", task: "Manage Inventory", description: "Implement inventory management systems to track stock levels and minimize waste." },
        { id: "33", task: "Optimize Logistics", description: "Use local logistics providers to reduce costs and improve delivery times." },
        { id: "34", task: "Compliance with Local Regulations", description: "Ensure your business complies with all local laws and regulations." },
        { id: "35", task: "Set Up Customer Support", description: "Provide local customer support to handle inquiries and issues efficiently." },
      ],
    },
    {
      name: "Phase 4: Expansion & Growth",
      icon: Bell,
      color: "bg-kente-red",
      items: [
        { id: "36", task: "Expand Your Product Range", description: "Introduce new products or services that cater to the local market." },
        { id: "37", task: "Increase Local Presence", description: "Consider opening new locations or expanding your online presence to reach more customers." },
        { id: "38", task: "Monitor Market Trends", description: "Stay informed about local market trends and consumer preferences." },
        { id: "39", task: "Engage with Local Community", description: "Build relationships with the local community to foster trust and support." },
        { id: "40", task: "Plan for Future Growth", description: "Develop strategies for long-term growth and sustainability in the new market." },
      ],
    },
  ],
};

const clientTypes = [
  {
    id: "traveler",
    name: "Traveler",
    icon: Plane,
    description: "Short-term visits, tourism, or business trips (up to 90 days)",
    color: "bg-ocean-blue",
  },
  {
    id: "expat",
    name: "Relocating Expat",
    icon: Home,
    description: "Long-term relocation, employment, or permanent move",
    color: "bg-kente-red",
  },
  {
    id: "nomad",
    name: "Digital Nomad",
    icon: Laptop,
    description: "Remote work while traveling, flexible stays (1-6 months)",
    color: "bg-savanna-green",
  },
];

export default function ChecklistPage() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({});
  
  // AI Generation states
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [clientType, setClientType] = useState<string | null>(null);
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [aiChecklist, setAiChecklist] = useState<MovingChecklist | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Auth states
  const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("relocation"); // Declare activeTab variable

  useEffect(() => {
    const checkSubscription = async () => {
      const supabase = createBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserId(user.id);
        const { data: profile } = await supabase
          .from('profiles')
          .select('subscription_tier')
          .eq('id', user.id)
          .single();
        
        setSubscriptionPlan(profile?.subscription_tier || 'explorer');
        
        // Load saved progress from localStorage for now
        const saved = localStorage.getItem(`checklist-progress-${user.id}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          setCompletedItems(new Set(parsed.completed || []));
          setCustomNotes(parsed.notes || {});
        }
      } else {
        setSubscriptionPlan(null);
      }
      setIsCheckingAuth(false);
    };
    
    checkSubscription();
  }, []);

  const isPaidUser = subscriptionPlan === 'voyager' || subscriptionPlan === 'pioneer';

  const toggleItem = (itemId: string) => {
    if (!isPaidUser) return; // Only paid users can check items
    
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId);
    } else {
      newCompleted.add(itemId);
    }
    setCompletedItems(newCompleted);
    
    // Auto-save for paid users
    if (userId) {
      localStorage.setItem(`checklist-progress-${userId}`, JSON.stringify({
        completed: Array.from(newCompleted),
        notes: customNotes,
      }));
    }
  };

  const saveNote = (itemId: string, note: string) => {
    if (!isPaidUser) return;
    
    const newNotes = { ...customNotes, [itemId]: note };
    setCustomNotes(newNotes);
    setEditingItem(null);
    
    if (userId) {
      localStorage.setItem(`checklist-progress-${userId}`, JSON.stringify({
        completed: Array.from(completedItems),
        notes: newNotes,
      }));
    }
  };

  const handleGenerateAI = async () => {
    if (!clientType || !destination || !duration) return;
    
    setIsLoading(true);
    try {
      const country = countries.find(c => c.code === destination);
      const result = await generateMovingChecklist({
        clientType: clientType as "traveler" | "relocating-expat" | "digital-nomad",
        destination: country?.name || destination,
        duration,
        departureDate: departureDate || undefined,
      });
      setAiChecklist(result);
    } catch (error) {
      console.error("Error generating checklist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentChecklist = activeTab === "relocation" ? relocationChecklist : financeAppChecklist;
  const totalItems = currentChecklist.phases.reduce((acc, phase) => acc + phase.items.length, 0);
  const completedCount = currentChecklist.phases.reduce((acc, phase) => 
    acc + phase.items.filter(item => completedItems.has(item.id)).length, 0
  );
  const progressPercent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-safari-gold/10 to-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Moving Abroad <span className="text-safari-gold">Checklist</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive checklists for relocating to Africa or building your Africa-focused business.
            {!isPaidUser && " Upgrade to track progress, add notes, and generate AI-powered custom checklists."}
          </p>
        </div>
      </section>

      <main className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          {/* Checklist Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-safari-gold/10 rounded-xl">
                  <Home className="w-6 h-6 text-safari-gold" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold">Relocation Checklist</h2>
                  <p className="text-sm text-muted-foreground">Your complete guide to moving to Africa</p>
                </div>
              </div>
              
              {/* AI Generator Button - Paid Feature */}
              {isPaidUser ? (
                <Button 
                  onClick={() => setShowAIGenerator(!showAIGenerator)}
                  className="bg-gradient-to-r from-safari-gold to-sunset-orange text-ebony"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Custom Checklist
                </Button>
              ) : (
                <Button asChild variant="outline" className="bg-transparent border-safari-gold/50 text-safari-gold">
                  <Link href="/pricing">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade for AI Checklists
                  </Link>
                </Button>
              )}
            </div>

            {/* AI Generator Panel (Paid Users Only) */}
            {showAIGenerator && isPaidUser && (
              <div className="bg-gradient-to-br from-safari-gold/10 via-sunset-orange/5 to-background rounded-2xl border border-safari-gold/20 p-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
                <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-safari-gold" />
                  AI-Powered Custom Checklist
                </h3>
                
                {!aiChecklist || !aiChecklist.categories ? (
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label className="mb-2 block">Journey Type</Label>
                      <Select value={clientType || ""} onValueChange={setClientType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {clientTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block">Destination</Label>
                      <Select value={destination} onValueChange={setDestination}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.flagEmoji} {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block">Duration</Label>
                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                          <SelectItem value="1-3 months">1-3 months</SelectItem>
                          <SelectItem value="3-6 months">3-6 months</SelectItem>
                          <SelectItem value="6-12 months">6-12 months</SelectItem>
                          <SelectItem value="1-2 years">1-2 years</SelectItem>
                          <SelectItem value="Permanent">Permanent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={handleGenerateAI}
                        disabled={!clientType || !destination || !duration || isLoading}
                        className="w-full bg-safari-gold hover:bg-safari-gold/90 text-ebony"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{aiChecklist.title}</h4>
                        <p className="text-sm text-muted-foreground">{aiChecklist.destination} - {aiChecklist.duration}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setAiChecklist(null)} className="bg-transparent">
                        Generate New
                      </Button>
                    </div>
                    {aiChecklist.categories.map((cat, i) => (
                      <div key={i} className="bg-card rounded-lg p-4 border">
                        <h5 className="font-medium mb-2">{cat.name}</h5>
                        <ul className="space-y-2">
                          {cat.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-savanna-green mt-0.5 shrink-0" />
                              <span>{item.task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Progress Bar */}
            <div className="bg-card rounded-xl border p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Your Progress</span>
                <span className="text-sm text-muted-foreground">
                  {isPaidUser ? (
                    <>{completedCount} of {totalItems} tasks ({progressPercent}%)</>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Upgrade to track progress
                    </span>
                  )}
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${isPaidUser ? 'bg-safari-gold' : 'bg-muted-foreground/30'}`}
                  style={{ width: isPaidUser ? `${progressPercent}%` : '0%' }}
                />
              </div>
            </div>

            {/* Tabs Component */}
            <Tabs defaultValue="relocation" className="mt-0" onValueChange={setActiveTab}>
              {/* Relocation Checklist */}
              <TabsList className="mb-4">
                <TabsTrigger value="relocation">Relocation</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>
              <TabsContent value="relocation">
                <div className="space-y-6">
                  {relocationChecklist.phases.map((phase, phaseIndex) => {
                    const PhaseIcon = phase.icon;
                    const phaseCompleted = phase.items.filter(item => completedItems.has(item.id)).length;
                    
                    return (
                      <div key={phaseIndex} className="bg-card rounded-xl border overflow-hidden">
                        <div className="p-4 bg-muted/30 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${phase.color} rounded-lg flex items-center justify-center`}>
                              <PhaseIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{phase.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {isPaidUser ? `${phaseCompleted} of ${phase.items.length} complete` : `${phase.items.length} tasks`}
                              </p>
                            </div>
                          </div>
                          {isPaidUser && (
                            <Badge variant={phaseCompleted === phase.items.length ? "default" : "outline"} className={phaseCompleted === phase.items.length ? "bg-savanna-green" : "bg-transparent"}>
                              {phaseCompleted === phase.items.length ? "Complete" : "In Progress"}
                            </Badge>
                          )}
                        </div>
                        <div className="divide-y divide-border">
                          {phase.items.map((item) => {
                            const isCompleted = completedItems.has(item.id);
                            const isEditing = editingItem === item.id;
                            
                            return (
                              <div
                                key={item.id}
                                className={`p-4 transition-colors ${
                                  isCompleted ? "bg-savanna-green/5" : ""
                                } ${isPaidUser ? "hover:bg-muted/30 cursor-pointer" : ""}`}
                                onClick={() => !isEditing && toggleItem(item.id)}
                              >
                                <div className="flex gap-4">
                                  <div className="pt-0.5">
                                    {isPaidUser ? (
                                      isCompleted ? (
                                        <CheckCircle2 className="w-5 h-5 text-savanna-green" />
                                      ) : (
                                        <Circle className="w-5 h-5 text-muted-foreground" />
                                      )
                                    ) : (
                                      <Circle className="w-5 h-5 text-muted-foreground/50" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <h4 className={`font-medium ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                                        {item.task}
                                      </h4>
                                      {isPaidUser && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="shrink-0 h-6 px-2"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingItem(isEditing ? null : item.id);
                                          }}
                                        >
                                          <Edit3 className="w-3 h-3" />
                                        </Button>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {item.description}
                                    </p>
                                    
                                    {/* Custom Notes Section (Paid Only) */}
                                    {isPaidUser && isEditing && (
                                      <div className="mt-3 space-y-2" onClick={(e) => e.stopPropagation()}>
                                        <Label className="text-xs">Your Notes</Label>
                                        <textarea
                                          className="w-full p-2 text-sm border rounded-md resize-none"
                                          rows={2}
                                          placeholder="Add your personal notes..."
                                          defaultValue={customNotes[item.id] || ""}
                                          onBlur={(e) => saveNote(item.id, e.target.value)}
                                        />
                                      </div>
                                    )}
                                    
                                    {isPaidUser && customNotes[item.id] && !isEditing && (
                                      <div className="mt-2 p-2 bg-safari-gold/10 rounded text-xs text-safari-gold">
                                        Note: {customNotes[item.id]}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Finance App Checklist */}
              <TabsContent value="business">
                <div className="space-y-6">
                  {financeAppChecklist.phases.map((phase, phaseIndex) => {
                    const PhaseIcon = phase.icon;
                    const phaseCompleted = phase.items.filter(item => completedItems.has(item.id)).length;
                    
                    return (
                      <div key={phaseIndex} className="bg-card rounded-xl border overflow-hidden">
                        <div className="p-4 bg-muted/30 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${phase.color} rounded-lg flex items-center justify-center`}>
                              <PhaseIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{phase.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {isPaidUser ? `${phaseCompleted} of ${phase.items.length} complete` : `${phase.items.length} tasks`}
                              </p>
                            </div>
                          </div>
                          {isPaidUser && (
                            <Badge variant={phaseCompleted === phase.items.length ? "default" : "outline"} className={phaseCompleted === phase.items.length ? "bg-savanna-green" : "bg-transparent"}>
                              {phaseCompleted === phase.items.length ? "Complete" : "In Progress"}
                            </Badge>
                          )}
                        </div>
                        <div className="divide-y divide-border">
                          {phase.items.map((item) => {
                            const isCompleted = completedItems.has(item.id);
                            const isEditing = editingItem === item.id;
                            
                            return (
                              <div
                                key={item.id}
                                className={`p-4 transition-colors ${
                                  isCompleted ? "bg-savanna-green/5" : ""
                                } ${isPaidUser ? "hover:bg-muted/30 cursor-pointer" : ""}`}
                                onClick={() => !isEditing && toggleItem(item.id)}
                              >
                                <div className="flex gap-4">
                                  <div className="pt-0.5">
                                    {isPaidUser ? (
                                      isCompleted ? (
                                        <CheckCircle2 className="w-5 h-5 text-savanna-green" />
                                      ) : (
                                        <Circle className="w-5 h-5 text-muted-foreground" />
                                      )
                                    ) : (
                                      <Circle className="w-5 h-5 text-muted-foreground/50" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <h4 className={`font-medium ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                                        {item.task}
                                      </h4>
                                      {isPaidUser && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="shrink-0 h-6 px-2"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingItem(isEditing ? null : item.id);
                                          }}
                                        >
                                          <Edit3 className="w-3 h-3" />
                                        </Button>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {item.description}
                                    </p>
                                    
                                    {isPaidUser && isEditing && (
                                      <div className="mt-3 space-y-2" onClick={(e) => e.stopPropagation()}>
                                        <Label className="text-xs">Your Notes</Label>
                                        <textarea
                                          className="w-full p-2 text-sm border rounded-md resize-none"
                                          rows={2}
                                          placeholder="Add your personal notes..."
                                          defaultValue={customNotes[item.id] || ""}
                                          onBlur={(e) => saveNote(item.id, e.target.value)}
                                        />
                                      </div>
                                    )}
                                    
                                    {isPaidUser && customNotes[item.id] && !isEditing && (
                                      <div className="mt-2 p-2 bg-safari-gold/10 rounded text-xs text-safari-gold">
                                        Note: {customNotes[item.id]}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

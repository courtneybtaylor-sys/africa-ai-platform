import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Share2, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const blogPosts: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}> = {
  "top-10-african-destinations-2026": {
    title: "Top 10 African Destinations for 2026",
    excerpt: "From the ancient pyramids of Egypt to the wildlife-rich plains of Tanzania, discover the must-visit destinations.",
    category: "Destinations",
    date: "2026-01-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=600&fit=crop",
    content: `
Africa continues to captivate travelers with its incredible diversity, from ancient wonders to modern cities, pristine beaches to dense jungles. Here are our top picks for 2026:

## 1. Morocco - Timeless Charm

Morocco offers an intoxicating blend of ancient medinas, stunning coastlines, and the dramatic Sahara Desert. Marrakech remains a perennial favorite, but don't miss Chefchaouen's blue streets and Fes's medieval architecture.

**Best time to visit:** March-May or September-November

## 2. Tanzania - Safari Paradise

Home to the Serengeti and Ngorongoro Crater, Tanzania offers unparalleled wildlife viewing. Witness the Great Migration or climb Mount Kilimanjaro for the adventure of a lifetime.

**Best time to visit:** June-October (dry season)

## 3. Egypt - Ancient Wonders

The pyramids of Giza continue to awe visitors, but Egypt offers so much more: the temples of Luxor, diving in the Red Sea, and cruising the Nile.

**Best time to visit:** October-April

## 4. South Africa - Rainbow Nation

From Cape Town's stunning Table Mountain to Kruger National Park's Big Five, South Africa delivers diverse experiences. The wine regions and Garden Route add to its appeal.

**Best time to visit:** May-September

## 5. Rwanda - The Land of a Thousand Hills

Gorilla trekking in Volcanoes National Park is a bucket-list experience. Rwanda's remarkable transformation and commitment to conservation make it increasingly popular.

**Best time to visit:** June-September or December-February

## 6. Kenya - Classic Safari

Kenya pioneered African safaris and remains a top choice. The Masai Mara's wildlife, coastal beaches, and vibrant Nairobi offer something for everyone.

**Best time to visit:** July-October (migration season)

## 7. Namibia - Otherworldly Landscapes

From the towering dunes of Sossusvlei to the eerie Skeleton Coast, Namibia's landscapes feel like another planet. It's also Africa's best stargazing destination.

**Best time to visit:** May-October

## 8. Ethiopia - Cradle of Civilization

Ethiopia's ancient churches, unique cuisine, and the Danakil Depression offer experiences found nowhere else on Earth. The rock-hewn churches of Lalibela are extraordinary.

**Best time to visit:** October-March

## 9. Botswana - Premium Safari

The Okavango Delta offers some of Africa's finest (and most exclusive) safari experiences. Chobe National Park has the continent's largest elephant population.

**Best time to visit:** May-October

## 10. Ghana - West African Gem

Ghana's warm hospitality, rich history, and beautiful coastline make it an emerging destination. Cape Coast's castles offer important historical context.

**Best time to visit:** November-March

---

*Ready to plan your African adventure? Use our AI Trip Planner to create a personalized itinerary for any of these amazing destinations.*
    `
  },
  "digital-nomad-guide-africa": {
    title: "The Ultimate Digital Nomad Guide to Africa",
    excerpt: "Explore the best cities for remote work across Africa.",
    category: "Digital Nomads",
    date: "2026-01-10",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop",
    content: `
Africa is emerging as an exciting frontier for digital nomads. With improving infrastructure, affordable living costs, and unique experiences, here's your guide to working remotely across the continent.

## Top Cities for Digital Nomads

### Cape Town, South Africa

**WiFi Speed:** 50-100 Mbps average
**Cost of Living:** $1,500-2,500/month
**Visa:** 90-day visa-free for many nationalities

Cape Town consistently ranks as Africa's best digital nomad destination. World-class coworking spaces, reliable internet, and stunning scenery make it a top choice.

### Nairobi, Kenya

**WiFi Speed:** 20-50 Mbps average  
**Cost of Living:** $1,000-1,800/month
**Visa:** eVisa available

Kenya's tech hub offers a vibrant startup ecosystem. iHub and Nairobi Garage provide excellent coworking options.

### Kigali, Rwanda

**WiFi Speed:** 15-40 Mbps average
**Cost of Living:** $800-1,400/month
**Visa:** 30-day visa on arrival

Africa's cleanest city is also one of its safest. Rwanda's tech-forward government makes Kigali increasingly nomad-friendly.

### Marrakech, Morocco

**WiFi Speed:** 20-40 Mbps average
**Cost of Living:** $1,000-1,600/month
**Visa:** 90-day visa-free for many nationalities

Combine ancient medina exploration with rooftop coworking. Morocco's digital nomad visa makes longer stays possible.

## Practical Tips

1. **Always have a backup connection** - Mobile data SIMs are affordable across most of Africa
2. **Join local expat/nomad communities** - Facebook groups are active in most major cities
3. **Consider time zones** - Many African countries align well with European business hours
4. **Health insurance is essential** - Ensure you have coverage that works across the continent

---

*Use our Cost Calculator to compare living expenses across African cities.*
    `
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];
  
  if (!post) {
    return { title: "Post Not Found" };
  }
  
  return {
    title: `${post.title} | Africa AI Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <Badge variant="outline" className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 mb-8">
          <Button variant="outline" size="sm" className="bg-transparent">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            <BookmarkPlus className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.content.split('\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={i} className="text-xl font-semibold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return <p key={i} className="font-semibold">{paragraph.replace(/\*\*/g, '')}</p>;
            }
            if (paragraph.startsWith('---')) {
              return <hr key={i} className="my-8 border-border" />;
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ')) {
              return <p key={i} className="ml-4">{paragraph}</p>;
            }
            if (paragraph.trim() === '') {
              return null;
            }
            return <p key={i} className="mb-4 text-muted-foreground">{paragraph}</p>;
          })}
        </div>

        {/* CTA */}
        <Card className="mt-12 bg-gradient-to-r from-safari-gold/10 to-sunset-orange/10">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to Explore Africa?</h3>
            <p className="text-muted-foreground mb-4">
              Let our AI help you plan your perfect African adventure
            </p>
            <Link href="/planner">
              <Button className="bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                Start Planning Your Trip
              </Button>
            </Link>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}

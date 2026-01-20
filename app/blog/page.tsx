import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    slug: "top-10-african-destinations-2026",
    title: "Top 10 African Destinations for 2026",
    excerpt: "From the ancient pyramids of Egypt to the wildlife-rich plains of Tanzania, discover the must-visit destinations that should be on every traveler's bucket list this year.",
    category: "Destinations",
    date: "2026-01-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=400&fit=crop",
    featured: true,
  },
  {
    slug: "digital-nomad-guide-africa",
    title: "The Ultimate Digital Nomad Guide to Africa",
    excerpt: "Explore the best cities for remote work across Africa, with insights on WiFi speeds, cost of living, coworking spaces, and visa-friendly policies.",
    category: "Digital Nomads",
    date: "2026-01-10",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
    featured: true,
  },
  {
    slug: "african-cuisine-guide",
    title: "A Culinary Journey: African Cuisine Guide",
    excerpt: "From Ethiopian injera to South African braai, explore the diverse and delicious food cultures across the African continent.",
    category: "Culture",
    date: "2026-01-05",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&h=400&fit=crop",
    featured: false,
  },
  {
    slug: "safari-planning-tips",
    title: "First-Time Safari? Everything You Need to Know",
    excerpt: "A comprehensive guide to planning your first African safari, including best times to visit, what to pack, and how to choose the right tour operator.",
    category: "Travel Tips",
    date: "2025-12-28",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&h=400&fit=crop",
    featured: false,
  },
  {
    slug: "sustainable-travel-africa",
    title: "Sustainable Travel in Africa: A Responsible Guide",
    excerpt: "How to minimize your environmental impact while maximizing positive contributions to local communities during your African travels.",
    category: "Responsible Travel",
    date: "2025-12-20",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=400&fit=crop",
    featured: false,
  },
  {
    slug: "african-festivals-calendar",
    title: "African Festivals: A 2026 Calendar",
    excerpt: "Plan your trip around Africa's most vibrant festivals, from the Carnival in Cape Verde to the Festival au Desert in Mali.",
    category: "Events",
    date: "2025-12-15",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1533137098665-47ca60257f94?w=800&h=400&fit=crop",
    featured: false,
  },
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-safari-gold/10 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-safari-gold" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Africa AI Blog</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Travel tips, destination guides, and insights for exploring the African continent
          </p>
        </div>

        {/* Featured Posts */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {featuredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-safari-gold text-ebony">
                    Featured
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-safari-gold transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-safari-gold font-medium group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Regular Posts */}
        <h2 className="text-xl font-semibold mb-6">Recent Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                  <CardTitle className="text-base group-hover:text-safari-gold transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-safari-gold/10 to-sunset-orange/10 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Get the latest travel tips, destination guides, and exclusive offers delivered to your inbox
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border bg-background"
            />
            <button className="px-6 py-2 bg-safari-gold hover:bg-safari-gold/90 text-ebony font-medium rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

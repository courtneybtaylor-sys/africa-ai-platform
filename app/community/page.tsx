"use client";

export const dynamic = 'force-dynamic';

import React from "react"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  MessageCircle,
  Search,
  Plus,
  MapPin,
  Calendar,
  Heart,
  Eye,
  Pin,
  Lock,
  Crown,
  X,
  Loader2,
} from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";
import { useForum, type ForumCategory, type ForumPost } from "@/hooks/use-forum";

const forumCategories = [
  { id: "general" as ForumCategory, name: "General Discussion", icon: MessageSquare, color: "bg-ocean-blue" },
  { id: "relocation" as ForumCategory, name: "Relocation Stories", icon: MapPin, color: "bg-savanna-green" },
  { id: "visa" as ForumCategory, name: "Visa & Immigration", icon: Calendar, color: "bg-sunset-orange" },
  { id: "business" as ForumCategory, name: "Business & Opportunities", icon: TrendingUp, color: "bg-safari-gold" },
  { id: "culture" as ForumCategory, name: "Culture & Language", icon: Users, color: "bg-kente-red" },
  { id: "travel" as ForumCategory, name: "Travel Tips", icon: MapPin, color: "bg-ocean-blue" },
];

const upcomingEvents = [
  { title: "Cape Town Minstrel Carnival", date: "Jan 1-2, 2026", location: "Cape Town, South Africa", type: "Cultural" },
  { title: "Timkat (Ethiopian Epiphany)", date: "Jan 19, 2026", location: "Gondar & Lalibela, Ethiopia", type: "Religious" },
  { title: "Fes Festival of World Sacred Music", date: "Jun 5-13, 2026", location: "Fes, Morocco", type: "Music" },
  { title: "Festival au Désert", date: "Jan 9-11, 2026", location: "Timbuktu, Mali", type: "Music" },
  { title: "Sauti za Busara", date: "Feb 12-15, 2026", location: "Stone Town, Zanzibar", type: "Music" },
  { title: "Cape Town Jazz Festival", date: "Mar 27-28, 2026", location: "Cape Town, South Africa", type: "Jazz" },
  { title: "Afrochella/Afrofuture", date: "Dec 28-29, 2026", location: "Accra, Ghana", type: "Music" },
  { title: "Lake of Stars Festival", date: "Sep 25-27, 2026", location: "Lake Malawi, Malawi", type: "Music" },
  { title: "Durbar Festival", date: "Mar (varies)", location: "Kano, Nigeria", type: "Cultural" },
  { title: "Ouidah Voodoo Festival", date: "Jan 10, 2026", location: "Ouidah, Benin", type: "Traditional" },
];

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function CreatePostModal({ 
  isOpen, 
  onClose, 
  onSubmit 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (title: string, content: string, category: ForumCategory) => Promise<ForumPost | null>;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<ForumCategory>("general");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setIsSubmitting(true);
    await onSubmit(title, content, category);
    setIsSubmitting(false);
    setTitle("");
    setContent("");
    setCategory("general");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-serif text-xl font-bold">Create Post</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's on your mind?"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as ForumCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {forumCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, questions, or experiences..."
              rows={5}
              required
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="bg-transparent">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="bg-safari-gold hover:bg-safari-gold/90 text-ebony"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const { posts, isLoading, isLoggedIn, createPost, likePost, fetchPosts } = useForum();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ForumCategory | null>(null);
  const [isPaidMember, setIsPaidMember] = useState(false);
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("subscription_tier")
          .eq("id", user.id)
          .single();
        
        if (profile && (profile.subscription_tier === "voyager" || profile.subscription_tier === "pioneer")) {
          setIsPaidMember(true);
        }
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const handleCategoryFilter = (category: ForumCategory | null) => {
    setSelectedCategory(category);
    if (category) {
      fetchPosts(category);
    } else {
      fetchPosts();
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const PostButton = ({ className = "" }: { className?: string }) => {
    if (isCheckingAuth) {
      return <Button disabled className={className}><Loader2 className="w-4 h-4 animate-spin" /></Button>;
    }
    
    if (!isLoggedIn) {
      return (
        <Button asChild className={`bg-safari-gold hover:bg-safari-gold/90 text-ebony ${className}`}>
          <Link href="/auth">
            <Lock className="w-4 h-4 mr-2" />
            Sign In to Post
          </Link>
        </Button>
      );
    }
    
    if (!isPaidMember) {
      return (
        <Button asChild className={`bg-safari-gold hover:bg-safari-gold/90 text-ebony ${className}`}>
          <Link href="/pricing">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Post
          </Link>
        </Button>
      );
    }
    
    return (
      <Button 
        onClick={() => setShowNewPostDialog(true)}
        className={`bg-safari-gold hover:bg-safari-gold/90 text-ebony ${className}`}
      >
        <Plus className="w-4 h-4 mr-2" />
        New Post
      </Button>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ebony via-ebony to-ocean-blue/20 text-white py-16 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="bg-safari-gold/20 text-safari-gold border-safari-gold/30 mb-4">
              Members Community
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
              Connect with the African Diaspora
            </h1>
            <p className="text-xl text-gray-300 mb-8 text-pretty">
              Join thousands of members sharing experiences, advice, and opportunities across Africa.
            </p>
            <div className="flex flex-wrap gap-4">
              <PostButton />
              {isLoggedIn && (
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <Link href="/dashboard">
                    <Users className="w-4 h-4 mr-2" />
                    My Dashboard
                  </Link>
                </Button>
              )}
            </div>
            
            {!isPaidMember && !isCheckingAuth && (
              <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
                <Crown className="w-5 h-5 text-safari-gold flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  <span className="text-safari-gold font-medium">Voyager or Pioneer members</span> can create posts and engage with the community. 
                  <Link href="/pricing" className="text-safari-gold hover:underline ml-1">Upgrade now</Link>
                </p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: "Active Members", value: "12,500+" },
              { label: "Discussions", value: posts.length > 0 ? `${posts.length}` : "0" },
              { label: "Countries Represented", value: "54" },
              { label: "Success Stories", value: "1,200+" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-safari-gold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Categories */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <button
                    onClick={() => handleCategoryFilter(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !selectedCategory ? "bg-safari-gold/10 text-safari-gold" : "hover:bg-muted"
                    }`}
                  >
                    All Discussions
                  </button>
                  {forumCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryFilter(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                        selectedCategory === category.id ? "bg-safari-gold/10 text-safari-gold" : "hover:bg-muted"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <category.icon className="w-4 h-4" />
                        {category.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {posts.filter(p => p.category === category.id).length}
                      </span>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events - 2026 African Festivals */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-safari-gold" />
                    2026 African Festivals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                  {upcomingEvents.map((event) => (
                    <div key={event.title} className="border-l-2 border-safari-gold pl-3 py-2 hover:bg-muted/50 rounded-r-lg transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-tight">{event.title}</p>
                        <Badge variant="outline" className="text-xs shrink-0 bg-transparent">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </p>
                      <p className="text-xs text-safari-gold flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </p>
                    </div>
                  ))}
                  <Link href="/" className="block text-center text-sm text-safari-gold hover:underline pt-2">
                    View all festivals →
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="recent" className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <TabsList>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                  </TabsList>
                  <PostButton />
                </div>

                <TabsContent value="recent" className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-safari-gold" />
                    </div>
                  ) : filteredPosts.length === 0 ? (
                    <Card className="p-8 text-center">
                      <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold text-lg mb-2">No discussions yet</h3>
                      <p className="text-muted-foreground mb-4">Be the first to start a conversation!</p>
                      {isPaidMember && (
                        <Button onClick={() => setShowNewPostDialog(true)} className="bg-safari-gold text-ebony">
                          Create Post
                        </Button>
                      )}
                    </Card>
                  ) : (
                    filteredPosts.map((post) => {
                      const category = forumCategories.find(c => c.id === post.category);
                      return (
                        <Card key={post.id} className={`transition-all hover:shadow-md ${post.is_pinned ? "border-safari-gold/30" : ""}`}>
                          <CardContent className="p-5">
                            <div className="flex gap-4">
                              <Avatar className="w-10 h-10 flex-shrink-0">
                                <AvatarFallback className="bg-safari-gold/10 text-safari-gold">
                                  {(post.author?.full_name || "A").split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <div>
                                    {post.is_pinned && (
                                      <Badge variant="secondary" className="mb-2 bg-safari-gold/10 text-safari-gold">
                                        <Pin className="w-3 h-3 mr-1" />
                                        Pinned
                                      </Badge>
                                    )}
                                    <Link href={`/community/post/${post.id}`}>
                                      <h3 className="font-semibold text-lg hover:text-safari-gold cursor-pointer transition-colors">
                                        {post.title}
                                      </h3>
                                    </Link>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 flex-wrap">
                                  <span className="font-medium text-foreground">{post.author?.full_name || "Anonymous"}</span>
                                  <span>in</span>
                                  <Badge variant="outline" className="text-xs">
                                    {category?.name || post.category}
                                  </Badge>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatTimeAgo(post.created_at)}
                                  </span>
                                </div>
                                <p className="text-muted-foreground mb-4 line-clamp-2">{post.content}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <button 
                                    onClick={() => isLoggedIn && likePost(post.id)}
                                    className={`flex items-center gap-1 transition-colors ${post.user_liked ? "text-kente-red" : "hover:text-kente-red"} ${isLoggedIn ? "cursor-pointer" : "cursor-default"}`}
                                  >
                                    <Heart className={`w-4 h-4 ${post.user_liked ? "fill-current" : ""}`} />
                                    {post.likes_count}
                                  </button>
                                  <span className="flex items-center gap-1">
                                    <MessageCircle className="w-4 h-4" />
                                    {post.comments_count}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    {post.views_count}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </TabsContent>

                <TabsContent value="popular" className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-safari-gold" />
                    </div>
                  ) : (
                    [...filteredPosts]
                      .sort((a, b) => b.likes_count - a.likes_count)
                      .map((post) => {
                        const category = forumCategories.find(c => c.id === post.category);
                        return (
                          <Card key={post.id} className="transition-all hover:shadow-md">
                            <CardContent className="p-5">
                              <div className="flex gap-4">
                                <Avatar className="w-10 h-10 flex-shrink-0">
                                  <AvatarFallback className="bg-safari-gold/10 text-safari-gold">
                                    {(post.author?.full_name || "A").split(" ").map((n) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-lg hover:text-safari-gold cursor-pointer transition-colors mb-1">
                                    {post.title}
                                  </h3>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 flex-wrap">
                                    <span className="font-medium text-foreground">{post.author?.full_name || "Anonymous"}</span>
                                    <Badge variant="outline" className="text-xs">{category?.name}</Badge>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {formatTimeAgo(post.created_at)}
                                    </span>
                                  </div>
                                  <p className="text-muted-foreground mb-4 line-clamp-2">{post.content}</p>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <button 
                                      onClick={() => isLoggedIn && likePost(post.id)}
                                      className={`flex items-center gap-1 transition-colors ${post.user_liked ? "text-kente-red" : "hover:text-kente-red"}`}
                                    >
                                      <Heart className={`w-4 h-4 ${post.user_liked ? "fill-current" : ""}`} />
                                      {post.likes_count}
                                    </button>
                                    <span className="flex items-center gap-1">
                                      <MessageCircle className="w-4 h-4" />
                                      {post.comments_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Eye className="w-4 h-4" />
                                      {post.views_count}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <CreatePostModal
        isOpen={showNewPostDialog}
        onClose={() => setShowNewPostDialog(false)}
        onSubmit={createPost}
      />
      
      <Footer />
    </div>
  );
}

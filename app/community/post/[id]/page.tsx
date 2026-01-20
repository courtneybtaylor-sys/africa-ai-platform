"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createBrowserClient } from "@/lib/supabase/client";
import { useForumComments, type ForumPost, type ForumComment } from "@/hooks/use-forum";
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Eye,
  Calendar,
  User,
  Send,
  Loader2,
  Reply,
  MoreVertical,
  Flag,
  Share2,
  Bookmark,
} from "lucide-react";

const categoryColors: Record<string, string> = {
  general: "bg-gray-100 text-gray-700",
  relocation: "bg-savanna-green/20 text-savanna-green",
  visa: "bg-ocean-blue/20 text-ocean-blue",
  business: "bg-safari-gold/20 text-safari-gold",
  culture: "bg-kente-red/20 text-kente-red",
  travel: "bg-sunset-orange/20 text-sunset-orange",
};

export default function ForumPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  const [post, setPost] = useState<ForumPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  
  const { comments, isLoading: commentsLoading, addComment } = useForumComments(postId);
  const supabase = createBrowserClient();

  useEffect(() => {
    const fetchData = async () => {
      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data: profile } = await supabase
          .from("profiles")
          .select("subscription_tier")
          .eq("id", user.id)
          .single();
        setUserPlan(profile?.subscription_tier || "explorer");
        
        // Check if user liked
        const { data: like } = await supabase
          .from("post_likes")
          .select("id")
          .eq("user_id", user.id)
          .eq("post_id", postId)
          .single();
        setHasLiked(!!like);
      }

      // Fetch post
      const { data } = await supabase
        .from("forum_posts")
        .select(`
          *,
          author:profiles(full_name, avatar_url)
        `)
        .eq("id", postId)
        .single();

      if (data) {
        setPost(data);
        // Increment views
        await supabase.rpc("increment_post_views", { post_id: postId });
      }
      setIsLoading(false);
    };

    fetchData();
  }, [supabase, postId]);

  const handleLike = async () => {
    if (!userId || !post) return;

    if (hasLiked) {
      await supabase
        .from("post_likes")
        .delete()
        .eq("user_id", userId)
        .eq("post_id", postId);
      setHasLiked(false);
      setPost(prev => prev ? { ...prev, likes_count: prev.likes_count - 1 } : null);
    } else {
      await supabase
        .from("post_likes")
        .insert({ user_id: userId, post_id: postId });
      setHasLiked(true);
      setPost(prev => prev ? { ...prev, likes_count: prev.likes_count + 1 } : null);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !userId) return;
    
    const canPost = userPlan === "voyager" || userPlan === "pioneer";
    if (!canPost) {
      router.push("/pricing");
      return;
    }

    setIsSubmitting(true);
    const content = replyingTo 
      ? `@${replyingTo} ${newComment}` 
      : newComment;
    
    await addComment(content);
    setNewComment("");
    setReplyingTo(null);
    setIsSubmitting(false);
  };

  const canPost = userPlan === "voyager" || userPlan === "pioneer";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-safari-gold mx-auto" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <Link href="/community">
              <Button className="bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                Back to Community
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <Link href="/community" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Community
          </Link>

          {/* Post */}
          <Card className="mb-8">
            <CardContent className="p-6">
              {/* Category & Meta */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                {post.is_pinned && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-safari-gold/20 text-safari-gold">
                    Pinned
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
                {post.title}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                <div className="w-10 h-10 rounded-full bg-safari-gold/20 flex items-center justify-center">
                  {post.author?.avatar_url ? (
                    <img src={post.author.avatar_url || "/placeholder.svg"} alt="" className="w-10 h-10 rounded-full" />
                  ) : (
                    <User className="w-5 h-5 text-safari-gold" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{post.author?.full_name || "Anonymous"}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-stone max-w-none mb-6">
                <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={hasLiked ? "text-kente-red" : "text-muted-foreground"}
                  disabled={!userId}
                >
                  <Heart className={`w-4 h-4 mr-1 ${hasLiked ? "fill-current" : ""}`} />
                  {post.likes_count}
                </Button>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  {comments.length} comments
                </span>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views_count} views
                </span>
                <div className="ml-auto flex gap-2">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-bold">
              Comments ({comments.length})
            </h2>

            {/* Comment Input */}
            {userId ? (
              canPost ? (
                <Card>
                  <CardContent className="p-4">
                    {replyingTo && (
                      <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                        <Reply className="w-4 h-4" />
                        Replying to @{replyingTo}
                        <button 
                          type="button"
                          onClick={() => setReplyingTo(null)}
                          className="text-kente-red ml-2"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-safari-gold/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-safari-gold" />
                      </div>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Write a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[80px] resize-none mb-2"
                        />
                        <div className="flex justify-end">
                          <Button
                            onClick={handleSubmitComment}
                            disabled={!newComment.trim() || isSubmitting}
                            className="bg-safari-gold hover:bg-safari-gold/90 text-ebony"
                          >
                            {isSubmitting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2" />
                                Post Comment
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-safari-gold/10 border-safari-gold/20">
                  <CardContent className="p-4 text-center">
                    <p className="text-muted-foreground mb-2">
                      Upgrade to Voyager or Pioneer to join the conversation
                    </p>
                    <Link href="/pricing">
                      <Button className="bg-safari-gold hover:bg-safari-gold/90 text-ebony">
                        Upgrade Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            ) : (
              <Card className="bg-sand-beige/50">
                <CardContent className="p-4 text-center">
                  <p className="text-muted-foreground mb-2">
                    Sign in to join the conversation
                  </p>
                  <Link href="/auth">
                    <Button variant="outline" className="bg-transparent">
                      Sign In
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Comments List */}
            {commentsLoading ? (
              <div className="text-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-safari-gold mx-auto" />
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <CommentCard 
                    key={comment.id} 
                    comment={comment} 
                    onReply={(name) => setReplyingTo(name)}
                    canReply={canPost}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function CommentCard({ 
  comment, 
  onReply,
  canReply 
}: { 
  comment: ForumComment; 
  onReply: (name: string) => void;
  canReply: boolean;
}) {
  const authorName = comment.author?.full_name || "Anonymous";
  const isReply = comment.content.startsWith("@");

  return (
    <Card className={isReply ? "ml-8 border-l-2 border-safari-gold/30" : ""}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-ocean-blue/20 flex items-center justify-center flex-shrink-0">
            {comment.author?.avatar_url ? (
              <img src={comment.author.avatar_url || "/placeholder.svg"} alt="" className="w-8 h-8 rounded-full" />
            ) : (
              <User className="w-4 h-4 text-ocean-blue" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">{authorName}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(comment.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <p className="text-sm text-foreground whitespace-pre-wrap">{comment.content}</p>
            <div className="flex items-center gap-4 mt-2">
              <button 
                type="button" 
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <Heart className="w-3 h-3" />
                {comment.likes_count}
              </button>
              {canReply && (
                <button 
                  type="button"
                  onClick={() => onReply(authorName)}
                  className="text-xs text-muted-foreground hover:text-safari-gold flex items-center gap-1"
                >
                  <Reply className="w-3 h-3" />
                  Reply
                </button>
              )}
              <button type="button" className="text-xs text-muted-foreground hover:text-foreground">
                <Flag className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

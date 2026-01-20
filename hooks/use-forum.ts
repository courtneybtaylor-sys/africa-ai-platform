"use client";

import { useState, useEffect, useCallback } from "react";
import { createBrowserClient } from "@/lib/supabase/client";

export type ForumCategory = "general" | "relocation" | "visa" | "business" | "culture" | "travel";

export interface ForumPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: ForumCategory;
  likes_count: number;
  comments_count: number;
  views_count: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  author?: {
    full_name: string | null;
    avatar_url: string | null;
  };
  user_liked?: boolean;
}

export interface ForumComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  likes_count: number;
  created_at: string;
  author?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export function useForum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  
  const supabase = createBrowserClient();

  const fetchPosts = useCallback(async (category?: ForumCategory) => {
    setIsLoading(true);
    
    let query = supabase
      .from("forum_posts")
      .select(`
        *,
        author:profiles(full_name, avatar_url)
      `)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });
    
    if (category) {
      query = query.eq("category", category);
    }
    
    const { data } = await query.limit(50);
    
    if (data) {
      // Check which posts the user has liked
      if (userId) {
        const { data: likes } = await supabase
          .from("post_likes")
          .select("post_id")
          .eq("user_id", userId);
        
        const likedPostIds = new Set(likes?.map(l => l.post_id) || []);
        
        setPosts(data.map(post => ({
          ...post,
          user_liked: likedPostIds.has(post.id)
        })));
      } else {
        setPosts(data);
      }
    }
    
    setIsLoading(false);
  }, [supabase, userId]);

  useEffect(() => {
    let isMounted = true;
    
    const init = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (isMounted && user) {
          setUserId(user.id);
        }
        if (isMounted) {
          fetchPosts();
        }
      } catch {
        // Ignore abort errors during unmount
      }
    };
    init();
    
    return () => {
      isMounted = false;
    };
  }, [supabase, fetchPosts]);

  const createPost = useCallback(async (title: string, content: string, category: ForumCategory) => {
    if (!userId) return null;

    const { data, error } = await supabase
      .from("forum_posts")
      .insert({
        user_id: userId,
        title,
        content,
        category,
      })
      .select(`
        *,
        author:profiles(full_name, avatar_url)
      `)
      .single();

    if (!error && data) {
      setPosts(prev => [data, ...prev]);
      return data;
    }
    return null;
  }, [userId, supabase]);

  const likePost = useCallback(async (postId: string) => {
    if (!userId) return false;

    const post = posts.find(p => p.id === postId);
    if (!post) return false;

    if (post.user_liked) {
      // Unlike
      await supabase
        .from("post_likes")
        .delete()
        .eq("user_id", userId)
        .eq("post_id", postId);
      
      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? { ...p, likes_count: p.likes_count - 1, user_liked: false }
          : p
      ));
    } else {
      // Like
      await supabase
        .from("post_likes")
        .insert({ user_id: userId, post_id: postId });
      
      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? { ...p, likes_count: p.likes_count + 1, user_liked: true }
          : p
      ));
    }
    return true;
  }, [userId, posts, supabase]);

  const incrementViews = useCallback(async (postId: string) => {
    await supabase.rpc("increment_post_views", { post_id: postId });
  }, [supabase]);

  return {
    posts,
    isLoading,
    isLoggedIn: !!userId,
    userId,
    fetchPosts,
    createPost,
    likePost,
    incrementViews,
  };
}

export function useForumComments(postId: string) {
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  
  const supabase = createBrowserClient();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
      
      const { data } = await supabase
        .from("forum_comments")
        .select(`
          *,
          author:profiles(full_name, avatar_url)
        `)
        .eq("post_id", postId)
        .order("created_at", { ascending: true });
      
      setComments(data || []);
      setIsLoading(false);
    };
    init();
  }, [supabase, postId]);

  const addComment = useCallback(async (content: string) => {
    if (!userId) return null;

    const { data, error } = await supabase
      .from("forum_comments")
      .insert({
        user_id: userId,
        post_id: postId,
        content,
      })
      .select(`
        *,
        author:profiles(full_name, avatar_url)
      `)
      .single();

    if (!error && data) {
      setComments(prev => [...prev, data]);
      return data;
    }
    return null;
  }, [userId, postId, supabase]);

  return {
    comments,
    isLoading,
    isLoggedIn: !!userId,
    addComment,
  };
}

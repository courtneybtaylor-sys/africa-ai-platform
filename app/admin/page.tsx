"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Suspense } from "react";
import {
  Users,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Search,
  Loader2,
  Shield,
  Trash2,
  Pin,
  Eye,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Building2,
  Globe,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { createBrowserClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";

interface UserProfile {
  id: string;
  full_name: string | null;
  subscription_tier: string;
  is_admin: boolean;
  created_at: string;
}

interface ForumPostAdmin {
  id: string;
  title: string;
  content: string;
  category: string;
  is_pinned: boolean;
  likes_count: number;
  comments_count: number;
  views_count: number;
  created_at: string;
  author?: { full_name: string | null };
}

const Loading = () => null;

function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [posts, setPosts] = useState<ForumPostAdmin[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [businesses, setBusinesses] = useState<{ status: string; country: string; created_at: string }[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    paidUsers: 0,
    totalPosts: 0,
    totalBusinesses: 0,
    pendingBusinesses: 0,
    totalViews: 0,
  });

  const supabase = createBrowserClient();

  useEffect(() => {
    const checkAdminAndLoadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/auth");
        return;
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_tier, is_admin")
        .eq("id", user.id)
        .single();
      
      if (!profile || !profile.is_admin) {
        router.push("/dashboard");
        return;
      }

      setIsAdmin(true);

      // Load users
      const { data: usersData } = await supabase
        .from("profiles")
        .select("id, full_name, subscription_tier, is_admin, created_at")
        .order("created_at", { ascending: false });

      if (usersData) {
        setUsers(usersData);
        setStats(prev => ({
          ...prev,
          totalUsers: usersData.length,
          paidUsers: usersData.filter(u => u.subscription_tier !== "explorer").length,
        }));
      }

      // Load posts
      const { data: postsData } = await supabase
        .from("forum_posts")
        .select(`
          *,
          author:profiles(full_name)
        `)
        .order("created_at", { ascending: false });

      if (postsData) {
        setPosts(postsData);
        setStats(prev => ({
          ...prev,
          totalPosts: postsData.length,
          totalViews: postsData.reduce((sum, p) => sum + (p.views_count || 0), 0),
        }));
      }

      // Load businesses
      const { data: businessesData } = await supabase
        .from("businesses")
        .select("status, country, created_at")
        .order("created_at", { ascending: false });

      if (businessesData) {
        setBusinesses(businessesData);
        setStats(prev => ({
          ...prev,
          totalBusinesses: businessesData.length,
          pendingBusinesses: businessesData.filter(b => b.status === "pending").length,
        }));
      }

      setIsLoading(false);
    };

    checkAdminAndLoadData();
  }, [router, supabase]);

  const handleUpdateUserPlan = async (userId: string, newPlan: string) => {
    await supabase
      .from("profiles")
      .update({ subscription_tier: newPlan })
      .eq("id", userId);
    
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, subscription_tier: newPlan } : u
    ));
  };

  const handleTogglePin = async (postId: string, currentPinned: boolean) => {
    await supabase
      .from("forum_posts")
      .update({ is_pinned: !currentPinned })
      .eq("id", postId);
    
    setPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, is_pinned: !currentPinned } : p
    ));
  };

  const handleDeletePost = async (postId: string) => {
    await supabase
      .from("forum_posts")
      .delete()
      .eq("id", postId);
    
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-safari-gold" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-12 h-12 text-kente-red mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">
              You do not have permission to access the admin dashboard.
            </p>
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-safari-gold" />
              <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-muted-foreground">Manage users, content, and platform settings</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-safari-gold" />
                  <div>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-savanna-green" />
                  <div>
                    <p className="text-2xl font-bold">{stats.paidUsers}</p>
                    <p className="text-sm text-muted-foreground">Paid Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-ocean-blue" />
                  <div>
                    <p className="text-2xl font-bold">{stats.totalPosts}</p>
                    <p className="text-sm text-muted-foreground">Forum Posts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-sunset-orange" />
                  <div>
                    <p className="text-2xl font-bold">{stats.totalViews}</p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="users">
            <TabsList className="mb-6">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="posts">Forum Posts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage user accounts and subscriptions</CardDescription>
                  <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-safari-gold/20 text-safari-gold">
                                  {user.full_name?.[0]?.toUpperCase() || "U"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.full_name || "Unnamed"}</p>
                                <p className="text-xs text-muted-foreground">{user.id.slice(0, 8)}...</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={user.subscription_tier}
                              onValueChange={(value) => handleUpdateUserPlan(user.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="explorer">Explorer</SelectItem>
                                <SelectItem value="voyager">Voyager</SelectItem>
                                <SelectItem value="pioneer">Pioneer</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {user.is_admin ? (
                              <Badge className="bg-kente-red">Admin</Badge>
                            ) : (
                              <Badge variant="outline">User</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(user.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Posts Tab */}
            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <CardTitle>Forum Posts</CardTitle>
                  <CardDescription>Manage community forum content</CardDescription>
                </CardHeader>
                <CardContent>
                  {posts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No forum posts yet
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Post</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Stats</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {posts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell>
                              <div className="max-w-md">
                                <p className="font-medium flex items-center gap-2">
                                  {post.is_pinned && <Pin className="w-3 h-3 text-safari-gold" />}
                                  {post.title}
                                </p>
                                <p className="text-sm text-muted-foreground truncate">
                                  {post.content.slice(0, 100)}...
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{post.author?.full_name || "Unknown"}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{post.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span>{post.likes_count} likes</span>
                                <span>{post.views_count} views</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleTogglePin(post.id, post.is_pinned)}
                                  title={post.is_pinned ? "Unpin" : "Pin"}
                                >
                                  <Pin className={`w-4 h-4 ${post.is_pinned ? "text-safari-gold" : ""}`} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeletePost(post.id)}
                                  className="text-kente-red hover:text-kente-red"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              {/* Top Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-safari-gold/10 rounded-lg">
                        <Users className="w-5 h-5 text-safari-gold" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stats.totalUsers}</p>
                        <p className="text-xs text-muted-foreground">Total Users</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-savanna-green/10 rounded-lg">
                        <DollarSign className="w-5 h-5 text-savanna-green" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stats.paidUsers}</p>
                        <p className="text-xs text-muted-foreground">Paid Users</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-ocean-blue/10 rounded-lg">
                        <Building2 className="w-5 h-5 text-ocean-blue" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stats.totalBusinesses}</p>
                        <p className="text-xs text-muted-foreground">Businesses</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-kente-red/10 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-kente-red" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stats.totalPosts}</p>
                        <p className="text-xs text-muted-foreground">Forum Posts</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Subscription Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Subscription Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={[
                              { name: "Explorer", value: users.filter(u => u.subscription_tier === "explorer").length, color: "#94a3b8" },
                              { name: "Voyager", value: users.filter(u => u.subscription_tier === "voyager").length, color: "#D4A853" },
                              { name: "Pioneer", value: users.filter(u => u.subscription_tier === "pioneer").length, color: "#E07A3D" },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {[
                              { name: "Explorer", value: users.filter(u => u.subscription_tier === "explorer").length, color: "#94a3b8" },
                              { name: "Voyager", value: users.filter(u => u.subscription_tier === "voyager").length, color: "#D4A853" },
                              { name: "Pioneer", value: users.filter(u => u.subscription_tier === "pioneer").length, color: "#E07A3D" },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                        <span className="text-sm">Explorer ({users.filter(u => u.subscription_tier === "explorer").length})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-safari-gold" />
                        <span className="text-sm">Voyager ({users.filter(u => u.subscription_tier === "voyager").length})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-sunset-orange" />
                        <span className="text-sm">Pioneer ({users.filter(u => u.subscription_tier === "pioneer").length})</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* User Growth Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      User Signups (Last 7 Days)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={(() => {
                            const last7Days = Array.from({ length: 7 }, (_, i) => {
                              const date = new Date();
                              date.setDate(date.getDate() - (6 - i));
                              return {
                                date: date.toLocaleDateString("en-US", { weekday: "short" }),
                                users: users.filter(u => {
                                  const created = new Date(u.created_at);
                                  return created.toDateString() === date.toDateString();
                                }).length,
                              };
                            });
                            return last7Days;
                          })()}
                        >
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="users" 
                            stroke="#D4A853" 
                            strokeWidth={2}
                            dot={{ fill: "#D4A853" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Revenue Potential */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Monthly Revenue Potential
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center py-4">
                        <p className="text-4xl font-bold text-savanna-green">
                          ${(users.filter(u => u.subscription_tier === "voyager").length * 19 + 
                             users.filter(u => u.subscription_tier === "pioneer").length * 79).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Estimated MRR</p>
                      </div>
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { tier: "Voyager", revenue: users.filter(u => u.subscription_tier === "voyager").length * 19 },
                              { tier: "Pioneer", revenue: users.filter(u => u.subscription_tier === "pioneer").length * 79 },
                            ]}
                          >
                            <XAxis dataKey="tier" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                            <Bar dataKey="revenue" fill="#4A9B7F" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {users.slice(0, 5).map((user) => (
                        <div key={user.id} className="flex items-center gap-3 text-sm">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {user.full_name?.[0]?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.full_name || "New user"} joined</span>
                          <span className="text-muted-foreground ml-auto">
                            {new Date(user.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-safari-gold" />
      </div>
    }>
      <AdminContent />
    </Suspense>
  );
}

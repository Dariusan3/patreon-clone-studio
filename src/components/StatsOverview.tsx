import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Users, DollarSign, Eye, TrendingUp } from "lucide-react";

export function StatsOverview() {
  const [stats, setStats] = useState({
    totalSupporters: 0,
    totalRevenue: 0,
    totalViews: 0,
    mostViewedPost: { title: "Loading...", views: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get total posts views (mock calculation for now)
      const { data: posts } = await supabase
        .from('posts')
        .select('title, id')
        .eq('user_id', user.id)
        .eq('is_published', true);

      // Mock stats - in production these would come from actual data
      setStats({
        totalSupporters: 247,
        totalRevenue: 3450.75,
        totalViews: posts?.length ? posts.length * 150 : 0,
        mostViewedPost: posts?.[0] 
          ? { title: posts[0].title, views: 1245 }
          : { title: "No posts yet", views: 0 }
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Supporters",
      value: stats.totalSupporters,
      icon: Users,
      description: "+12% from last month",
      color: "text-blue-500"
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: "+8% from last month",
      color: "text-green-500"
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      description: "Across all posts",
      color: "text-purple-500"
    },
    {
      title: "Most Viewed Post",
      value: stats.mostViewedPost.views,
      icon: TrendingUp,
      description: stats.mostViewedPost.title,
      color: "text-primary"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-40 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

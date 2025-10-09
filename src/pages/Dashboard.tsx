import { useState } from "react";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsOverview } from "@/components/StatsOverview";
import PostEditor from "@/components/PostEditor";
import PostManager from "@/components/PostManager";
import { ShopManager } from "@/components/ShopManager";
import { MembershipManager } from "@/components/MembershipManager";
import { SiteDesignManager } from "@/components/SiteDesignManager";
import { LayoutDashboard, FileText, Package, Crown, Palette } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Creator Dashboard</h1>
            <p className="text-muted-foreground">Manage your content, memberships, and site design</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-auto">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Posts</span>
              </TabsTrigger>
              <TabsTrigger value="shop" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Shop</span>
              </TabsTrigger>
              <TabsTrigger value="memberships" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                <span className="hidden sm:inline">Memberships</span>
              </TabsTrigger>
              <TabsTrigger value="design" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Design</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <StatsOverview />
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Quick Actions</h2>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveTab("posts")}
                      className="w-full text-left p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                    >
                      <h3 className="font-semibold mb-1">Create New Post</h3>
                      <p className="text-sm text-muted-foreground">Share content with your supporters</p>
                    </button>
                    <button
                      onClick={() => setActiveTab("memberships")}
                      className="w-full text-left p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                    >
                      <h3 className="font-semibold mb-1">Manage Memberships</h3>
                      <p className="text-sm text-muted-foreground">Update your membership tiers</p>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Recent Activity</h2>
                  <div className="space-y-2">
                    <div className="p-4 rounded-lg border bg-card">
                      <p className="text-sm text-muted-foreground">No recent activity</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="posts" className="space-y-6">
              <Tabs defaultValue="create">
                <TabsList>
                  <TabsTrigger value="create">Create Post</TabsTrigger>
                  <TabsTrigger value="manage">Manage Posts</TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="mt-6">
                  <PostEditor />
                </TabsContent>

                <TabsContent value="manage" className="mt-6">
                  <PostManager />
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="shop">
              <ShopManager />
            </TabsContent>

            <TabsContent value="memberships">
              <MembershipManager />
            </TabsContent>

            <TabsContent value="design">
              <SiteDesignManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

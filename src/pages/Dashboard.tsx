import { useState } from "react";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostEditor from "@/components/PostEditor";
import PostManager from "@/components/PostManager";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Creator Dashboard</h1>
            <p className="text-muted-foreground">Create and manage your posts</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 max-w-md">
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

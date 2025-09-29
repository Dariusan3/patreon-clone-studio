import { Header } from "@/components/Header";
import { CreatorHero } from "@/components/CreatorHero";
import { MembershipTiers } from "@/components/MembershipTiers";
import { PostFeed } from "@/components/PostFeed";
import { CreatorSidebar } from "@/components/CreatorSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <CreatorHero />
        
        <MembershipTiers />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Recent posts</h2>
                <p className="text-muted-foreground">
                  Latest updates and exclusive content from the creator
                </p>
              </div>
              <PostFeed />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CreatorSidebar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

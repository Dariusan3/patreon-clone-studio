import { Header } from "@/components/Header";
import { CreatorHero } from "@/components/CreatorHero";
import { MembershipTiers } from "@/components/MembershipTiers";
import { PostFeed } from "@/components/PostFeed";
import { CreatorSidebar } from "@/components/CreatorSidebar";
import { PopularPosts } from "@/components/PopularPosts";
import { LatestPostSection } from "@/components/LatestPostSection";
import { PostCollectionSlider } from "@/components/PostCollectionSlider";
import { RecentPosts } from "@/components/RecentPosts";
import { CollectionsSlider } from "@/components/CollectionsSlider";
import { PopularProductsSlider } from "@/components/PopularProductsSlider";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <CreatorHero />
        <PopularPosts />
        <LatestPostSection />
        <PostCollectionSlider collectionTitle="Fan Favorites" />
        <RecentPosts />
        <CollectionsSlider />
        <PopularProductsSlider />
        
        <MembershipTiers />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <PostFeed />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CreatorSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

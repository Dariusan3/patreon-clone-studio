import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecentPostsSection } from "@/components/RecentPostsSection";
import { PopularProductsList } from "@/components/PopularProductsList";
import { PopularPostsList } from "@/components/PopularPostsList";
import { FilterPostsModal } from "@/components/FilterPostsModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

const DUMMY_ALL_RECENT_POSTS = [
  {
    mainPost: {
      id: 'rp1',
      title: 'Alice Von Ataraxia - 엘리스 폰 아타락시아',
      description: 'To access this whole post, you have to Join today. When you become a member, you will unlock exclusive posts and benefits.',
      imageUrl: '/src/assets/hero-bg.jpg',
      date: new Date(Date.now() - 15 * 60 * 60 * 1000), // 15 hours ago
      likes: 1,
      comments: 0,
      isLocked: true,
    },
    thumbnails: [
      { id: 'th1', imageUrl: '/src/assets/creator-avatar.jpg', isLocked: true },
      { id: 'th2', imageUrl: '/src/assets/hero-bg.jpg', isLocked: false },
      { id: 'th3', imageUrl: '/src/assets/creator-avatar.jpg', isLocked: false },
      { id: 'th4', imageUrl: '/src/assets/hero-bg.jpg', isLocked: false },
      { id: 'th5', imageUrl: '/src/assets/creator-avatar.jpg', isLocked: false },
    ]
  },
  {
    mainPost: {
      id: 'rp2',
      title: 'New Art Style Experiment',
      description: 'Exploring new techniques and styles in my latest art piece. Check out the process!',
      imageUrl: '/src/assets/creator-avatar.jpg',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      likes: 10,
      comments: 5,
      isLocked: false,
    },
    thumbnails: [
      { id: 'th6', imageUrl: '/src/assets/hero-bg.jpg', isLocked: false },
      { id: 'th7', imageUrl: '/src/assets/creator-avatar.jpg', isLocked: false },
      { id: 'th8', imageUrl: '/src/assets/hero-bg.jpg', isLocked: false },
    ]
  },
  {
    mainPost: {
      id: 'rp3',
      title: 'Behind the Scenes: Project X',
      description: 'A deep dive into the making of my latest project. Exclusive content for members.',
      imageUrl: '/src/assets/hero-bg.jpg',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      likes: 20,
      comments: 8,
      isLocked: true,
    },
    thumbnails: [
      { id: 'th9', imageUrl: '/src/assets/creator-avatar.jpg', isLocked: true },
      { id: 'th10', imageUrl: '/src/assets/hero-bg.jpg', isLocked: true },
    ]
  },
];

export const Posts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Recent Posts */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Recent posts</h2>
              <div className="flex items-center space-x-4">
                <FilterPostsModal />
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  <Input placeholder="Search posts" className="pl-10 w-[200px]" />
                </div>
              </div>
            </div>
            <div className="space-y-8">
              {DUMMY_ALL_RECENT_POSTS.map((postData, index) => (
                <RecentPostsSection key={index} mainPost={postData.mainPost} thumbnails={postData.thumbnails} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline" onClick={() => console.log("Load more posts...")}>Load more</Button>
            </div>
          </div>

          {/* Sidebar - Popular Products & Popular Posts */}
          <div className="lg:col-span-1 space-y-8">
            <PopularProductsList />
            
            <div className="bg-card p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Gift className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Gift membership</span>
              </div>
              <Button variant="outline">Gift</Button>
            </div>

            <PopularPostsList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

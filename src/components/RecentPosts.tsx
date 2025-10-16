import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatPostDate } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  creator: string;
  imageUrl: string;
  date: Date;
  likes: number;
  comments: number;
}

const DUMMY_RECENT_POSTS: Post[] = [
  { id: 'r1', title: 'Latest Tutorial Released', creator: 'Creator A', imageUrl: '/src/assets/hero-bg.jpg', date: new Date(Date.now() - 1 * 60 * 60 * 1000), likes: 5, comments: 1 }, // 1 hour ago
  { id: 'r2', title: 'Weekly Devlog Update', creator: 'Creator B', imageUrl: '/src/assets/creator-avatar.jpg', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), likes: 8, comments: 2 }, // 2 days ago
  { id: 'r3', title: 'Upcoming Project Sneak Peek', creator: 'Creator C', imageUrl: '/src/assets/hero-bg.jpg', date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), likes: 12, comments: 4 }, // 6 days ago
  { id: 'r4', title: 'New Fan Art Showcase', creator: 'Creator D', imageUrl: '/src/assets/creator-avatar.jpg', date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), likes: 7, comments: 0 }, // 9 days ago
  { id: 'r5', title: 'Q&A with the Team', creator: 'Creator E', imageUrl: '/src/assets/hero-bg.jpg', date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), likes: 10, comments: 3 }, // 2 weeks ago
];

export const RecentPosts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const postsPerSlide = 3; 
  const totalSlides = Math.ceil(DUMMY_RECENT_POSTS.length / postsPerSlide);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Recent Posts</h2>
        <div className="relative flex items-center justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePrevious} 
            className="absolute left-0 z-10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="overflow-hidden w-full">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {DUMMY_RECENT_POSTS.map((post) => (
                <div key={post.id} className="min-w-[33.33%] px-3">
                  <Card className="w-full h-[250px]">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-[150px] object-cover rounded-t-lg" />
                    <CardHeader className="py-2 px-3">
                      <CardTitle className="text-md">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 py-0">
                      <div className="flex items-center flex-wrap text-sm text-muted-foreground mt-2">
                        <span>{formatPostDate(post.date)}</span>
                        <span className="ml-4 flex items-center">
                          <span className="mr-1">❤️</span> {post.likes}
                        </span>
                        <span className="ml-4 flex items-center">
                          <span className="mr-1">💬</span> {post.comments}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNext} 
            className="absolute right-0 z-10"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

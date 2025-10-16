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
  date: Date; // Changed from timeAgo: string to date: Date
  likes: number;
  comments: number;
}

const DUMMY_POSTS: Post[] = [
  { id: '1', title: 'My First Creation', creator: 'Creator A', imageUrl: '/src/assets/creator-avatar.jpg', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), likes: 15, comments: 3 }, // 3 days ago
  { id: '2', title: 'Behind the Scenes', creator: 'Creator B', imageUrl: '/src/assets/hero-bg.jpg', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), likes: 22, comments: 7 }, // 10 days ago
  { id: '3', title: 'New Art Series', creator: 'Creator C', imageUrl: '/src/assets/creator-avatar.jpg', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), likes: 10, comments: 2 }, // 5 days ago
  { id: '4', title: 'Exclusive Tutorial', creator: 'Creator D', imageUrl: '/src/assets/hero-bg.jpg', date: new Date(Date.now() - 2 * 60 * 60 * 1000), likes: 8, comments: 1 }, // 2 hours ago
  { id: '5', title: 'Fan Q&A Session', creator: 'Creator E', imageUrl: '/src/assets/creator-avatar.jpg', date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), likes: 30, comments: 10 }, // 8 days ago
  { id: '6', title: 'Another Great Post', creator: 'Creator F', imageUrl: '/src/assets/hero-bg.jpg', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), likes: 18, comments: 5 }, // 1 day ago
  { id: '7', title: 'The Seventh Heaven', creator: 'Creator G', imageUrl: '/src/assets/creator-avatar.jpg', date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), likes: 25, comments: 8 }, // 15 days ago
];

export const PopularPosts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const postsPerSlide = 3;
  const totalSlides = Math.ceil(DUMMY_POSTS.length / postsPerSlide);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const getDisplayedPosts = () => {
    const startIndex = currentIndex * postsPerSlide;
    const endIndex = startIndex + postsPerSlide;
    return DUMMY_POSTS.slice(startIndex, endIndex);
  };

  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Posts</h2>
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
              {DUMMY_POSTS.map((post, index) => (
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

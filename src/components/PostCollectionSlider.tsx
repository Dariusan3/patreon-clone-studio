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

const DUMMY_COLLECTION_POSTS: Post[] = [
  { id: 'c1', title: 'Collection Post 1', creator: 'Creator X', imageUrl: '/src/assets/hero-bg.jpg', date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), likes: 50, comments: 12 }, // 30 days ago
  { id: 'c2', title: 'Collection Post 2', creator: 'Creator Y', imageUrl: '/src/assets/creator-avatar.jpg', date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), likes: 35, comments: 8 }, // 20 days ago
  { id: 'c3', title: 'Collection Post 3', creator: 'Creator Z', imageUrl: '/src/assets/hero-bg.jpg', date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), likes: 60, comments: 15 }, // 60 days ago
  { id: 'c4', title: 'Collection Post 4', creator: 'Creator W', imageUrl: '/src/assets/creator-avatar.jpg', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), likes: 28, comments: 6 }, // 5 days ago
  { id: 'c5', title: 'Collection Post 5', creator: 'Creator V', imageUrl: '/src/assets/hero-bg.jpg', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), likes: 42, comments: 9 }, // 10 days ago
];

interface PostCollectionSliderProps {
  collectionTitle: string;
}

export const PostCollectionSlider = ({ collectionTitle }: PostCollectionSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const postsPerSlide = 3; 
  const totalSlides = Math.ceil(DUMMY_COLLECTION_POSTS.length / postsPerSlide);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">{collectionTitle}</h2>
        <p className="text-muted-foreground mb-8">Discover the community's most loved and highly-rated content.</p>
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
              {DUMMY_COLLECTION_POSTS.map((post) => (
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

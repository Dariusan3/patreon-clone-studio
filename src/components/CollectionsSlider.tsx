import { useState } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Collection {
  id: string;
  title: string;
  description: string;
  postCount: number;
  imageUrl?: string; // Optional for placeholder background
}

const DUMMY_COLLECTIONS: Collection[] = [
  { id: 'col1', title: '"Webtoon Adventures" ', description: 'Doujins featuring Webtoon Characters!', postCount: 4, imageUrl: '/src/assets/hero-bg.jpg' },
  { id: 'col2', title: 'Doujins', description: 'You can find all my doujins here', postCount: 20, imageUrl: '/src/assets/creator-avatar.jpg' },
  { id: 'col3', title: 'Albums', description: 'All my albums in one place.', postCount: 135, imageUrl: '/src/assets/hero-bg.jpg' },
  { id: 'col4', title: 'JOIS', description: 'All my JOIS in one place.', postCount: 1, imageUrl: '/src/assets/creator-avatar.jpg' },
  { id: 'col5', title: 'Sketches', description: 'My raw sketches and concepts.', postCount: 50, imageUrl: '/src/assets/hero-bg.jpg' },
];

export const CollectionsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const collectionsPerSlide = 4; 
  const totalSlides = Math.ceil(DUMMY_COLLECTIONS.length / collectionsPerSlide);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Collections</h2>
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
              {DUMMY_COLLECTIONS.map((collection) => (
                <div key={collection.id} className="min-w-[25%] px-3">
                  <Card className="w-full h-[300px] flex flex-col justify-end p-4" style={{ backgroundImage: collection.imageUrl ? `url(${collection.imageUrl})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="bg-gradient-to-t from-black/80 to-transparent absolute inset-0 rounded-lg"></div>
                    <CardTitle className="text-lg text-white relative z-10">{collection.title}</CardTitle>
                    <CardContent className="p-0 text-sm text-gray-300 relative z-10">
                      <p className="mb-2">{collection.description}</p>
                      <p>{collection.postCount} posts</p>
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

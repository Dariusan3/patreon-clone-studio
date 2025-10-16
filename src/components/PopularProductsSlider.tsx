import { useState } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  itemCount: number;
}

const DUMMY_PRODUCTS: Product[] = [
  { 
    id: 'p1', 
    title: 'Feet Collection Stickers - Digital', 
    description: 'A collection of 20 PNG Stickers featuring Feet Character Pics!',
    price: '€3',
    imageUrl: '/src/assets/hero-bg.jpg',
    itemCount: 20,
  },
  { 
    id: 'p2', 
    title: '"Not A Shame Vanessa" - Short Novel (Request)', 
    description: 'Vanessa cheats again on his boyfriend, will she be caught this time? You have to find out!',
    price: '€5.50',
    imageUrl: '/src/assets/creator-avatar.jpg',
    itemCount: 10,
  },
  { 
    id: 'p3', 
    title: 'Evelynn\'s Prey - Short Novel', 
    description: 'Evelynn finds her next prey, find out who it is and what she did to him in "Evelynn\'s Prey" novel.',
    price: '€5.50',
    imageUrl: '/src/assets/hero-bg.jpg',
    itemCount: 13,
  },
  { 
    id: 'p4', 
    title: 'Magic Potion Recipe', 
    description: 'A mystical recipe for a potent magic potion.',
    price: '€10',
    imageUrl: '/src/assets/creator-avatar.jpg',
    itemCount: 5,
  },
];

export const PopularProductsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerSlide = 3; 
  const totalSlides = Math.ceil(DUMMY_PRODUCTS.length / productsPerSlide);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Popular products</h2>
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
              {DUMMY_PRODUCTS.map((product) => (
                <div key={product.id} className="min-w-[33.33%] px-3">
                  <Card className="w-full">
                    <div className="relative">
                      <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover rounded-t-lg" />
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded-md text-xs flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image mr-1"><path d="M5 12V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9"/><path d="M22 8.5 16 2l-6 6"/><path d="M2 7h2"/><path d="M2 12h2"/><path d="M2 17h2"/></svg>
                        {product.itemCount}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg font-semibold mb-2">{product.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                      <p className="text-lg font-bold">{product.price}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePrevious} 
            className="absolute left-0 z-10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
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

import { useState, useEffect } from "react";
import { ShoppingCart, Download, Lock, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { HighlightedProductCard } from "@/components/HighlightedProductCard";
import { ProductCard } from "@/components/ProductCard";
import { PaginationControls } from "@/components/PaginationControls";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  likes: number;
  isLocked: boolean;
  itemCount: number;
}

const DUMMY_HIGHLIGHTED_PRODUCT: Product = {
  id: 'hp1',
  title: 'Evelynn\'s Prey - Short Novel',
  description: 'Evelynn finds her next prey, find out who it is and what she did to him in "Evelynn\'s Prey" novel.',
  price: '€5.50',
  imageUrl: '/src/assets/hero-bg.jpg',
  likes: 13,
  isLocked: false,
  itemCount: 13,
};

const DUMMY_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: '(No. 3) | Biro\'s Wonderland - Chapter 1',
    price: '€6.50',
    imageUrl: '/src/assets/product-placeholder-1.jpg',
    likes: 4,
    isLocked: true,
    description: 'A thrilling first chapter of Biro\'s Wonderland. Join now to unlock the full story!',
    itemCount: 1,
  },
  {
    id: 'p2',
    title: '(No. 8) | Biro\'s Wonderland - Chapter 2',
    price: '€5.50',
    imageUrl: '/src/assets/product-placeholder-2.jpg',
    likes: 1,
    isLocked: true,
    description: 'The exciting second chapter of Biro\'s Wonderland. More adventure awaits!',
    itemCount: 1,
  },
  {
    id: 'p3',
    title: '(No. 12) | Biro\'s Wonderland - Chapter 3',
    price: '€5.50',
    imageUrl: '/src/assets/product-placeholder-3.jpg',
    likes: 2,
    isLocked: true,
    description: 'The gripping third chapter of Biro\'s Wonderland. What will happen next?',
    itemCount: 1,
  },
  {
    id: 'p4',
    title: 'Mysterious Item 1',
    price: '€7.00',
    imageUrl: '/src/assets/product-placeholder-4.jpg',
    likes: 5,
    isLocked: false,
    description: 'A very mysterious item with unknown properties.',
    itemCount: 1,
  },
  {
    id: 'p5',
    title: 'Secret Recipe Book',
    price: '€12.00',
    imageUrl: '/src/assets/product-placeholder-5.jpg',
    likes: 8,
    isLocked: true,
    description: 'Unlock ancient secrets with this exclusive recipe book.',
    itemCount: 1,
  },
  {
    id: 'p6',
    title: 'Fantasy Map Pack',
    price: '€9.50',
    imageUrl: '/src/assets/product-placeholder-6.jpg',
    likes: 3,
    isLocked: false,
    description: 'A collection of hand-drawn fantasy maps for your adventures.',
    itemCount: 1,
  },
];

const DUMMY_PRODUCTS_PAGE2: Product[] = [
  {
    id: 'p7',
    title: '(No. 15) | Biro\'s Wonderland - Chapter 4',
    price: '€6.50',
    imageUrl: '/src/assets/product-placeholder-1.jpg',
    likes: 4,
    isLocked: true,
    description: 'A new chapter in Biro\'s Wonderland. More secrets to uncover!',
    itemCount: 1,
  },
  {
    id: 'p8',
    title: 'Digital Art Brush Pack',
    price: '€15.00',
    imageUrl: '/src/assets/product-placeholder-2.jpg',
    likes: 12,
    isLocked: false,
    description: 'A versatile collection of brushes for digital artists.',
    itemCount: 1,
  },
  {
    id: 'p9',
    title: 'Animated Sticker Pack',
    price: '€8.00',
    imageUrl: '/src/assets/product-placeholder-3.jpg',
    likes: 7,
    isLocked: false,
    description: 'Bring your messages to life with this fun animated sticker pack.',
    itemCount: 1,
  },
  {
    id: 'p10',
    title: 'Exclusive Soundtrack Vol. 2',
    price: '€20.00',
    imageUrl: '/src/assets/product-placeholder-4.jpg',
    likes: 18,
    isLocked: true,
    description: 'The highly anticipated second volume of exclusive soundtracks.',
    itemCount: 1,
  },
  {
    id: 'p11',
    title: 'Limited Edition Print',
    price: '€50.00',
    imageUrl: '/src/assets/product-placeholder-5.jpg',
    likes: 25,
    isLocked: false,
    description: 'A rare, signed print of a popular artwork. Limited quantities available!',
    itemCount: 1,
  },
  {
    id: 'p12',
    title: 'Early Access Pass',
    price: '€30.00',
    imageUrl: '/src/assets/product-placeholder-6.jpg',
    likes: 10,
    isLocked: true,
    description: 'Get exclusive early access to all upcoming content and features.',
    itemCount: 1,
  },
];

const ALL_PRODUCTS = [...DUMMY_PRODUCTS, ...DUMMY_PRODUCTS_PAGE2];

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Display 6 products per page as per image
  const totalProducts = ALL_PRODUCTS.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = ALL_PRODUCTS.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Search and Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search products" className="pl-10 w-full" />
            </div>
            <div className="flex items-center space-x-4">
              <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">{totalProducts} products</span>
            </div>
          </div>

          {/* Highlighted Product */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Highlighted product</h2>
            <HighlightedProductCard {...DUMMY_HIGHLIGHTED_PRODUCT} />
          </div>

          {/* All Products Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">All products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  likes={product.likes}
                  isLocked={product.isLocked}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;

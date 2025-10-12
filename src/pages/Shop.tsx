import { useState, useEffect } from "react";
import { ShoppingCart, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";

interface ShopItem {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
}

const mockProducts = [
  {
    id: "1",
    title: "Exclusive Art Pack Vol. 1",
    description: "High-resolution digital artwork collection featuring 20+ pieces",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=300&fit=crop",
    category: "art",
    requiredTier: "silver",
    fileUrl: "/downloads/art-pack-1.zip",
    fileType: "zip",
    isPurchased: false,
  },
  {
    id: "2",
    title: "Behind The Scenes Videos",
    description: "Exclusive 4K video content showing my creative process",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&h=300&fit=crop",
    category: "video",
    requiredTier: "gold",
    fileUrl: "/downloads/bts-videos.zip",
    fileType: "zip",
    isPurchased: false,
  },
  {
    id: "3",
    title: "Digital Wallpaper Collection",
    description: "50 stunning wallpapers for desktop and mobile",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=300&fit=crop",
    category: "art",
    requiredTier: null,
    fileUrl: "/downloads/wallpapers.zip",
    fileType: "zip",
    isPurchased: false,
  },
  {
    id: "4",
    title: "Music Album - Digital Download",
    description: "Complete album in FLAC and MP3 format with bonus tracks",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=300&fit=crop",
    category: "music",
    requiredTier: null,
    fileUrl: "/downloads/album.zip",
    fileType: "zip",
    isPurchased: false,
  },
  {
    id: "5",
    title: "Tutorial PDF Bundle",
    description: "Comprehensive guides and tutorials in PDF format",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&h=300&fit=crop",
    category: "educational",
    requiredTier: "silver",
    fileUrl: "/downloads/tutorials.pdf",
    fileType: "pdf",
    isPurchased: false,
  },
  {
    id: "6",
    title: "Custom Preset Pack",
    description: "Professional presets for photo and video editing",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    category: "tools",
    requiredTier: "gold",
    fileUrl: "/downloads/presets.zip",
    fileType: "zip",
    isPurchased: false,
  },
];

// Logic placeholders for backend integration
const getUserTier = (): string | null => {
  // TODO: Implement actual user tier checking from backend
  // This should query the user's current membership status
  console.log("Checking user tier...");
  return null; // Return actual tier: 'bronze', 'silver', 'gold', etc.
};

const hasAccessToProduct = (productId: string, requiredTier: string | null): boolean => {
  // TODO: Implement tier access validation
  // Check if user's tier meets or exceeds the required tier
  const userTier = getUserTier();
  console.log(`Checking access for product ${productId}, required tier: ${requiredTier}, user tier: ${userTier}`);
  return requiredTier === null; // For now, only allow products with no tier requirement
};

const hasPurchasedProduct = (productId: string): boolean => {
  // TODO: Query database to check if user has purchased this product
  console.log(`Checking purchase status for product ${productId}`);
  return false;
};

const addToCart = (productId: string) => {
  // TODO: Implement cart functionality
  // Add product to user's shopping cart in database
  console.log(`Adding product ${productId} to cart`);
};

const purchaseProduct = async (productId: string) => {
  // TODO: Implement purchase flow
  // 1. Verify user authentication
  // 2. Check tier requirements
  // 3. Process payment
  // 4. Create purchase record in database
  // 5. Enable download access
  console.log(`Processing purchase for product ${productId}`);
};

const initiateSecureDownload = async (productId: string, fileUrl: string) => {
  // TODO: Implement secure download system
  // 1. Verify user has purchased the product
  // 2. Generate time-limited signed URL from storage
  // 3. Log download activity
  // 4. Return secure download link
  console.log(`Initiating secure download for product ${productId}, file: ${fileUrl}`);
  
  // Example implementation with Supabase Storage:
  // const { data, error } = await supabase.storage
  //   .from('product-files')
  //   .createSignedUrl(fileUrl, 3600); // 1 hour expiry
  // if (data) window.open(data.signedUrl, '_blank');
};

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchShopItems();
  }, []);

  const fetchShopItems = async () => {
    try {
      const { data, error } = await supabase
        .from('shop_items')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching shop items:', error);
      toast({
        title: "Error",
        description: "Failed to load shop items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products;

  const handleAddToCart = (productId: string, productTitle: string) => {
    addToCart(productId);
    toast({
      title: "Added to cart",
      description: `${productTitle} has been added to your cart.`,
    });
  };

  const handleBuyNow = async (productId: string, productTitle: string) => {
    try {
      await purchaseProduct(productId);
      toast({
        title: "Purchase initiated",
        description: `Processing purchase for ${productTitle}...`,
      });
    } catch (error) {
      toast({
        title: "Purchase failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (productId: string, fileUrl: string, productTitle: string) => {
    if (!hasPurchasedProduct(productId)) {
      toast({
        title: "Access denied",
        description: "You need to purchase this item first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await initiateSecureDownload(productId, fileUrl);
      toast({
        title: "Download started",
        description: `Downloading ${productTitle}...`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const getTierBadgeVariant = (tier: string | null): "default" | "secondary" | "destructive" => {
    if (!tier) return "secondary";
    const tierMap: Record<string, "default" | "secondary" | "destructive"> = {
      bronze: "secondary",
      silver: "secondary",
      gold: "default",
    };
    return tierMap[tier] || "secondary";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Shop
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover exclusive digital products and add-ons. Premium items are available to members of specific tiers.
            </p>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-6 max-w-3xl mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="art">Art</TabsTrigger>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="educational">Educational</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12 col-span-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 col-span-3">
              <p className="text-muted-foreground">No shop items available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isPurchased = false;

                return (
                  <Card key={product.id} className="flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                          </div>
                        )}
                        {isPurchased && (
                          <Badge className="absolute top-3 left-3 bg-green-600">
                            Owned
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                  
                    <CardContent className="flex-1 pt-6">
                      <CardTitle className="mb-2">{product.title}</CardTitle>
                      <CardDescription className="mb-4">{product.description || "Digital product"}</CardDescription>
                    </CardContent>

                    <CardFooter className="flex-col gap-3">
                      <div className="w-full flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold">${product.price}</span>
                      </div>

                      {isPurchased ? (
                        <Button 
                          className="w-full"
                          variant="default"
                          onClick={() => handleDownload(product.id, "", product.title)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      ) : (
                        <div className="w-full flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleAddToCart(product.id, product.title)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button 
                            variant="gradient"
                            className="flex-1"
                            onClick={() => handleBuyNow(product.id, product.title)}
                          >
                            Buy Now
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Shop;

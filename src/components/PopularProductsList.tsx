import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Image } from "lucide-react"; // Using Image as a placeholder icon

interface Product {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  itemCount: number;
}

const DUMMY_PRODUCTS: Product[] = [
  { 
    id: 'p1', 
    title: '"Not A Shame Vanessa" - Short..', 
    price: '€5.50',
    imageUrl: '/src/assets/hero-bg.jpg',
    itemCount: 10,
  },
  { 
    id: 'p2', 
    title: 'Evelynn\'s Prey - Short Novel', 
    price: '€5.50',
    imageUrl: '/src/assets/creator-avatar.jpg',
    itemCount: 13,
  },
  { 
    id: 'p3', 
    title: 'Lingerie Collection Stickers - ...', 
    price: '€3',
    imageUrl: '/src/assets/hero-bg.jpg',
    itemCount: 25,
  },
];

export const PopularProductsList = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold flex items-center">Popular products <span className="ml-2 text-muted-foreground"></span></h3>
      <div className="space-y-4">
        {DUMMY_PRODUCTS.map((product) => (
          <Card key={product.id} className="flex items-center p-2 bg-card border-none shadow-none">
            <img src={product.imageUrl} alt={product.title} className="w-16 h-16 object-cover rounded-md mr-4" />
            <div className="flex-1">
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Image className="h-4 w-4 mr-1" /> {product.itemCount}
              </div>
              <CardTitle className="text-md font-medium leading-tight mb-1 line-clamp-2">{product.title}</CardTitle>
              <CardContent className="p-0 text-sm font-bold">
                {product.price}
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

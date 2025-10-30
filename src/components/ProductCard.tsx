import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Lock } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  likes: number;
  isLocked: boolean;
}

export const ProductCard = ({ id, title, price, imageUrl, likes, isLocked }: ProductCardProps) => {
  return (
    <Card className="w-full rounded-lg overflow-hidden bg-card shadow-sm">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-xl font-bold mb-4">{price}</p>
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <div className="flex items-center">
            <Heart className="h-4 w-4 mr-1" /> {likes}
          </div>
          <Button variant="outline" size="sm">Buy now</Button>
        </div>
      </CardContent>
    </Card>
  );
};

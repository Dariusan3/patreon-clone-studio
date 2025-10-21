import { Button } from "@/components/ui/button";
import { Lock, Share2, MessageCircle, Heart } from "lucide-react";
import { formatPostDate } from "@/lib/utils";

interface RecentPostCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
  likes: number;
  comments: number;
  isLocked: boolean;
}

export const RecentPostCard = ({ id, title, description, imageUrl, date, likes, comments, isLocked }: RecentPostCardProps) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden">
      <div className="relative w-full h-80 bg-muted-foreground/20 flex items-center justify-center">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-black/70 text-white px-4 py-2 rounded-full flex items-center">
              <Lock className="h-5 w-5 mr-2" /> Locked
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{formatPostDate(date)}</p>
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
        {isLocked && (
          <Button variant="outline" className="w-full mb-4">
            Join to unlock
          </Button>
        )}
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1" /> {likes}
            </div>
            <div className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-1" /> {comments}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Share2 className="h-4 w-4" /> <span>Share</span>
            <Lock className="h-4 w-4" /> <span>Locked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

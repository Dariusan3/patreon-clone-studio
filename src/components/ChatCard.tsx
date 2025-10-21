import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface ChatCardProps {
  id: string;
  name: string;
  avatarUrl: string;
  isLocked: boolean;
  emoji?: string;
}

export const ChatCard = ({ id, name, avatarUrl, isLocked, emoji }: ChatCardProps) => {
  return (
    <Card className="flex items-center justify-between p-4 bg-card border-none shadow-sm">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-lg">{name} {emoji && <span className="ml-1 text-xl">{emoji}</span>}</p>
        </div>
      </div>
      {isLocked && (
        <Button variant="outline" className="flex items-center space-x-2">
          <Lock className="h-4 w-4" />
          <span>Join to unlock</span>
        </Button>
      )}
    </Card>
  );
};

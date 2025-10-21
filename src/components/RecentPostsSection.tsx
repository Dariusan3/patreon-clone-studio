import { RecentPostCard } from "@/components/RecentPostCard";
import { PostThumbnail } from "@/components/PostThumbnail";

interface RecentPostsSectionProps {
  mainPost: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: Date;
    likes: number;
    comments: number;
    isLocked: boolean;
  };
  thumbnails: {
    id: string;
    imageUrl: string;
    isLocked: boolean;
  }[];
}

export const RecentPostsSection = ({ mainPost, thumbnails }: RecentPostsSectionProps) => {
  return (
    <div className="space-y-6">
      <RecentPostCard {...mainPost} />
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {thumbnails.map((thumbnail) => (
          <PostThumbnail key={thumbnail.id} {...thumbnail} />
        ))}
      </div>
    </div>
  );
};

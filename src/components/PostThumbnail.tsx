import { Lock } from "lucide-react";

interface PostThumbnailProps {
  id: string;
  imageUrl: string;
  isLocked: boolean;
}

export const PostThumbnail = ({ id, imageUrl, isLocked }: PostThumbnailProps) => {
  return (
    <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
      <img src={imageUrl} alt={`Thumbnail ${id}`} className="w-full h-full object-cover" />
      {isLocked && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Lock className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
};

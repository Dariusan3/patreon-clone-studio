import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface CollectionCardProps {
  id: string;
  title: string;
  description: string;
  postCount: number;
  imageUrl?: string;
}

export const CollectionCard = ({ id, title, description, postCount, imageUrl }: CollectionCardProps) => {
  return (
    <Card key={id} className="w-full h-[250px] flex flex-col justify-end p-4 relative overflow-hidden rounded-lg">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out hover:scale-105"
        style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
      ></div>
      <div className="bg-gradient-to-t from-black/80 to-transparent absolute inset-0 rounded-lg"></div>
      <CardTitle className="text-lg text-white relative z-10">{title}</CardTitle>
      <CardContent className="p-0 text-sm text-gray-300 relative z-10">
        <p className="mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center text-sm text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play mr-1"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          {postCount}
        </div>
      </CardContent>
    </Card>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { formatPostDate } from "@/lib/utils";

export const LatestPostSection = () => {
  const latestPost = {
    id: 'lp1',
    title: 'Makima & Power Doujinshi - Part 3/3 - REQUEST',
    description: 'Read Part 3 out of 3 of "Makima\'s Hidden Agenda" Doujinshi!',
    imageUrl: '/src/assets/creator-avatar.jpg', 
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Changed to Date object, 5 days ago
    likes: 2,
    comments: 0,
    isLocked: true,
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Latest post</h2>
        <Card className="flex flex-col md:flex-row overflow-hidden">
          <div className="relative w-full md:w-1/2 h-48 md:h-auto">
            <img src={latestPost.imageUrl} alt={latestPost.title} className="w-full h-full object-cover" />
            {latestPost.isLocked && (
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                Locked
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <CardHeader className="px-0 pt-0 pb-4">
              <CardTitle className="text-2xl font-bold">{latestPost.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-0 py-0">
              <p className="text-muted-foreground mb-4">{latestPost.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{formatPostDate(latestPost.date)}</span>
                <span className="ml-4 flex items-center">
                  <span className="mr-1">❤️</span> {latestPost.likes}
                </span>
                <span className="ml-4 flex items-center">
                  <span className="mr-1">💬</span> {latestPost.comments}
                </span>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
};

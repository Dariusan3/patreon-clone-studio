import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { formatPostDate } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  imageUrl: string;
  date: Date;
}

const DUMMY_POSTS: Post[] = [
  { id: 'p1', title: 'Jang Sun Yeong - 장선영', imageUrl: '/src/assets/creator-avatar.jpg', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // 7 days ago
  { id: 'p2', title: 'Alicia Arden - 알리시아 아덴 - REQUEST', imageUrl: '/src/assets/hero-bg.jpg', date: new Date(Date.now() - 19 * 60 * 60 * 1000) }, // 19 hours ago
];

export const PopularPostsList = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Popular posts</h3>
      <div className="space-y-4">
        {DUMMY_POSTS.map((post) => (
          <Card key={post.id} className="flex items-center p-2 bg-card border-none shadow-none">
            <img src={post.imageUrl} alt={post.title} className="w-16 h-16 object-cover rounded-md mr-4" />
            <div className="flex-1">
              <CardTitle className="text-md font-medium leading-tight mb-1 line-clamp-2">{post.title}</CardTitle>
              <CardContent className="p-0 text-sm text-muted-foreground">
                {formatPostDate(post.date)}
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

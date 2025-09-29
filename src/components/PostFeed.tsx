import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Lock, Eye } from "lucide-react"
import creatorAvatar from "@/assets/creator-avatar.jpg"

const posts = [
  {
    id: 1,
    title: "New Digital Art Collection: Cosmic Dreams",
    content: "Just finished my latest series exploring the cosmos through digital art. This collection features vibrant nebulae, distant galaxies, and abstract interpretations of space phenomena.",
    image: null,
    isLocked: false,
    timestamp: "2 hours ago",
    likes: 34,
    comments: 8,
    tier: "Free"
  },
  {
    id: 2,
    title: "Behind the Scenes: My Creative Process",
    content: "Ever wondered how I create my artworks? In this exclusive post, I'm sharing my complete process from initial concept to final piece...",
    image: null,
    isLocked: true,
    timestamp: "1 day ago",
    likes: 67,
    comments: 15,
    tier: "Supporter"
  },
  {
    id: 3,
    title: "Weekly Art Challenge Results",
    content: "Amazing submissions from the community this week! Thank you to everyone who participated in the 'Ethereal Landscapes' challenge.",
    image: null,
    isLocked: false,
    timestamp: "3 days ago",
    likes: 89,
    comments: 23,
    tier: "Free"
  },
  {
    id: 4,
    title: "Exclusive Tutorial: Advanced Color Theory",
    content: "A comprehensive guide to using color theory in digital art. Includes practical exercises and downloadable resources...",
    image: null,
    isLocked: true,
    timestamp: "5 days ago",
    likes: 156,
    comments: 42,
    tier: "Art Enthusiast"
  }
]

export function PostFeed() {
  return (
    <section className="py-8">
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={creatorAvatar} alt="Creator" />
                    <AvatarFallback>YB</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">𓆩Yours Biro𓆪</div>
                    <div className="text-sm text-muted-foreground">{post.timestamp}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={post.tier === "Free" ? "secondary" : "default"} className="text-xs">
                    {post.tier}
                  </Badge>
                  {post.isLocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <h3 className="font-semibold text-lg mb-3">{post.title}</h3>
              
              {post.isLocked ? (
                <div className="relative">
                  <p className="text-muted-foreground line-clamp-2 blur-sm select-none">
                    {post.content}
                  </p>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4 text-center border shadow-elevated">
                      <Lock className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium mb-2">Members only content</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Join the {post.tier} tier to unlock this post
                      </p>
                      <Button variant="gradient" size="sm">
                        Become a member
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-foreground">{post.content}</p>
              )}
              
              {post.image && (
                <div className="mt-4 rounded-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt="Post content"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
            </CardContent>
            
            <CardFooter className="pt-0">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                    <Heart className="w-5 h-5 mr-2" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
                
                {!post.isLocked && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>Public</span>
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
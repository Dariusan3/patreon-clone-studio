import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Heart, MessageCircle, Share2, Lock, Eye, Star, TrendingUp, Shield } from "lucide-react"
import creatorAvatar from "@/assets/creator-avatar.jpg"
import { useToast } from "@/hooks/use-toast"

// Mock posts data with categories and featured flag
const posts = [
  {
    id: 1,
    title: "New Digital Art Collection: Cosmic Dreams",
    content: "Just finished my latest series exploring the cosmos through digital art. This collection features vibrant nebulae, distant galaxies, and abstract interpretations of space phenomena.",
    image: null,
    isLocked: false,
    timestamp: "2 hours ago",
    likes: 234,
    comments: 48,
    tier: "Free",
    category: "Art",
    isFeatured: true, // Logic placeholder: can be toggled by creator
    featuredOrder: 1  // Logic placeholder: determines order in featured section
  },
  {
    id: 2,
    title: "Behind the Scenes: My Creative Process",
    content: "Ever wondered how I create my artworks? In this exclusive post, I'm sharing my complete process from initial concept to final piece...",
    image: null,
    isLocked: true,
    timestamp: "1 day ago",
    likes: 167,
    comments: 35,
    tier: "Supporter",
    category: "Exclusive",
    isFeatured: true,
    featuredOrder: 2
  },
  {
    id: 3,
    title: "New Music Track: Neon Nights",
    content: "My latest synthwave composition is here! This track blends retro 80s vibes with modern production. Available exclusively for supporters.",
    image: null,
    isLocked: true,
    timestamp: "2 days ago",
    likes: 298,
    comments: 62,
    tier: "Supporter",
    category: "Music",
    isFeatured: true,
    featuredOrder: 3
  },
  {
    id: 4,
    title: "Weekly Art Challenge Results",
    content: "Amazing submissions from the community this week! Thank you to everyone who participated in the 'Ethereal Landscapes' challenge.",
    image: null,
    isLocked: false,
    timestamp: "3 days ago",
    likes: 89,
    comments: 23,
    tier: "Free",
    category: "Art",
    isFeatured: false,
    featuredOrder: null
  },
  {
    id: 5,
    title: "Exclusive Tutorial: Advanced Color Theory",
    content: "A comprehensive guide to using color theory in digital art. Includes practical exercises and downloadable resources...",
    image: null,
    isLocked: true,
    timestamp: "5 days ago",
    likes: 156,
    comments: 42,
    tier: "Art Enthusiast",
    category: "Exclusive",
    isFeatured: false,
    featuredOrder: null
  },
  {
    id: 6,
    title: "Monthly Music Production Tips",
    content: "Here are my top 5 production techniques I learned this month. From mixing to mastering, these tips will level up your tracks!",
    image: null,
    isLocked: false,
    timestamp: "1 week ago",
    likes: 124,
    comments: 28,
    tier: "Free",
    category: "Music",
    isFeatured: false,
    featuredOrder: null
  },
  {
    id: 7,
    title: "WIP: Fantasy Landscape Series",
    content: "Working on a new series of fantasy landscapes. Here's a sneak peek at the first piece - a mystical forest at twilight.",
    image: null,
    isLocked: false,
    timestamp: "1 week ago",
    likes: 203,
    comments: 51,
    tier: "Free",
    category: "Art",
    isFeatured: false,
    featuredOrder: null
  },
  {
    id: 8,
    title: "Early Access: Unreleased Album Preview",
    content: "Get exclusive early access to 3 tracks from my upcoming album! Only available to Art Enthusiast tier and above.",
    image: null,
    isLocked: true,
    timestamp: "1 week ago",
    likes: 412,
    comments: 87,
    tier: "Art Enthusiast",
    category: "Music",
    isFeatured: false,
    featuredOrder: null
  }
]

// Logic placeholder: Function to set a post as featured
// This would typically connect to backend/state management
const setPostAsFeatured = (postId: number, isFeatured: boolean, order?: number) => {
  console.log(`Setting post ${postId} featured status to ${isFeatured} with order ${order}`)
  // Implementation: Update database/state to mark post as featured
}

// Logic placeholder: Function to get featured posts (sorted by featuredOrder)
const getFeaturedPosts = () => {
  return posts
    .filter(post => post.isFeatured)
    .sort((a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0))
}

// Logic placeholder: Function to get posts by category
const getPostsByCategory = (category: string) => {
  if (category === "All") return posts
  return posts.filter(post => post.category === category)
}

const categories = ["All", "Art", "Music", "Exclusive"]

// Post Card Component (reusable)
const PostCard = ({ post }: { post: typeof posts[0] }) => {
  const { toast } = useToast()

  const handleUnlockClick = () => {
    toast({
      title: "Authentication Required",
      description: "Please sign in to unlock this content and access members-only posts.",
    })
  }

  return (
  <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
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
          <p className="text-muted-foreground line-clamp-2 blur-sm select-none pointer-events-none">
            {post.content}
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4 text-center border shadow-elevated">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lock className="w-8 h-8 text-primary" />
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <p className="font-medium mb-2">Protected Content</p>
              <p className="text-sm text-muted-foreground mb-3">
                Join the {post.tier} tier to unlock this post
              </p>
              <Button variant="gradient" size="sm" onClick={handleUnlockClick}>
                Become a member
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-foreground">{post.content}</p>
      )}
      
      {post.image && (
        <div className="mt-4 rounded-lg overflow-hidden relative">
          <img 
            src={post.image} 
            alt="Post content"
            className={`w-full h-64 object-cover ${post.isLocked ? 'blur-md' : ''}`}
          />
          {post.isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm">
              <Lock className="w-12 h-12 text-primary" />
            </div>
          )}
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
  )
}

export function PostFeed() {
  const featuredPosts = getFeaturedPosts()
  
  return (
    <div className="space-y-8">
      {/* Featured/Popular Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="py-6">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-primary fill-primary" />
            <h2 className="text-2xl font-bold">Popular Posts</h2>
          </div>
          
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
              {featuredPosts.map((post) => (
                <div key={post.id} className="w-[400px] flex-shrink-0">
                  <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <Badge variant="default" className="text-xs">Featured</Badge>
                        <Badge variant={post.tier === "Free" ? "secondary" : "default"} className="text-xs">
                          {post.tier}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg line-clamp-2">{post.title}</h3>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground line-clamp-3 text-sm">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant={post.isLocked ? "gradient" : "outline"} size="sm" className="w-full">
                        {post.isLocked ? "Unlock Post" : "View Post"}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      )}
      
      {/* Categorized Posts with Tabs */}
      <section className="py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">All Posts</h2>
          <p className="text-muted-foreground">
            Browse by category to find specific content
          </p>
        </div>
        
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="w-full justify-start mb-6 overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="flex-shrink-0">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              {getPostsByCategory(category).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  )
}
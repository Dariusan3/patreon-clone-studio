import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Heart, MessageCircle, Share2, Lock, Eye, Star, TrendingUp, Shield } from "lucide-react"
import creatorAvatar from "@/assets/creator-avatar.jpg"
import { useToast } from "@/hooks/use-toast"
import { CommentSection } from "@/components/CommentSection"
import { supabase } from "@/integrations/supabase/client"

interface Post {
  id: string
  title: string
  content: string
  category: string
  is_published: boolean
  is_locked: boolean
  is_featured: boolean
  featured_order: number | null
  required_tier: string | null
  created_at: string
  user_id: string
}

const posts: Post[] = [
]

const categories = ["All", "Art", "Music", "Exclusive"]

// Post Card Component (reusable)
const PostCard = ({ post }: { post: Post }) => {
  const { toast } = useToast()
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours} hours ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

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
            <div className="text-sm text-muted-foreground">{formatDate(post.created_at)}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={post.is_locked ? "default" : "secondary"} className="text-xs">
            {post.required_tier || "Free"}
          </Badge>
          {post.is_locked && <Lock className="w-4 h-4 text-muted-foreground" />}
        </div>
      </div>
    </CardHeader>
    
    <CardContent className="pt-0">
      <h3 className="font-semibold text-lg mb-3">{post.title}</h3>
      
      {post.is_locked ? (
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
                Join the {post.required_tier} tier to unlock this post
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
    </CardContent>
    
    <CardFooter className="pt-0 flex-col gap-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
            <Heart className="w-5 h-5 mr-2" />
            0
          </Button>
          <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
            <MessageCircle className="w-5 h-5 mr-2" />
            0
          </Button>
          <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
        
        {!post.is_locked && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span>Public</span>
          </div>
        )}
      </div>
      
      {!post.is_locked && (
        <div className="w-full">
          <CommentSection postId={post.id} />
        </div>
      )}
    </CardFooter>
  </Card>
  )
}

export function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()

    // Set up realtime subscription for new posts
    const channel = supabase
      .channel('posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts'
        },
        () => {
          fetchPosts()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const featuredPosts = posts
    .filter(post => post.is_featured)
    .sort((a, b) => (a.featured_order || 0) - (b.featured_order || 0))

  const getPostsByCategory = (category: string) => {
    if (category === "All") return posts
    return posts.filter(post => post.category === category)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }
  
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
                        <Badge variant={post.is_locked ? "default" : "secondary"} className="text-xs">
                          {post.required_tier || "Free"}
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
                          0
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          0
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant={post.is_locked ? "gradient" : "outline"} size="sm" className="w-full">
                        {post.is_locked ? "Unlock Post" : "View Post"}
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
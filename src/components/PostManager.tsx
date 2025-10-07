import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Eye, Edit, Trash2, Search } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  visibility: "public" | "members";
  status: "draft" | "published";
  createdAt: string;
  views: number;
  likes: number;
}

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: "1",
    title: "New Artwork Collection",
    content: "Excited to share my latest digital art collection with you all...",
    category: "art",
    visibility: "public",
    status: "published",
    createdAt: "2025-01-15",
    views: 1245,
    likes: 89,
  },
  {
    id: "2",
    title: "Exclusive Music Preview",
    content: "Members-only sneak peek of my upcoming album...",
    category: "music",
    visibility: "members",
    status: "published",
    createdAt: "2025-01-12",
    views: 567,
    likes: 102,
  },
  {
    id: "3",
    title: "Work in Progress",
    content: "Still working on this piece, will share soon...",
    category: "bts",
    visibility: "public",
    status: "draft",
    createdAt: "2025-01-10",
    views: 0,
    likes: 0,
  },
];

// Backend integration placeholders
const fetchPosts = async (): Promise<Post[]> => {
  // TODO: Fetch posts from database
  // const { data, error } = await supabase
  //   .from('posts')
  //   .select('*')
  //   .order('created_at', { ascending: false });
  console.log("Fetching posts from database...");
  return mockPosts;
};

const deletePost = async (postId: string) => {
  // TODO: Delete post from database
  // const { error } = await supabase
  //   .from('posts')
  //   .delete()
  //   .eq('id', postId);
  console.log("Deleting post:", postId);
};

const editPost = async (postId: string) => {
  // TODO: Navigate to edit page or load post data into editor
  console.log("Editing post:", postId);
};

const PostManager = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || post.status === filterStatus;
    const matchesCategory = filterCategory === "all" || post.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDelete = async (postId: string, postTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) return;

    try {
      await deletePost(postId);
      setPosts(posts.filter((p) => p.id !== postId));
      toast({
        title: "Post deleted",
        description: "The post has been permanently deleted.",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (postId: string) => {
    editPost(postId);
    toast({
      title: "Edit mode",
      description: "Post editing functionality will be implemented with backend.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Posts</CardTitle>
          <CardDescription>View and manage all your posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="exclusive">Exclusive</SelectItem>
                <SelectItem value="updates">Updates</SelectItem>
                <SelectItem value="bts">Behind the Scenes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No posts found</p>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {post.status}
                      </Badge>
                      <Badge variant="outline">{post.category}</Badge>
                      {post.visibility === "members" && (
                        <Badge variant="secondary">Members Only</Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Created: {post.createdAt}</span>
                      {post.status === "published" && (
                        <>
                          <span>•</span>
                          <span>{post.views} views</span>
                          <span>•</span>
                          <span>{post.likes} likes</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(post.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(post.id, post.title)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PostManager;

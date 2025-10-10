import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Star, GripVertical, X, Plus, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  is_featured: boolean;
  featured_order: number | null;
  is_published: boolean;
}

interface SortablePostProps {
  post: Post;
  onRemove: (id: string) => void;
}

function SortablePost({ post, onRemove }: SortablePostProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 bg-card border rounded-lg"
    >
      <Button
        variant="ghost"
        size="icon"
        className="cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </Button>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{post.title}</h4>
        <p className="text-sm text-muted-foreground line-clamp-1">{post.content}</p>
      </div>
      
      <Badge variant="outline">{post.category}</Badge>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(post.id)}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}

export function FeaturedPostsManager() {
  const { toast } = useToast();
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [availablePosts, setAvailablePosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Not authenticated",
          description: "Please sign in to manage featured posts.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const featured = (data || [])
        .filter(p => p.is_featured)
        .sort((a, b) => (a.featured_order || 0) - (b.featured_order || 0));
      
      const available = (data || []).filter(p => !p.is_featured);

      setFeaturedPosts(featured);
      setAvailablePosts(available);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFeaturedPosts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddToFeatured = (postId: string) => {
    const post = availablePosts.find(p => p.id === postId);
    if (!post) return;

    setFeaturedPosts([...featuredPosts, post]);
    setAvailablePosts(availablePosts.filter(p => p.id !== postId));
  };

  const handleRemoveFromFeatured = (postId: string) => {
    const post = featuredPosts.find(p => p.id === postId);
    if (!post) return;

    setAvailablePosts([...availablePosts, post]);
    setFeaturedPosts(featuredPosts.filter(p => p.id !== postId));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Update all posts - remove featured status from those not in the list
      const allPostIds = [...featuredPosts.map(p => p.id), ...availablePosts.map(p => p.id)];
      
      for (const postId of allPostIds) {
        const featuredIndex = featuredPosts.findIndex(p => p.id === postId);
        
        const { error } = await supabase
          .from('posts')
          .update({
            is_featured: featuredIndex !== -1,
            featured_order: featuredIndex !== -1 ? featuredIndex + 1 : null,
          })
          .eq('id', postId);

        if (error) throw error;
      }

      toast({
        title: "Featured posts updated",
        description: "Your homepage featured posts have been saved.",
      });
    } catch (error) {
      console.error('Error saving featured posts:', error);
      toast({
        title: "Save failed",
        description: "Failed to update featured posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Loading posts...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Featured Posts
          </CardTitle>
          <CardDescription>
            Drag and drop to reorder posts that appear at the top of your homepage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {featuredPosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Star className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>No featured posts yet</p>
              <p className="text-sm">Add posts from the available list below</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={featuredPosts.map(p => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {featuredPosts.map((post) => (
                    <SortablePost
                      key={post.id}
                      post={post}
                      onRemove={handleRemoveFromFeatured}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Featured Posts"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Posts</CardTitle>
          <CardDescription>
            Click to add posts to your featured section
          </CardDescription>
        </CardHeader>
        <CardContent>
          {availablePosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>All your published posts are featured!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {availablePosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{post.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {post.content}
                    </p>
                  </div>
                  
                  <Badge variant="outline">{post.category}</Badge>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToFeatured(post.id)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

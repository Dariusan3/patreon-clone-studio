import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Eye, Save, Send, Image as ImageIcon, FileText, Video } from "lucide-react";

interface PostData {
  title: string;
  content: string;
  category: string;
  visibility: "public" | "members";
  images: File[];
  videoEmbed: string;
  downloadableFiles: File[];
  status: "draft" | "published";
}

// Backend integration placeholders
const uploadImage = async (file: File): Promise<string> => {
  // TODO: Implement image upload to storage
  // const { data, error } = await supabase.storage
  //   .from('post-images')
  //   .upload(`${Date.now()}-${file.name}`, file);
  console.log("Uploading image:", file.name);
  return URL.createObjectURL(file);
};

const uploadFile = async (file: File): Promise<string> => {
  // TODO: Implement file upload to storage
  console.log("Uploading file:", file.name);
  return URL.createObjectURL(file);
};

const savePost = async (postData: PostData, isDraft: boolean) => {
  // TODO: Save post to database
  // const { data, error } = await supabase
  //   .from('posts')
  //   .insert({
  //     title: postData.title,
  //     content: postData.content,
  //     category: postData.category,
  //     visibility: postData.visibility,
  //     status: isDraft ? 'draft' : 'published',
  //     created_by: userId
  //   });
  console.log("Saving post:", { ...postData, status: isDraft ? "draft" : "published" });
};

const PostEditor = () => {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [postData, setPostData] = useState<PostData>({
    title: "",
    content: "",
    category: "art",
    visibility: "public",
    images: [],
    videoEmbed: "",
    downloadableFiles: [],
    status: "draft",
  });

  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages = [...postData.images, ...files];
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));

    setPostData({ ...postData, images: newImages });
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);

    toast({
      title: "Images added",
      description: `${files.length} image(s) added successfully.`,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newFiles = [...postData.downloadableFiles, ...files];
    const newFileNames = [...fileNames, ...files.map(f => f.name)];

    setPostData({ ...postData, downloadableFiles: newFiles });
    setFileNames(newFileNames);

    toast({
      title: "Files attached",
      description: `${files.length} file(s) attached successfully.`,
    });
  };

  const removeImage = (index: number) => {
    const newImages = postData.images.filter((_, i) => i !== index);
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);
    setPostData({ ...postData, images: newImages });
    setImagePreviewUrls(newPreviewUrls);
  };

  const removeFile = (index: number) => {
    const newFiles = postData.downloadableFiles.filter((_, i) => i !== index);
    const newFileNames = fileNames.filter((_, i) => i !== index);
    setPostData({ ...postData, downloadableFiles: newFiles });
    setFileNames(newFileNames);
  };

  const handleSaveDraft = async () => {
    if (!postData.title) {
      toast({
        title: "Title required",
        description: "Please add a title before saving.",
        variant: "destructive",
      });
      return;
    }

    try {
      await savePost(postData, true);
      toast({
        title: "Draft saved",
        description: "Your post has been saved as a draft.",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePublish = async () => {
    if (!postData.title || !postData.content) {
      toast({
        title: "Missing information",
        description: "Please add title and content before publishing.",
        variant: "destructive",
      });
      return;
    }

    try {
      await savePost(postData, false);
      toast({
        title: "Post published",
        description: "Your post is now live!",
      });
      
      // Reset form
      setPostData({
        title: "",
        content: "",
        category: "art",
        visibility: "public",
        images: [],
        videoEmbed: "",
        downloadableFiles: [],
        status: "draft",
      });
      setImagePreviewUrls([]);
      setFileNames([]);
    } catch (error) {
      toast({
        title: "Publish failed",
        description: "Failed to publish post. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (showPreview) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Preview</CardTitle>
              <CardDescription>This is how your post will appear</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Back to Editor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge>{postData.category}</Badge>
                <Badge variant={postData.visibility === "members" ? "default" : "secondary"}>
                  {postData.visibility === "members" ? "Members Only" : "Public"}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mb-4">{postData.title || "Untitled Post"}</h1>
              <p className="text-muted-foreground whitespace-pre-wrap">{postData.content || "No content yet."}</p>
            </div>

            {imagePreviewUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {imagePreviewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                ))}
              </div>
            )}

            {postData.videoEmbed && (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Video className="w-12 h-12 text-muted-foreground" />
              </div>
            )}

            {fileNames.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Downloadable Files</h3>
                <div className="space-y-2">
                  {fileNames.map((name, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Fill in the details to create a new post for your community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter post title..."
              value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your post content..."
              rows={8}
              value={postData.content}
              onChange={(e) => setPostData({ ...postData, content: e.target.value })}
            />
          </div>

          {/* Category & Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={postData.category} onValueChange={(value) => setPostData({ ...postData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="exclusive">Exclusive</SelectItem>
                  <SelectItem value="updates">Updates</SelectItem>
                  <SelectItem value="bts">Behind the Scenes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visibility">Visibility</Label>
              <div className="flex items-center space-x-2 h-10">
                <Switch
                  id="visibility"
                  checked={postData.visibility === "members"}
                  onCheckedChange={(checked) => 
                    setPostData({ ...postData, visibility: checked ? "members" : "public" })
                  }
                />
                <Label htmlFor="visibility" className="cursor-pointer">
                  {postData.visibility === "members" ? "Members Only" : "Public"}
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Images</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Images
              </Button>
              <span className="text-sm text-muted-foreground">
                {postData.images.length} image(s) selected
              </span>
            </div>

            {imagePreviewUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Upload ${index + 1}`}
                      className="rounded-lg w-full h-32 object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video Embed */}
          <div className="space-y-2">
            <Label htmlFor="video">Video Embed URL (YouTube, Vimeo, etc.)</Label>
            <Input
              id="video"
              placeholder="https://youtube.com/watch?v=..."
              value={postData.videoEmbed}
              onChange={(e) => setPostData({ ...postData, videoEmbed: e.target.value })}
            />
          </div>

          <Separator />

          {/* Downloadable Files */}
          <div className="space-y-2">
            <Label>Downloadable Files (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <FileText className="w-4 h-4 mr-2" />
                Attach Files
              </Button>
              <span className="text-sm text-muted-foreground">
                {postData.downloadableFiles.length} file(s) attached
              </span>
            </div>

            {fileNames.length > 0 && (
              <div className="space-y-2 mt-4">
                {fileNames.map((name, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={() => setShowPreview(true)}>
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button variant="secondary" onClick={handleSaveDraft}>
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button variant="gradient" onClick={handlePublish}>
          <Send className="w-4 h-4 mr-2" />
          Publish
        </Button>
      </div>
    </div>
  );
};

export default PostEditor;

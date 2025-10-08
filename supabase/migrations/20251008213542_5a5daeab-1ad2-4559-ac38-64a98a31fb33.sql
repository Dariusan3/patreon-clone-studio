-- Create posts table with secure content
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Art',
  is_locked BOOLEAN DEFAULT false,
  required_tier TEXT,
  is_featured BOOLEAN DEFAULT false,
  featured_order INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create post_files table for secure file attachments
CREATE TABLE public.post_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  is_downloadable BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Public can view published, non-locked posts
CREATE POLICY "Anyone can view published free posts"
ON public.posts FOR SELECT
USING (is_published = true AND is_locked = false);

-- Authenticated users can view their own posts
CREATE POLICY "Users can view own posts"
ON public.posts FOR SELECT
USING (auth.uid() = user_id);

-- Authenticated users can insert their own posts
CREATE POLICY "Users can create own posts"
ON public.posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own posts
CREATE POLICY "Users can update own posts"
ON public.posts FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete own posts"
ON public.posts FOR DELETE
USING (auth.uid() = user_id);

-- Enable RLS on post_files
ALTER TABLE public.post_files ENABLE ROW LEVEL SECURITY;

-- Only post owners can manage files
CREATE POLICY "Post owners can manage files"
ON public.post_files FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.posts
    WHERE posts.id = post_files.post_id
    AND posts.user_id = auth.uid()
  )
);

-- Create storage bucket for post content
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'post-content',
  'post-content',
  false,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'application/pdf', 'application/zip']
);

-- RLS for post content storage - only authenticated users can upload
CREATE POLICY "Authenticated users can upload post content"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'post-content');

-- Only file owners can delete
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'post-content' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for posts
CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
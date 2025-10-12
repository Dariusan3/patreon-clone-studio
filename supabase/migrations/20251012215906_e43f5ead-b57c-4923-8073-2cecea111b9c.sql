-- Create membership tiers table
CREATE TABLE public.membership_tiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  benefits TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user subscriptions table
CREATE TABLE public.user_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier_id UUID NOT NULL REFERENCES membership_tiers(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id)
);

-- Create shop items table
CREATE TABLE public.shop_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  tier_required UUID REFERENCES membership_tiers(id),
  file_url TEXT,
  image_url TEXT,
  stock_quantity INTEGER,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.membership_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for membership_tiers
CREATE POLICY "Anyone can view membership tiers"
  ON public.membership_tiers FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage membership tiers"
  ON public.membership_tiers FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for user_subscriptions
CREATE POLICY "Users can view their own subscription"
  ON public.user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions"
  ON public.user_subscriptions FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage subscriptions"
  ON public.user_subscriptions FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for shop_items
CREATE POLICY "Anyone can view available shop items"
  ON public.shop_items FOR SELECT
  USING (is_available = true);

CREATE POLICY "Admins can view all shop items"
  ON public.shop_items FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage shop items"
  ON public.shop_items FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Create trigger for shop_items updated_at
CREATE TRIGGER update_shop_items_updated_at
  BEFORE UPDATE ON public.shop_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for shop items
INSERT INTO storage.buckets (id, name, public)
VALUES ('shop-items', 'shop-items', false);

-- Storage policies for shop items
CREATE POLICY "Admins can upload shop items"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'shop-items' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update shop items"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'shop-items' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete shop items"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'shop-items' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can view shop items"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'shop-items' AND auth.role() = 'authenticated');

-- Enable realtime for posts table
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;
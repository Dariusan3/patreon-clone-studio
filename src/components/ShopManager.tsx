import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ShopItem {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
}

export function ShopManager() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShopItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('shop_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching shop items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch shop items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const itemData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
      };

      if (editingItem) {
        const { error } = await supabase
          .from('shop_items')
          .update(itemData)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Shop item updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('shop_items')
          .insert([itemData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Shop item created successfully",
        });
      }

      setIsDialogOpen(false);
      setFormData({ title: "", description: "", price: "" });
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      console.error('Error saving shop item:', error);
      toast({
        title: "Error",
        description: "Failed to save shop item",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase
        .from('shop_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Shop item deleted successfully",
      });
      fetchItems();
    } catch (error) {
      console.error('Error deleting shop item:', error);
      toast({
        title: "Error",
        description: "Failed to delete shop item",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (item: ShopItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      price: item.price.toString(),
    });
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Shop Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Shop Items
        </CardTitle>
        <CardDescription>
          Manage your merchandise and digital products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-6" onClick={() => {
              setEditingItem(null);
              setFormData({ title: "", description: "", price: "" });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Shop Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit' : 'Add'} Shop Item</DialogTitle>
                <DialogDescription>
                  {editingItem ? 'Update' : 'Create a new'} shop item for your store
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingItem ? 'Update' : 'Create'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Package className="h-16 w-16 text-muted-foreground" />
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">No shop items yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Start selling merchandise, art prints, or digital downloads to your supporters.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>${item.price}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {item.description && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

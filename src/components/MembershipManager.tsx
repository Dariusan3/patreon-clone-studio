import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Crown, Plus, Edit, Trash2, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MembershipTier {
  id: string;
  name: string;
  description: string | null;
  price: number;
  created_at: string;
}

export function MembershipManager() {
  const [tiers, setTiers] = useState<MembershipTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<MembershipTier | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      const { data, error } = await supabase
        .from('membership_tiers')
        .select('*')
        .order('price', { ascending: true });

      if (error) throw error;
      setTiers(data || []);
    } catch (error) {
      console.error('Error fetching membership tiers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch membership tiers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const tierData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
      };

      if (editingTier) {
        const { error } = await supabase
          .from('membership_tiers')
          .update(tierData)
          .eq('id', editingTier.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Membership tier updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('membership_tiers')
          .insert([tierData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Membership tier created successfully",
        });
      }

      setIsDialogOpen(false);
      setFormData({ name: "", description: "", price: "" });
      setEditingTier(null);
      fetchTiers();
    } catch (error) {
      console.error('Error saving membership tier:', error);
      toast({
        title: "Error",
        description: "Failed to save membership tier",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tier?')) return;

    try {
      const { error } = await supabase
        .from('membership_tiers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Membership tier deleted successfully",
      });
      fetchTiers();
    } catch (error) {
      console.error('Error deleting membership tier:', error);
      toast({
        title: "Error",
        description: "Failed to delete membership tier",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (tier: MembershipTier) => {
    setEditingTier(tier);
    setFormData({
      name: tier.name,
      description: tier.description || "",
      price: tier.price.toString(),
    });
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Membership Tiers
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
          <Crown className="h-5 w-5" />
          Membership Tiers
        </CardTitle>
        <CardDescription>
          Create and manage your membership subscription tiers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-6" onClick={() => {
              setEditingTier(null);
              setFormData({ name: "", description: "", price: "" });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Create Membership Tier
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingTier ? 'Edit' : 'Create'} Membership Tier</DialogTitle>
                <DialogDescription>
                  {editingTier ? 'Update' : 'Create a new'} membership tier with pricing and benefits
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Supporter, Enthusiast"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the benefits of this tier"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Monthly Price ($)</Label>
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
                <Button type="submit">{editingTier ? 'Update' : 'Create'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {tiers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Crown className="h-16 w-16 text-muted-foreground" />
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">No membership tiers configured</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Set up tiered memberships with different benefits and pricing to monetize your content.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {tiers.map((tier) => (
              <Card key={tier.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{tier.name}</CardTitle>
                      <CardDescription className="text-2xl font-bold mt-2">
                        ${tier.price}/month
                      </CardDescription>
                      {tier.description && (
                        <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(tier)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(tier.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

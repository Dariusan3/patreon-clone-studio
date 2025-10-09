import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Palette, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SiteDesignManager() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your site design settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Site Branding
          </CardTitle>
          <CardDescription>
            Customize your creator page appearance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="creator-name">Creator Name</Label>
            <Input id="creator-name" placeholder="Your Name" defaultValue="Creator" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" placeholder="Your creative tagline" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              placeholder="Tell your supporters about yourself..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="primary-color" 
                  type="color" 
                  defaultValue="#ff5900"
                  className="h-10 w-20"
                />
                <Input 
                  value="#ff5900" 
                  readOnly
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="accent-color" 
                  type="color" 
                  defaultValue="#ffa500"
                  className="h-10 w-20"
                />
                <Input 
                  value="#ffa500" 
                  readOnly
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Header & Footer</CardTitle>
          <CardDescription>
            Customize navigation and footer content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="header-links">Navigation Links (comma-separated)</Label>
            <Input 
              id="header-links" 
              placeholder="Home, Posts, Membership, Shop"
              defaultValue="Home, Posts, Membership, Shop"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="footer-text">Footer Text</Label>
            <Textarea 
              id="footer-text" 
              placeholder="© 2025 Your Name. All rights reserved."
              className="min-h-[60px]"
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

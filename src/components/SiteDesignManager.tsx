import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Palette, Save, Upload, Sparkles, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SiteDesignManager() {
  const { toast } = useToast();
  const [primaryColor, setPrimaryColor] = useState("#ff5900");
  const [accentColor, setAccentColor] = useState("#ffa500");
  const [backgroundColor, setBackgroundColor] = useState("#fcfcfc");

  const handleSave = () => {
    // Update CSS variables
    document.documentElement.style.setProperty('--primary', convertToHSL(primaryColor));
    document.documentElement.style.setProperty('--accent-foreground', convertToHSL(accentColor));
    document.documentElement.style.setProperty('--background', convertToHSL(backgroundColor));
    
    toast({
      title: "Design updated",
      description: "Your site design has been applied successfully.",
    });
  };

  const handleRefreshDesign = () => {
    // Generate random colors in the orange/warm spectrum
    const randomOrange = `#${Math.floor(Math.random() * 100 + 200).toString(16)}${Math.floor(Math.random() * 80 + 80).toString(16)}00`;
    const randomAccent = `#${Math.floor(Math.random() * 100 + 200).toString(16)}${Math.floor(Math.random() * 100 + 120).toString(16)}${Math.floor(Math.random() * 50).toString(16)}`;
    const randomBg = `#${Math.floor(Math.random() * 20 + 245).toString(16)}${Math.floor(Math.random() * 20 + 245).toString(16)}${Math.floor(Math.random() * 20 + 245).toString(16)}`;
    
    setPrimaryColor(randomOrange);
    setAccentColor(randomAccent);
    setBackgroundColor(randomBg);
    
    // Apply immediately
    document.documentElement.style.setProperty('--primary', convertToHSL(randomOrange));
    document.documentElement.style.setProperty('--accent-foreground', convertToHSL(randomAccent));
    document.documentElement.style.setProperty('--background', convertToHSL(randomBg));
    
    toast({
      title: "Design refreshed!",
      description: "Your site has a fresh new look. You can tweak it further or save it.",
    });
  };

  const convertToHSL = (hex: string): string => {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
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

          <div className="space-y-2">
            <Label htmlFor="banner-image">Banner Image</Label>
            <div className="flex gap-2">
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Banner
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended: 1920x400px, max 2MB
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="background-image">Background Pattern</Label>
            <div className="flex gap-2">
              <Button variant="outline" className="w-full">
                <ImageIcon className="mr-2 h-4 w-4" />
                Upload Background
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Optional: Subtle pattern or texture
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex flex-col gap-2">
                <Input 
                  id="primary-color" 
                  type="color" 
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-10 w-full"
                />
                <Input 
                  value={primaryColor} 
                  readOnly
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="flex flex-col gap-2">
                <Input 
                  id="accent-color" 
                  type="color" 
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="h-10 w-full"
                />
                <Input 
                  value={accentColor} 
                  readOnly
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background-color">Background</Label>
              <div className="flex flex-col gap-2">
                <Input 
                  id="background-color" 
                  type="color" 
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="h-10 w-full"
                />
                <Input 
                  value={backgroundColor} 
                  readOnly
                  className="text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleRefreshDesign} variant="outline" className="flex-1">
              <Sparkles className="mr-2 h-4 w-4" />
              Refresh Design
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
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

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const FilterPostsModal = () => {
  const [postType, setPostType] = useState("video");
  const [postAccess, setPostAccess] = useState("any_tier");
  const [sortBy, setSortBy] = useState("newest_first");
  const [datePublished, setDatePublished] = useState<string[]>([]);

  const handleDatePublishedChange = (value: string) => {
    setDatePublished((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleApplyFilters = () => {
    console.log({
      postType,
      postAccess,
      sortBy,
      datePublished,
    });
    // In a real application, you would apply these filters to your post data
  };

  const handleClearAll = () => {
    setPostType("video");
    setPostAccess("any_tier");
    setSortBy("newest_first");
    setDatePublished([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="6" x2="3" y1="20" y2="20"/><path d="M14 2v4"/><path d="M8 10v4"/><path d="M16 18v4"/></svg>
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Posts</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Post Type */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Post type</p>
            <div className="flex space-x-4">
              <Button 
                variant={postType === "video" ? "default" : "outline"}
                onClick={() => setPostType("video")}
                className="flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video mr-1"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="1" y="6" rx="2" ry="2"/></svg>
                Video (1)
              </Button>
              <Button
                variant={postType === "image" ? "default" : "outline"}
                onClick={() => setPostType("image")}
                className="flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image mr-1"><path d="M5 12V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9"/><path d="M22 8.5 16 2l-6 6"/><path d="M2 7h2"/><path d="M2 12h2"/><path d="M2 17h2"/></svg>
                Image (171)
              </Button>
            </div>
          </div>

          {/* Post Access */}
          <div className="space-y-2 mt-4">
            <p className="text-sm font-medium">Post access</p>
            <RadioGroup value={postAccess} onValueChange={setPostAccess} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any_tier" id="any_tier" />
                <Label htmlFor="any_tier">Any tier <span className="text-muted-foreground">(172)</span></Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public">Public <span className="text-muted-foreground">(3)</span></Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free_members" id="free_members" />
                <Label htmlFor="free_members">Free members <span className="text-muted-foreground">(3)</span></Label>
              </div>
            </RadioGroup>
          </div>

          {/* Sort By */}
          <div className="space-y-2 mt-4">
            <p className="text-sm font-medium">Sort by</p>
            <RadioGroup value={sortBy} onValueChange={setSortBy} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="newest_first" id="newest_first" />
                <Label htmlFor="newest_first">Newest first</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oldest_first" id="oldest_first" />
                <Label htmlFor="oldest_first">Oldest first</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Date Published */}
          <div className="space-y-2 mt-4">
            <p className="text-sm font-medium">Date published</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="any_date"
                  checked={datePublished.includes("any_date")}
                  onCheckedChange={() => handleDatePublishedChange("any_date")}
                />
                <Label htmlFor="any_date">Any date</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="this_month"
                  checked={datePublished.includes("this_month")}
                  onCheckedChange={() => handleDatePublishedChange("this_month")}
                />
                <Label htmlFor="this_month">This month <span className="text-muted-foreground">(10)</span></Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="2025"
                  checked={datePublished.includes("2025")}
                  onCheckedChange={() => handleDatePublishedChange("2025")}
                />
                <Label htmlFor="2025">2025 <span className="text-muted-foreground">(15)</span></Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="2024"
                  checked={datePublished.includes("2024")}
                  onCheckedChange={() => handleDatePublishedChange("2024")}
                />
                <Label htmlFor="2024">2024 <span className="text-muted-foreground">(15)</span></Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4 flex sm:justify-between">
          <Button variant="ghost" onClick={handleClearAll}>Clear all</Button>
          <Button type="submit" onClick={handleApplyFilters}>Apply filter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

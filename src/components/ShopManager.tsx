import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";

export function ShopManager() {
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
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Package className="h-16 w-16 text-muted-foreground" />
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">No shop items yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Start selling merchandise, art prints, or digital downloads to your supporters.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Shop Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

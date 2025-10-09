import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Plus } from "lucide-react";

export function MembershipManager() {
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
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Crown className="h-16 w-16 text-muted-foreground" />
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">No membership tiers configured</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Set up tiered memberships with different benefits and pricing to monetize your content.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Membership Tier
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

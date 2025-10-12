import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Crown, Zap, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface MembershipTier {
  id: string;
  name: string;
  price: number;
  description: string | null;
}

const mockTiers = [
  {
    id: "supporter",
    name: "Supporter",
    price: 5,
    icon: Star,
    description: "Perfect for art enthusiasts who want to support the creative journey",
    popular: false,
    features: [
      "Early access to all new artworks",
      "Exclusive Discord community access",
      "Monthly behind-the-scenes content",
      "Digital supporter badge",
      "Monthly progress updates",
      "Access to work-in-progress previews"
    ],
    benefits: [
      "Support independent art creation",
      "Join a community of 400+ art lovers",
      "Get insights into the creative process"
    ]
  },
  {
    id: "enthusiast", 
    name: "Art Enthusiast",
    price: 15,
    icon: Crown,
    description: "For dedicated fans who want premium content and exclusive perks",
    popular: true,
    features: [
      "Everything from Supporter tier",
      "High-resolution artwork downloads (4K+)",
      "Exclusive process videos and tutorials",
      "Monthly 1-on-1 feedback session (15 min)",
      "Commission priority queue",
      "Custom wallpaper collections",
      "Monthly art challenges with prizes",
      "Early access to limited edition prints"
    ],
    benefits: [
      "Learn professional digital art techniques",
      "Get personalized feedback on your work",
      "Priority access to commission slots"
    ]
  },
  {
    id: "collector",
    name: "Collector",
    price: 50,
    icon: Zap,
    description: "Ultimate tier with personal perks and exclusive collector benefits",
    popular: false,
    features: [
      "Everything from previous tiers",
      "Monthly signed limited edition prints (shipped)",
      "Extended monthly video call (30 min)",
      "2 custom artwork requests per year",
      "Exclusive physical merchandise",
      "Your name in artwork credits",
      "Annual holiday card with original sketch",
      "Access to private collector's gallery",
      "First access to original artwork sales"
    ],
    benefits: [
      "Own physical pieces of the art collection",
      "Direct influence on artwork direction",
      "Exclusive collector status and recognition"
    ]
  }
]

// Placeholder function - would connect to auth/subscription service
const getUserSubscription = () => {
  // TODO: Implement actual subscription check
  // return supabase.from('user_subscriptions').select('tier').eq('user_id', user.id)
  return null
}

// Placeholder function - would check if user has access to specific tier content
const hasAccessToTier = (tierId: string) => {
  // TODO: Implement actual tier access check
  // const userTier = getUserSubscription()
  // return checkTierHierarchy(userTier, tierId)
  return false
}

export default function Membership() {
  const [tiers, setTiers] = useState<MembershipTier[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const isAuthenticated = false;
  const userTier = null;

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
      console.error('Error fetching tiers:', error);
      toast({
        title: "Error",
        description: "Failed to load membership tiers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTier = (tierId: string) => {
    // TODO: Implement subscription logic
    if (!isAuthenticated) {
      // Redirect to auth page
      console.log("Redirect to login")
      return
    }
    
    // TODO: Handle subscription upgrade/downgrade
    console.log(`Joining tier: ${tierId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Membership Tiers</h1>
              <p className="text-muted-foreground">Choose the perfect tier for your creative journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Creative Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Support independent art creation and get exclusive access to premium content, 
            tutorials, and a thriving community of fellow art enthusiasts.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <span>431+ Active Members</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-primary" />
              <span>159+ Exclusive Posts</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>New Content Weekly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : tiers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No membership tiers available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {tiers.map((tier, index) => {
                const Icon = index === 0 ? Star : index === 1 ? Crown : Zap;
                const isPopular = index === 1;
                const isCurrentTier = false;
                
                return (
                  <Card 
                    key={tier.id} 
                    className={cn(
                      "relative bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 h-fit",
                      isPopular && "border-primary shadow-patreon scale-105 lg:scale-110"
                    )}
                  >
                    {isPopular && (
                      <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    )}
                    
                    {isCurrentTier && (
                      <Badge className="absolute -top-2 right-4 bg-green-500 text-white">
                        Current Plan
                      </Badge>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto mb-4 p-4 rounded-full bg-accent w-fit">
                        <Icon className="w-8 h-8 text-accent-foreground" />
                      </div>
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {tier.description || "Premium membership benefits"}
                      </CardDescription>
                      <div className="pt-6">
                        <div className="text-4xl font-bold text-primary">
                          ${tier.price}
                          <span className="text-lg font-normal text-muted-foreground">
                            /month
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-accent-foreground">What's included:</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Access to exclusive content</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Priority support</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Early access to new releases</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-6">
                      <Button 
                        onClick={() => handleJoinTier(tier.id)}
                        disabled={isCurrentTier}
                        variant={isPopular ? "gradient" : "outline"}
                        size="lg"
                        className="w-full"
                      >
                        {isCurrentTier 
                          ? "Current Plan" 
                          : `Join for $${tier.price}/month`
                        }
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="grid gap-6 text-left">
              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-lg">Can I change or cancel my membership anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes! You can upgrade, downgrade, or cancel your membership at any time. 
                    Your access will continue until the end of your billing period.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-lg">What happens to my downloads if I cancel?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All content you've downloaded during your membership remains yours forever. 
                    You'll only lose access to future exclusive content and community features.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-lg">Is there a discount for annual subscriptions?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Annual subscribers save 15% on all tiers! Contact us directly to set up 
                    an annual subscription and start saving immediately.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
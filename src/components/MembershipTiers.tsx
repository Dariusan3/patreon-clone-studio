import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Crown, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const tiers = [
  {
    id: "supporter",
    name: "Supporter",
    price: 5,
    icon: Star,
    description: "Get early access to my work and join the community",
    popular: false,
    features: [
      "Early access to artworks",
      "Community Discord access",
      "Monthly behind-the-scenes content",
      "Supporter badge"
    ]
  },
  {
    id: "enthusiast", 
    name: "Art Enthusiast",
    price: 15,
    icon: Crown,
    description: "For true art lovers who want exclusive content",
    popular: true,
    features: [
      "Everything from Supporter tier",
      "High-resolution downloads",
      "Process videos and tutorials",
      "Monthly 1-on-1 feedback session",
      "Commission priority queue"
    ]
  },
  {
    id: "collector",
    name: "Collector",
    price: 50,
    icon: Zap,
    description: "Ultimate access with personal perks",
    popular: false,
    features: [
      "Everything from previous tiers",
      "Limited edition prints",
      "Monthly video call",
      "Custom artwork requests",
      "Physical merchandise",
      "Name in credits"
    ]
  }
]

export function MembershipTiers() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose your membership
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Support my creative journey and get exclusive perks, early access, and behind-the-scenes content.
          </p>
          <Button variant="outline" asChild>
            <Link to="/membership">View All Tiers & Details</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => {
            const Icon = tier.icon
            return (
              <Card 
                key={tier.id} 
                className={cn(
                  "relative bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300",
                  tier.popular && "border-primary shadow-patreon scale-105"
                )}
              >
                {tier.popular && (
                  <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-accent w-fit">
                    <Icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {tier.description}
                  </CardDescription>
                  <div className="pt-4">
                    <div className="text-3xl font-bold text-primary">
                      ${tier.price}
                      <span className="text-base font-normal text-muted-foreground">
                        /month
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    variant={tier.popular ? "gradient" : "outline"}
                    className="w-full"
                  >
                    Join for ${tier.price}/month
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
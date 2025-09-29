import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  MapPin, 
  Calendar, 
  Globe, 
  Twitter, 
  Instagram, 
  Youtube,
  Users,
  TrendingUp,
  Award
} from "lucide-react"

const socialLinks = [
  { platform: "Website", icon: Globe, url: "#", color: "text-blue-500" },
  { platform: "Twitter", icon: Twitter, url: "#", color: "text-blue-400" },
  { platform: "Instagram", icon: Instagram, url: "#", color: "text-pink-500" },
  { platform: "YouTube", icon: Youtube, url: "#", color: "text-red-500" },
]

const achievements = [
  { label: "Top 1% Creator", icon: Award },
  { label: "100+ Members", icon: Users },
  { label: "Growing Fast", icon: TrendingUp },
]

export function CreatorSidebar() {
  return (
    <div className="space-y-6">
      {/* Creator Info */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">About this creator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Los Angeles, CA</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Creating since March 2023</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Achievements</h4>
            <div className="space-y-2">
              {achievements.map((achievement) => (
                <div key={achievement.label} className="flex items-center gap-2">
                  <achievement.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm">{achievement.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Stats */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Community</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">431</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">159</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold">$2,155</div>
            <div className="text-sm text-muted-foreground">monthly income</div>
            <Badge variant="secondary" className="mt-1 text-xs">
              +12% this month
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Follow me</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {socialLinks.map((social) => (
              <Button
                key={social.platform}
                variant="ghost"
                className="w-full justify-start p-3 h-auto hover:bg-accent"
                asChild
              >
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  <social.icon className={`w-5 h-5 mr-3 ${social.color}`} />
                  <span>{social.platform}</span>
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Supporters */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Recent supporters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {["Alex M.", "Sarah K.", "Mike R.", "Emma L."].map((name, index) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {name.charAt(0)}
                  </div>
                  <span className="text-sm">{name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  ${[15, 5, 50, 15][index]}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
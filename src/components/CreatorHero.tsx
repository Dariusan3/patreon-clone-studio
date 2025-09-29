import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, FileText, ExternalLink } from "lucide-react"
import heroBg from "@/assets/hero-bg.jpg"
import creatorAvatar from "@/assets/creator-avatar.jpg"

export function CreatorHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-gradient-hero"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Creator Profile */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="relative">
              <img
                src={creatorAvatar}
                alt="Creator Avatar"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-elevated"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                <Heart className="w-4 h-4 fill-current" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  𓆩Yours Biro𓆪
                </h1>
                <Badge variant="secondary" className="text-xs">
                  Verified Creator
                </Badge>
              </div>
              
              <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
                Creating stunning digital art and sharing the creative journey with amazing supporters. 
                Join me as we explore new artistic horizons together.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">431 members</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">159 posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="font-medium">1.2K likes</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button variant="gradient" size="lg">
                  Become a member
                </Button>
                <Button variant="outline" size="lg" className="border-primary/20">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
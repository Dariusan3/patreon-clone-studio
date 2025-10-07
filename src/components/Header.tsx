import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Search, Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { label: "Home", href: "/", active: location.pathname === "/" },
    { label: "Posts", href: "#" },
    { label: "Membership", href: "/membership", active: location.pathname === "/membership" },
    { label: "Shop", href: "/shop", active: location.pathname === "/shop" },
    { label: "Dashboard", href: "/dashboard", active: location.pathname === "/dashboard" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="font-bold text-xl text-primary">Creator</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant={item.active ? "default" : "ghost"}
                className={cn(
                  "relative",
                  item.active && "bg-primary text-primary-foreground"
                )}
                asChild
              >
                <Link to={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Button variant="gradient" className="hidden md:flex">
              Join Now
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant={item.active ? "default" : "ghost"}
                  className="justify-start"
                  asChild
                >
                  <Link to={item.href}>{item.label}</Link>
                </Button>
              ))}
              <Button variant="gradient" className="justify-start">
                Join Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
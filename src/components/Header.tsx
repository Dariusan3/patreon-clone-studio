import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { NotificationBell } from "@/components/NotificationBell"
import { Search, Menu, X, LogOut, User } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, userRole, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  const navItems = [
    { label: "Home", href: "/", active: location.pathname === "/" },
    { label: "Posts", href: "#" },
    { label: "Membership", href: "/membership", active: location.pathname === "/membership" },
    { label: "Shop", href: "/shop", active: location.pathname === "/shop" },
  ]

  // Only show Dashboard link for admin users
  if (userRole === 'admin') {
    navItems.push({ label: "Dashboard", href: "/dashboard", active: location.pathname === "/dashboard" })
  }

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
            {user && <NotificationBell />}
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getInitials(user.email || '')}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.email}</p>
                      <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {userRole === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" className="hidden md:flex">
                  <Link to="/member-login">Sign In</Link>
                </Button>
                <Button asChild variant="gradient" className="hidden md:flex">
                  <Link to="/signup">Join Now</Link>
                </Button>
              </>
            )}
            
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
              {user ? (
                <>
                  {userRole === 'admin' && (
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                  )}
                  <Button variant="ghost" onClick={handleSignOut} className="justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/member-login">Sign In</Link>
                  </Button>
                  <Button variant="gradient" className="justify-start" asChild>
                    <Link to="/signup">Join Now</Link>
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

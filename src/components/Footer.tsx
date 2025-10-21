import { Feather } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-10 border-t mt-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Feather className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-primary">Yours Bird</span>
            </div>
            <span className="text-muted-foreground text-sm">© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm">
            <a href="#" className="hover:text-primary-foreground transition-colors">About</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Contact</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

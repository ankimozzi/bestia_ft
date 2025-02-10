import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const Layout = () => {
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="w-full px-6 flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-8 w-16 rounded-lg bg-white flex items-center justify-center">
              <span className="text-lg font-bold text-blue-600">Bestia</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search properties..."
              className="border rounded-full p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-white bg-white shadow-inner"
              aria-label="Search properties"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {/* <Link
              to="/search"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors text-white",
                isActiveLink("/search")
                  ? "bg-white text-blue-600"
                  : "hover:bg-white/80"
              )}
            >
              Search Properties
            </Link>
            <Link
              to="/map"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors text-white",
                isActiveLink("/map")
                  ? "bg-white text-blue-600"
                  : "hover:bg-white/80"
              )}
            >
              View Map
            </Link>
            <Link
              to="/favorites"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors text-white",
                isActiveLink("/favorites")
                  ? "bg-white text-blue-600"
                  : "hover:bg-white/80"
              )}
            >
              Favorites
            </Link> */}
          </nav>

          {/* Auth Buttons & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/login" className="text-white">
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link to="/register" className="text-white">
                  Sign Up
                </Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white">
                <DropdownMenuItem asChild>
                  <Link to="/search">Search Properties</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/map">View Map</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favorites">Favorites</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register">Sign Up</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

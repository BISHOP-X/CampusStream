import { Home, Grid3x3, Bookmark, Building2, Settings, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/mockData";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Categories", href: "/categories", icon: Grid3x3 },
  { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { name: "Departments", href: "/departments", icon: Building2 },
  { name: "Settings", href: "/profile", icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation();
  const isLecturerOrAdmin = currentUser.role === 'lecturer' || currentUser.role === 'admin';

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 glass border-r transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentUser.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{currentUser.name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {currentUser.department}
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {isLecturerOrAdmin && (
            <div className="p-4 border-t">
              <Link to="/create">
                <Button className="w-full gradient-primary" size="lg" onClick={onClose}>
                  <Plus className="h-5 w-5 mr-2" />
                  Create Post
                </Button>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

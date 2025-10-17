import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Categories() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Define categories with their metadata
  const categories = [
    { name: 'Academic', icon: '📚', color: 'bg-blue-500' },
    { name: 'Events', icon: '🎉', color: 'bg-purple-500' },
    { name: 'Sports', icon: '⚽', color: 'bg-green-500' },
    { name: 'Student Affairs', icon: '👥', color: 'bg-yellow-500' },
    { name: 'Urgent', icon: '⚠️', color: 'bg-red-500' },
    { name: 'General', icon: '📢', color: 'bg-gray-500' },
    { name: 'Administrative', icon: '🏛️', color: 'bg-indigo-500' },
  ];

  // Fetch announcement counts per category
  const { data: categoryCounts, isLoading, error } = useQuery({
    queryKey: ['category-counts'],
    queryFn: async () => {
      const counts: Record<string, number> = {};
      
      // Fetch count for each category
      for (const category of categories) {
        const { count, error } = await supabase
          .from('announcements')
          .select('*', { count: 'exact', head: true })
          .eq('category', category.name.toLowerCase().replace(/\s+/g, '_'))
          .eq('is_deleted', false);
        
        if (!error) {
          counts[category.name] = count || 0;
        }
      }
      
      return counts;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Categories</h1>
            <p className="text-muted-foreground text-lg">
              Explore news by category to find what interests you
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load category counts. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-8 animate-pulse"
                >
                  <div className={`w-16 h-16 ${category.color} rounded-xl mb-4`} />
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const count = categoryCounts?.[category.name] || 0;
                return (
                  <button
                    key={index}
                    onClick={() => navigate(`/dashboard?category=${category.name}`)}
                    className="glass rounded-2xl p-8 hover:shadow-lg transition-smooth text-left group animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center text-white text-3xl mb-4 group-hover:scale-110 transition-smooth`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-smooth">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {count} {count === 1 ? 'post' : 'posts'}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

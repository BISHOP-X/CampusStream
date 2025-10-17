import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { NewsCard } from "@/components/NewsCard";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { NewsGridSkeleton } from "@/components/LoadingStates";
import { NoNewsFound } from "@/components/EmptyStates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockNews, currentUser } from "@/lib/mockData";
import { Calendar, TrendingUp } from "lucide-react";
import { testConnection } from "@/lib/testSupabase";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Test Supabase connection on mount
  useEffect(() => {
    testConnection();
  }, []);
  const [activeFilter, setActiveFilter] = useState("all");
  const [bookmarkedNews, setBookmarkedNews] = useState<string[]>(['2', '5', '10', '18', '19']);
  const [isLoading, setIsLoading] = useState(false);

  const filters = [
    { id: "all", label: "All News" },
    { id: "department", label: "My Department" },
    { id: "urgent", label: "Urgent" },
    { id: "events", label: "Events" },
    { id: "academic", label: "Academic" },
  ];

  const handleBookmark = (id: string) => {
    setBookmarkedNews((prev) =>
      prev.includes(id) ? prev.filter((nid) => nid !== id) : [...prev, id]
    );
  };

  const filteredNews = mockNews.map(news => ({
    ...news,
    isBookmarked: bookmarkedNews.includes(news.id)
  })).filter((news) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "department") return news.department === currentUser.department;
    if (activeFilter === "urgent") return news.priority === "urgent";
    if (activeFilter === "events") return news.category === "Event";
    if (activeFilter === "academic") return news.category === "Academic";
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {/* Welcome Banner */}
          <div className="glass rounded-2xl p-6 md:p-8 mb-8 gradient-primary animate-fade-in">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 text-white">
              Welcome back, {currentUser.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-white/90 text-lg">
              You have {filteredNews.filter(n => n.priority === 'urgent').length} urgent announcements today
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={activeFilter === filter.id ? "gradient-primary" : ""}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Total News</span>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">{filteredNews.length}</p>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Unread</span>
                <Badge className="bg-accent">{Math.floor(filteredNews.length * 0.3)}</Badge>
              </div>
              <p className="text-3xl font-bold">{Math.floor(filteredNews.length * 0.3)}</p>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Upcoming Events</span>
                <Calendar className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-3xl font-bold">
                {filteredNews.filter(n => n.category === 'Event').length}
              </p>
            </div>
          </div>

          {/* News Feed */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Latest Updates</h2>
            
            {isLoading ? (
              <NewsGridSkeleton count={6} />
            ) : filteredNews.length > 0 ? (
              <div className="grid gap-6">
                {filteredNews.map((news, index) => (
                  <div
                    key={news.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <NewsCard news={news} onBookmark={handleBookmark} />
                  </div>
                ))}
              </div>
            ) : (
              <NoNewsFound />
            )}
          </div>
        </main>
      </div>
      
      <FloatingActionButton />
    </div>
  );
}

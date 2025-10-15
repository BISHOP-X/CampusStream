import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { NewsCard } from "@/components/NewsCard";
import { mockNews } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

export default function Bookmarks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['2', '5']);

  const handleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((nid) => nid !== id) : [...prev, id]
    );
  };

  const bookmarkedNews = mockNews
    .filter((news) => bookmarkedIds.includes(news.id))
    .map(news => ({ ...news, isBookmarked: true }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Saved News</h1>
            <p className="text-muted-foreground text-lg">
              Your bookmarked articles and announcements
            </p>
          </div>

          {bookmarkedNews.length > 0 ? (
            <div className="space-y-6">
              {bookmarkedNews.map((news, index) => (
                <div
                  key={news.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <NewsCard news={news} onBookmark={handleBookmark} />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center animate-fade-in">
              <div className="text-6xl mb-4">🔖</div>
              <h3 className="text-2xl font-semibold mb-2">No bookmarks yet</h3>
              <p className="text-muted-foreground mb-6">
                Start saving news articles to read them later
              </p>
              <Button
                onClick={() => (window.location.href = "/dashboard")}
                className="gradient-primary"
              >
                Browse News
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

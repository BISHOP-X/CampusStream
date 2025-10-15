import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { NewsCard } from "@/components/NewsCard";
import { NoBookmarks } from "@/components/EmptyStates";
import { mockNews } from "@/lib/mockData";

export default function Bookmarks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['2', '5', '10', '18', '19']);

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
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <NewsCard news={news} onBookmark={handleBookmark} />
                </div>
              ))}
            </div>
          ) : (
            <NoBookmarks />
          )}
        </main>
      </div>
    </div>
  );
}

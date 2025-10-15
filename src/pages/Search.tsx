import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { NewsCard } from "@/components/NewsCard";
import { mockNews } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [searchResults, setSearchResults] = useState(mockNews);

  useEffect(() => {
    if (query.trim()) {
      const filtered = mockNews.filter(
        (news) =>
          news.title.toLowerCase().includes(query.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          news.content.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(mockNews);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Search News</h1>
            
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for news, announcements, events..."
                  className="pl-12 h-14 text-lg"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </form>

            {query && (
              <p className="text-muted-foreground mt-4">
                Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{query}"
              </p>
            )}
          </div>

          {searchResults.length > 0 ? (
            <div className="space-y-6">
              {searchResults.map((news, index) => (
                <div
                  key={news.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <NewsCard news={news} />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center animate-fade-in">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                Try different keywords or browse by category
              </p>
              <Button
                onClick={() => (window.location.href = "/categories")}
                className="gradient-primary"
              >
                Browse Categories
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

import { useParams, useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockNews } from "@/lib/mockData";
import { ArrowLeft, Bookmark, Share2, Flag, Clock, User } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { NewsCard } from "@/components/NewsCard";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const news = mockNews.find((n) => n.id === id);
  const relatedNews = mockNews
    .filter((n) => n.id !== id && (n.category === news?.category || n.department === news?.department))
    .slice(0, 3);

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">News Not Found</h1>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    Academic: "bg-primary/10 text-primary border-primary/20",
    Event: "bg-secondary/10 text-secondary border-secondary/20",
    Sport: "bg-success/10 text-success border-success/20",
    "Student Affairs": "bg-blue-500/10 text-blue-600 border-blue-500/20",
    Urgent: "bg-accent/10 text-accent border-accent/20",
    General: "bg-muted text-muted-foreground border-border",
    Administrative: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <article className="glass rounded-2xl p-6 md:p-10 mb-8 animate-fade-in">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className={categoryColors[news.category]}>
                  {news.category}
                </Badge>
                <Badge variant="outline">{news.department}</Badge>
                {news.priority === 'urgent' && (
                  <Badge className="bg-accent">Urgent</Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {news.title}
              </h1>

              <div className="flex items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{news.author.avatar}</span>
                  <div>
                    <p className="font-semibold text-foreground">{news.author.name}</p>
                    <p className="text-sm">{news.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatDistanceToNow(news.publishedAt, { addSuffix: true })}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 border-t border-b py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {news.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related News</h2>
              <div className="space-y-6">
                {relatedNews.map((relatedItem) => (
                  <NewsCard key={relatedItem.id} news={relatedItem} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

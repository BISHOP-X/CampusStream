import { NewsItem } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface NewsCardProps {
  news: NewsItem;
  onBookmark?: (id: string) => void;
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

export function NewsCard({ news, onBookmark }: NewsCardProps) {
  return (
    <div className="glass rounded-xl p-6 hover:shadow-lg transition-smooth group">
      {news.priority === 'urgent' && (
        <div className="flex items-center gap-2 mb-3 text-accent">
          <AlertCircle className="h-4 w-4 animate-pulse-glow" />
          <span className="text-sm font-semibold">Urgent</span>
        </div>
      )}
      
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={categoryColors[news.category]}>
              {news.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {news.department}
            </Badge>
          </div>
          <Link to={`/news/${news.id}`}>
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-smooth line-clamp-2">
              {news.title}
            </h3>
          </Link>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onBookmark?.(news.id)}
          className="shrink-0"
        >
          <Bookmark
            className={`h-5 w-5 ${news.isBookmarked ? 'fill-primary text-primary' : ''}`}
          />
        </Button>
      </div>

      <p className="text-muted-foreground mb-4 line-clamp-3">
        {news.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-xl">{news.author.avatar}</span>
          <span>{news.author.name}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formatDistanceToNow(news.publishedAt, { addSuffix: true })}</span>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Inbox,
  Search,
  Bookmark,
  Bell,
  FileX,
  AlertCircle,
} from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6 text-muted-foreground opacity-50">
        {icon || <Inbox className="h-24 w-24" />}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {action && (
        action.href ? (
          <Link to={action.href}>
            <Button>{action.label}</Button>
          </Link>
        ) : (
          <Button onClick={action.onClick}>{action.label}</Button>
        )
      )}
    </div>
  );
}

export function NoNewsFound() {
  return (
    <EmptyState
      icon={<FileX className="h-24 w-24" />}
      title="No News Found"
      description="There are no announcements matching your current filters. Try adjusting your search or check back later."
      action={{
        label: "Clear Filters",
        onClick: () => window.location.reload(),
      }}
    />
  );
}

export function NoSearchResults() {
  return (
    <EmptyState
      icon={<Search className="h-24 w-24" />}
      title="No Results Found"
      description="We couldn't find any news matching your search. Try different keywords or browse by category."
      action={{
        label: "Browse Categories",
        href: "/categories",
      }}
    />
  );
}

export function NoBookmarks() {
  return (
    <EmptyState
      icon={<Bookmark className="h-24 w-24" />}
      title="No Bookmarks Yet"
      description="You haven't saved any news items yet. Bookmark important announcements to easily find them later."
      action={{
        label: "Explore News",
        href: "/dashboard",
      }}
    />
  );
}

export function NoNotifications() {
  return (
    <EmptyState
      icon={<Bell className="h-24 w-24" />}
      title="All Caught Up!"
      description="You have no new notifications. We'll notify you when there's something important."
    />
  );
}

export function ErrorState({ 
  title = "Something Went Wrong",
  description = "We encountered an error while loading this page. Please try again.",
  onRetry
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6 text-destructive">
        <AlertCircle className="h-24 w-24" />
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { NewsCard } from "@/components/NewsCard";
import { NoBookmarks } from "@/components/EmptyStates";
import { NewsGridSkeleton } from "@/components/LoadingStates";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserBookmarks, removeBookmark } from "@/lib/api/bookmarks";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Bookmarks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user bookmarks
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['bookmarks', user?.id],
    queryFn: () => getUserBookmarks(user!.id),
    enabled: !!user?.id,
  });

  // Remove bookmark mutation
  const removeMutation = useMutation({
    mutationFn: (announcementId: string) => removeBookmark(user!.id, announcementId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', user?.id] });
      toast({
        title: "Removed from bookmarks",
        description: "Announcement removed from your saved items",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove bookmark",
        variant: "destructive",
      });
    },
  });

  const bookmarks = data?.data || [];

  const handleRemoveBookmark = (announcementId: string) => {
    removeMutation.mutate(announcementId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Saved News</h1>
            <p className="text-muted-foreground text-lg">
              Your bookmarked articles and announcements ({bookmarks.length})
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load bookmarks.
                <Button variant="link" onClick={() => refetch()} className="ml-2">
                  Try again
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <NewsGridSkeleton count={3} />
          ) : bookmarks.length > 0 ? (
            <div className="space-y-6">
              {bookmarks.map((bookmark, index) => {
                const announcement = bookmark.announcement;
                if (!announcement) return null;
                
                return (
                  <div
                    key={bookmark.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <NewsCard 
                      news={{
                        id: announcement.id,
                        title: announcement.title,
                        excerpt: announcement.excerpt,
                        content: '',
                        category: announcement.category as any,
                        department: announcement.department,
                        author: announcement.author || {
                          id: '',
                          name: 'Unknown',
                          email: '',
                          role: 'student' as const,
                          department: announcement.department,
                        },
                        publishedAt: new Date(announcement.published_at),
                        priority: 'normal',
                        isBookmarked: true,
                        imageUrl: announcement.image_url,
                      }}
                      onBookmark={() => handleRemoveBookmark(announcement.id)}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <NoBookmarks />
          )}
        </main>
      </div>
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bookmark, Share2, Flag, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { NewsCard } from "@/components/NewsCard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnnouncementById, incrementViewCount, getRelatedAnnouncements } from "@/lib/api/announcements";
import { isBookmarked, toggleBookmark } from "@/lib/api/bookmarks";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { NewsGridSkeleton } from "@/components/LoadingStates";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch announcement
  const { data: announcementData, isLoading, error } = useQuery({
    queryKey: ['announcement', id],
    queryFn: () => getAnnouncementById(id!),
    enabled: !!id,
  });

  // Fetch bookmark status
  const { data: bookmarkData } = useQuery({
    queryKey: ['bookmark', id, user?.id],
    queryFn: () => isBookmarked(user!.id, id!),
    enabled: !!user?.id && !!id,
  });

  // Fetch related announcements
  const { data: relatedData } = useQuery({
    queryKey: ['related-announcements', id, announcementData?.data?.category, announcementData?.data?.department],
    queryFn: () => getRelatedAnnouncements(
      id!,
      announcementData?.data?.category || '',
      announcementData?.data?.department || ''
    ),
    enabled: !!id && !!announcementData?.data,
  });

  // Increment view count on mount
  useEffect(() => {
    if (id) {
      incrementViewCount(id);
    }
  }, [id]);

  // Toggle bookmark mutation
  const bookmarkMutation = useMutation({
    mutationFn: () => toggleBookmark(user!.id, id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark', id, user?.id] });
      toast({
        title: bookmarkData?.isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
        description: bookmarkData?.isBookmarked ? "Announcement removed from your saved items" : "Announcement saved to your bookmarks",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive",
      });
    },
  });

  const announcement = announcementData?.data;
  const relatedAnnouncements = relatedData?.data || [];
  const isAnnouncementBookmarked = bookmarkData?.isBookmarked || false;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex flex-1">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
            <NewsGridSkeleton count={1} />
          </main>
        </div>
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex flex-1">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Announcement not found or failed to load.
              </AlertDescription>
            </Alert>
            <Button onClick={() => navigate("/dashboard")} className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </main>
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
                <Badge variant="outline" className={categoryColors[announcement.category]}>
                  {announcement.category}
                </Badge>
                <Badge variant="outline">{announcement.department}</Badge>
                {announcement.priority === 'urgent' && (
                  <Badge className="bg-accent">Urgent</Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {announcement.title}
              </h1>

              <div className="flex items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{announcement.author?.avatar || '👤'}</span>
                  <div>
                    <p className="font-semibold text-foreground">{announcement.author?.name || 'Unknown'}</p>
                    <p className="text-sm">{announcement.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatDistanceToNow(new Date(announcement.published_at), { addSuffix: true })}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 border-t border-b py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => bookmarkMutation.mutate()}
                  disabled={bookmarkMutation.isPending}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${isAnnouncementBookmarked ? 'fill-current' : ''}`} />
                  {isAnnouncementBookmarked ? 'Saved' : 'Save'}
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
              {announcement.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Related News */}
          {relatedAnnouncements.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related News</h2>
              <div className="space-y-6">
                {relatedAnnouncements.map((related) => (
                  <NewsCard 
                    key={related.id} 
                    news={{
                      id: related.id,
                      title: related.title,
                      excerpt: related.excerpt,
                      content: related.content,
                      category: related.category as any,
                      department: related.department,
                      author: {
                        id: related.author?.id || '',
                        name: related.author?.name || 'Unknown',
                        email: '',
                        role: 'student' as const,
                        department: related.department,
                      },
                      publishedAt: new Date(related.published_at),
                      priority: related.priority === 'low' || related.priority === 'medium' ? 'normal' : related.priority as 'high' | 'urgent',
                      isBookmarked: false,
                      imageUrl: related.image_url,
                    }} 
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

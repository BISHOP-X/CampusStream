import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { NewsCard } from "@/components/NewsCard";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { NewsGridSkeleton } from "@/components/LoadingStates";
import { NoNewsFound } from "@/components/EmptyStates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, AlertCircle, Plus, BarChart3, Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAnnouncements } from "@/lib/api/announcements";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const { profile } = useAuth();
  const navigate = useNavigate();

  // Role checks
  const isLecturerOrAdmin = profile?.role === 'lecturer' || profile?.role === 'admin';
  const isAdmin = profile?.role === 'admin';

  // Fetch announcements from Supabase
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['announcements', categoryFilter, departmentFilter, priorityFilter],
    queryFn: () => getAnnouncements({
      category: categoryFilter || undefined,
      department: departmentFilter || undefined,
      priority: priorityFilter || undefined,
      limit: 50,
    }),
  });

  const filters = [
    { id: "all", label: "All News" },
    { id: "department", label: "My Department" },
    { id: "urgent", label: "Urgent" },
    { id: "events", label: "Events" },
    { id: "academic", label: "Academic" },
  ];

  // Handle quick filter buttons
  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    
    if (filterId === "all") {
      setCategoryFilter("");
      setDepartmentFilter("");
      setPriorityFilter("");
    } else if (filterId === "department") {
      setCategoryFilter("");
      setDepartmentFilter(profile?.department || "");
      setPriorityFilter("");
    } else if (filterId === "urgent") {
      setCategoryFilter("");
      setDepartmentFilter("");
      setPriorityFilter("urgent");
    } else if (filterId === "events") {
      setCategoryFilter("Event");
      setDepartmentFilter("");
      setPriorityFilter("");
    } else if (filterId === "academic") {
      setCategoryFilter("Academic");
      setDepartmentFilter("");
      setPriorityFilter("");
    }
  };

  const announcements = data?.data || [];
  const urgentCount = announcements.filter(a => a.priority === 'urgent').length;
  const eventsCount = announcements.filter(a => a.category === 'Event').length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {/* Welcome Banner */}
          <div className="glass rounded-2xl p-4 sm:p-6 md:p-8 mb-8 gradient-primary animate-fade-in">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white">
              Welcome back, {profile?.first_name || profile?.name?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg">
              You have {urgentCount} urgent announcement{urgentCount !== 1 ? 's' : ''} today
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => handleFilterClick(filter.id)}
                size="lg"
                className={`shrink-0 h-11 md:h-10 ${activeFilter === filter.id ? "gradient-primary" : ""}`}
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
              <p className="text-3xl font-bold">{isLoading ? '...' : announcements.length}</p>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Urgent</span>
                <Badge className="bg-accent">{urgentCount}</Badge>
              </div>
              <p className="text-3xl font-bold">{isLoading ? '...' : urgentCount}</p>
            </div>
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Upcoming Events</span>
                <Calendar className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-3xl font-bold">
                {isLoading ? '...' : eventsCount}
              </p>
            </div>
          </div>

          {/* Role-Based Quick Actions - Lecturers & Admins */}
          {isLecturerOrAdmin && (
            <div className="glass rounded-2xl p-6 mb-8 animate-fade-in">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate('/create')}
                  className="glass rounded-xl p-6 hover:shadow-lg transition-smooth text-left group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Create Announcement</h3>
                      <p className="text-sm text-muted-foreground">Post news & updates</p>
                    </div>
                  </div>
                </button>

                {isAdmin && (
                  <>
                    <button
                      onClick={() => navigate('/admin')}
                      className="glass rounded-xl p-6 hover:shadow-lg transition-smooth text-left group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth">
                          <Shield className="h-6 w-6 text-purple-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Admin Panel</h3>
                          <p className="text-sm text-muted-foreground">Manage system</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate('/admin')}
                      className="glass rounded-xl p-6 hover:shadow-lg transition-smooth text-left group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth">
                          <BarChart3 className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">View Analytics</h3>
                          <p className="text-sm text-muted-foreground">System statistics</p>
                        </div>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* News Feed */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Latest Updates</h2>
            
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to load announcements. 
                  <Button variant="link" onClick={() => refetch()} className="ml-2">
                    Try again
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            
            {isLoading ? (
              <NewsGridSkeleton count={6} />
            ) : announcements.length > 0 ? (
              <div className="grid gap-6">
                {announcements.map((announcement, index) => (
                  <div
                    key={announcement.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <NewsCard 
                      news={{
                        id: announcement.id,
                        title: announcement.title,
                        excerpt: announcement.excerpt,
                        content: announcement.content,
                        category: announcement.category as any,
                        department: announcement.department,
                        author: {
                          id: announcement.author?.id || '',
                          name: announcement.author?.name || 'Unknown',
                          email: '',
                          role: 'student' as const,
                          department: announcement.department,
                        },
                        publishedAt: new Date(announcement.published_at),
                        priority: announcement.priority === 'low' || announcement.priority === 'medium' ? 'normal' : announcement.priority as 'high' | 'urgent',
                        isBookmarked: false,
                        imageUrl: announcement.image_url,
                      }} 
                    />
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

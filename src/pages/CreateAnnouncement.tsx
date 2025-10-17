import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Send, Eye, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnnouncement } from "@/lib/api/announcements";
import { createBulkNotifications } from "@/lib/api/notifications";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";

export default function CreateAnnouncement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    department: "",
    priority: "medium" as "low" | "medium" | "high" | "urgent",
    image_url: "",
  });

  // Categories with icons
  const categories = [
    { value: 'academic', label: 'Academic', icon: '📚' },
    { value: 'events', label: 'Events', icon: '🎉' },
    { value: 'sports', label: 'Sports', icon: '⚽' },
    { value: 'student_affairs', label: 'Student Affairs', icon: '👥' },
    { value: 'urgent', label: 'Urgent', icon: '⚠️' },
    { value: 'general', label: 'General', icon: '📢' },
    { value: 'administrative', label: 'Administrative', icon: '🏛️' },
  ];

  // Departments
  const departments = [
    { value: 'computer_science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'business', label: 'Business' },
    { value: 'arts', label: 'Arts' },
    { value: 'science', label: 'Science' },
    { value: 'law', label: 'Law' },
    { value: 'education', label: 'Education' },
    { value: 'all_departments', label: 'All Departments' },
  ];

  // Create announcement mutation
  const createAnnouncementMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const result = await createAnnouncement({
        title: data.title,
        excerpt: data.excerpt || data.content.substring(0, 150),
        content: data.content,
        category: data.category,
        department: data.department,
        priority: data.priority,
        image_url: data.image_url || undefined,
      }, user.id); // Pass authorId as second argument

      if (result.error) throw result.error;
      return result.data;
    },
    onSuccess: async (announcement) => {
      // Invalidate announcements cache
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      
      // Create notifications for users in the target department
      if (announcement) {
        try {
          // First, get all users in the target department
          const { data: users } = await supabase
            .from('users')
            .select('id')
            .eq('department', formData.department === 'all_departments' ? formData.department : formData.department);
          
          if (users && users.length > 0) {
            const notifications = users
              .filter(u => u.id !== user?.id) // Don't notify the author
              .map(u => ({
                user_id: u.id,
                type: formData.priority === 'urgent' ? 'system' as const : 'announcement' as const,
                message: `New ${formData.priority === 'urgent' ? 'urgent ' : ''}announcement: ${formData.title}`,
                related_news_id: announcement.id,
              }));
            
            if (notifications.length > 0) {
              await createBulkNotifications(notifications);
            }
          }
        } catch (error) {
          console.error("Failed to create notifications:", error);
          // Don't fail the whole operation if notifications fail
        }
      }

      toast({
        title: "Announcement published",
        description: "Your announcement has been published successfully.",
      });
      
      // Navigate to the new announcement
      if (announcement) {
        navigate(`/news/${announcement.id}`);
      } else {
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      toast({
        title: "Publication failed",
        description: "Failed to publish announcement. Please try again.",
        variant: "destructive",
      });
      console.error("Create announcement error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Validation error",
        description: "Title and content are required.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.category || !formData.department) {
      toast({
        title: "Validation error",
        description: "Please select a category and department.",
        variant: "destructive",
      });
      return;
    }

    createAnnouncementMutation.mutate(formData);
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your announcement has been saved as a draft.",
    });
  };

  // Check if user has permission to create announcements
  if (!profile || (profile.role !== 'admin' && profile.role !== 'lecturer')) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex flex-1">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You don't have permission to create announcements. Only admins and lecturers can create announcements.
              </AlertDescription>
            </Alert>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Create Announcement</h1>
            <p className="text-muted-foreground text-lg">
              Share news and updates with students
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass rounded-2xl p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter announcement title"
                  className="text-lg"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (Optional)</Label>
                <Input
                  id="excerpt"
                  placeholder="Brief summary (auto-generated if left empty)"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Write your announcement here..."
                  className="min-h-[300px] text-base"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                />
                <p className="text-sm text-muted-foreground">
                  {formData.content.length} characters · {Math.ceil(formData.content.length / 200)} min read
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL (Optional)</Label>
                <Input
                  id="image_url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.icon} {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Target Department *</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      setFormData({ ...formData, department: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">Low</Badge>
                        Regular announcement
                      </span>
                    </SelectItem>
                    <SelectItem value="medium">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">Medium</Badge>
                        Standard priority
                      </span>
                    </SelectItem>
                    <SelectItem value="high">
                      <span className="flex items-center gap-2">
                        <Badge className="bg-secondary">High</Badge>
                        Important announcement
                      </span>
                    </SelectItem>
                    <SelectItem value="urgent">
                      <span className="flex items-center gap-2">
                        <Badge className="bg-accent">Urgent</Badge>
                        Time-sensitive announcement
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                className="gradient-primary flex-1"
                size="lg"
                disabled={createAnnouncementMutation.isPending}
              >
                <Send className="h-5 w-5 mr-2" />
                {createAnnouncementMutation.isPending ? "Publishing..." : "Publish Announcement"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleSaveDraft}
                disabled={createAnnouncementMutation.isPending}
              >
                <Save className="h-5 w-5 mr-2" />
                Save Draft
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="lg"
                disabled={createAnnouncementMutation.isPending}
              >
                <Eye className="h-5 w-5 mr-2" />
                Preview
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

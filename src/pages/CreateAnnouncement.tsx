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
import { mockCategories, mockDepartments } from "@/lib/mockData";
import { Save, Send, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function CreateAnnouncement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    department: "",
    priority: "normal",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate posting
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  const handleSaveDraft = () => {
    // Simulate saving draft
    console.log("Draft saved");
  };

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
                  {formData.content.length} characters
                </p>
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
                      {mockCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.icon} {cat.name}
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
                      {mockDepartments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.name}>
                          {dept.name}
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
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">
                      <span className="flex items-center gap-2">
                        <Badge variant="outline">Normal</Badge>
                        Regular announcement
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
              >
                <Send className="h-5 w-5 mr-2" />
                Publish Announcement
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleSaveDraft}
              >
                <Save className="h-5 w-5 mr-2" />
                Save Draft
              </Button>
              <Button type="button" variant="outline" size="lg">
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

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockNews } from "@/lib/mockData";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const stats = [
    { label: "Total Announcements", value: mockNews.length, icon: "📢" },
    { label: "Active Users", value: "1,234", icon: "👥" },
    { label: "Pending Posts", value: "5", icon: "⏳" },
    { label: "Engagement Rate", value: "78%", icon: "📊" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground text-lg">
                  Manage announcements and monitor platform activity
                </p>
              </div>
              <Button
                onClick={() => navigate("/create")}
                className="gradient-primary"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Post
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Posts Table */}
          <div className="glass rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockNews.slice(0, 8).map((news) => (
                    <TableRow key={news.id}>
                      <TableCell className="font-medium max-w-xs truncate">
                        {news.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{news.category}</Badge>
                      </TableCell>
                      <TableCell>{news.department}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            news.priority === "urgent"
                              ? "bg-accent"
                              : news.priority === "high"
                              ? "bg-secondary"
                              : "bg-muted"
                          }
                        >
                          {news.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDistanceToNow(news.publishedAt, { addSuffix: true })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/news/${news.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

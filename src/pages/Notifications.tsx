import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { mockNotifications } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle, Calendar, Info, CheckCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [notifications, setNotifications] = useState(mockNotifications);
  const navigate = useNavigate();

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif
      )
    );
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.isRead;
    if (filter === "read") return notif.isRead;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertCircle className="h-5 w-5 text-accent" />;
      case "event":
        return <Calendar className="h-5 w-5 text-secondary" />;
      case "news":
        return <Bell className="h-5 w-5 text-primary" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">Notifications</h1>
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className={filter === "all" ? "gradient-primary" : ""}
              >
                All
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("unread")}
                className={filter === "unread" ? "gradient-primary" : ""}
              >
                Unread ({notifications.filter((n) => !n.isRead).length})
              </Button>
              <Button
                variant={filter === "read" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("read")}
                className={filter === "read" ? "gradient-primary" : ""}
              >
                Read
              </Button>
            </div>
          </div>

          {filteredNotifications.length > 0 ? (
            <div className="space-y-3">
              {filteredNotifications.map((notif, index) => (
                <div
                  key={notif.id}
                  onClick={() => {
                    toggleRead(notif.id);
                    if (notif.relatedNewsId) {
                      navigate(`/news/${notif.relatedNewsId}`);
                    }
                  }}
                  className={`glass rounded-xl p-5 cursor-pointer hover:shadow-lg transition-smooth animate-slide-up ${
                    !notif.isRead ? "border-l-4 border-primary" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-1">{getIcon(notif.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className={`mb-2 ${!notif.isRead ? "font-semibold" : ""}`}>
                        {notif.message}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>
                          {formatDistanceToNow(notif.timestamp, { addSuffix: true })}
                        </span>
                        {!notif.isRead && (
                          <Badge variant="secondary" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center animate-fade-in">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-2xl font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {filter === "unread"
                  ? "You're all caught up!"
                  : "You don't have any notifications yet"}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

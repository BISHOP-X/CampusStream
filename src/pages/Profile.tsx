import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { currentUser } from "@/lib/mockData";
import { Camera, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(currentUser);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    urgent: true,
    department: true,
    events: false,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Profile & Settings</h1>
            <p className="text-muted-foreground text-lg">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="glass">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <div className="glass rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-5xl">
                      {profile.avatar}
                    </div>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full"
                      variant="secondary"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{profile.name}</h3>
                    <p className="text-muted-foreground capitalize">{profile.role}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" value={profile.department} disabled />
                    </div>
                    {profile.level && (
                      <div className="space-y-2">
                        <Label htmlFor="level">Level</Label>
                        <Input id="level" value={profile.level} disabled />
                      </div>
                    )}
                  </div>

                  <Button className="gradient-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <div className="glass rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Push Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications on your device
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, push: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Urgent Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified about urgent announcements
                      </p>
                    </div>
                    <Switch
                      checked={notifications.urgent}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, urgent: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Department Updates</h3>
                      <p className="text-sm text-muted-foreground">
                        News from your department
                      </p>
                    </div>
                    <Switch
                      checked={notifications.department}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, department: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Event Reminders</h3>
                      <p className="text-sm text-muted-foreground">
                        Reminders about upcoming events
                      </p>
                    </div>
                    <Switch
                      checked={notifications.events}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, events: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <div className="glass rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Appearance</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Dark Mode</h3>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark themes
                      </p>
                    </div>
                    <Switch
                      onCheckedChange={(checked) => {
                        document.documentElement.classList.toggle("dark", checked);
                      }}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <div className="glass rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Account</h2>
                
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Logout
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-destructive">
                    Delete Account
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

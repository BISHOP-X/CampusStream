import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { mockDepartments } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";

export default function Departments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Departments</h1>
            <p className="text-muted-foreground text-lg">
              Browse news and announcements by department
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDepartments.map((dept, index) => (
              <button
                key={dept.id}
                onClick={() => navigate(`/dashboard?department=${dept.name}`)}
                className="glass rounded-2xl p-8 hover:shadow-lg transition-smooth text-left group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${dept.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}>
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-smooth">
                  {dept.name}
                </h3>
                <p className="text-muted-foreground">
                  {dept.newsCount} {dept.newsCount === 1 ? 'announcement' : 'announcements'}
                </p>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

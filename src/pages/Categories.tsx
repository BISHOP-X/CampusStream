import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { mockCategories } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Categories</h1>
            <p className="text-muted-foreground text-lg">
              Explore news by category to find what interests you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => navigate(`/dashboard?category=${category.name}`)}
                className="glass rounded-2xl p-8 hover:shadow-lg transition-smooth text-left group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center text-white text-3xl mb-4 group-hover:scale-110 transition-smooth`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-smooth">
                  {category.name}
                </h3>
                <p className="text-muted-foreground">
                  {category.count} {category.count === 1 ? 'post' : 'posts'}
                </p>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

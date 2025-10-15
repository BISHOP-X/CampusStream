import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { currentUser } from "@/lib/mockData";

export function FloatingActionButton() {
  // Only show for lecturers and admins
  if (currentUser.role === "student") {
    return null;
  }

  return (
    <Link to="/create">
      <Button
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow z-50 md:h-16 md:w-16 transition-smooth hover:scale-110"
      >
        <Plus className="h-6 w-6 md:h-7 md:w-7" />
        <span className="sr-only">Create Announcement</span>
      </Button>
    </Link>
  );
}
